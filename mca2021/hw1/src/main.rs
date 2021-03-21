use glob::glob;
use image::io::Reader as ImageReader;
use imageproc::{self};

use ndarray::arr1;
use ndarray::prelude::*;

use indicatif::ProgressBar;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = std::env::args().collect();
    let dev = false;
    let dir_path = if dev {
        // ".data/soccer_out/*.jpg"
        // ".data/ngc_out/*.jpeg"
        ".data/news_out/*.jpg"
    } else {
        args[1].as_str()
    };
    let soccer_gt = vec![(89, 96), (378, 385), (567, 573)];
    let ngc_gt = vec![
        (127, 164),
        (196, 253),
        (285, 285),
        (340, 340),
        (383, 383),
        (384, 444),
        (456, 456),
        (516, 535),
        (540, 573),
        (573, 622),
        (622, 664),
        (683, 683),
        (703, 703),
        (722, 722),
        (728, 748),
        (760, 816),
        (816, 838),
        (840, 851),
        (859, 859),
        (868, 868),
        (876, 876),
        (885, 885),
        (897, 897),
        (909, 909),
        (921, 921),
        (933, 933),
        (943, 943),
        (958, 958),
        (963, 963),
        (965, 965),
        (969, 969),
        (976, 976),
        (986, 986),
        (1003, 1009),
        (1038, 1038),
        (1048, 1059),
    ];
    let news_gt = vec![
        (73, 73),
        (235, 235),
        (301, 301),
        (370, 370),
        (452, 452),
        (861, 861),
        (1281, 1281),
    ];
    println!("{}", dir_path);
    let mut lower_threshold = 250.;
    let mut upper_threshold = 440.;
    let mut correction = false;
    for idx in 2..args.len() {
        match args[idx].as_str() {
            "-l" => {
                lower_threshold = args[idx + 1].parse::<u32>().unwrap() as f32;
            }
            "-u" => {
                upper_threshold = args[idx + 1].parse::<u32>().unwrap() as f32;
            }
            "-c" => correction = true,
            _ => {}
        }
    }

    let mut paths = Vec::new();
    for entry in glob(dir_path)? {
        let path = entry?;
        paths.push(path);
    }

    let prev_img = &ImageReader::open(&paths[0])?.decode()?.to_luma8();
    let prev_img =
        &image::imageops::resize(prev_img, 128, 128, image::imageops::FilterType::Nearest);
    let size = (prev_img.width() * prev_img.height()) as f32;
    let prev_htg = imageproc::stats::histogram(prev_img);
    let mut prev_htg: ArrayBase<ndarray::OwnedRepr<i64>, Ix1> = arr1(
        &prev_htg.channels[0]
            .iter()
            .map(|&v| v as i64)
            .collect::<Vec<_>>(),
    );
    let mut htg_diff_vec = Vec::new();

    let bar = ProgressBar::new(paths.len() as u64);
    for idx in (0..paths.len()).step_by(1) {
        bar.inc(1);
        let curr_img = &ImageReader::open(&paths[idx])?.decode()?.to_luma8();
        let curr_img =
            &image::imageops::resize(curr_img, 128, 128, image::imageops::FilterType::Nearest);
        let curr_htg = imageproc::stats::histogram(curr_img);
        let curr_htg: ArrayBase<ndarray::OwnedRepr<i64>, Ix1> = arr1(
            &curr_htg.channels[0]
                .iter()
                .map(|&v| v as i64)
                .collect::<Vec<_>>(),
        );
        let htg_diff: ArrayBase<ndarray::OwnedRepr<i64>, Ix1> = &curr_htg - &prev_htg;
        let htg_diff = htg_diff.map(|&v| i64::abs(v) as f32);
        let htg_diff = 1000. * (htg_diff.sum() / size);
        htg_diff_vec.push(htg_diff);

        prev_htg = curr_htg;
    }
    bar.finish();

    if !dev {
        shot_change_detection(
            &htg_diff_vec,
            lower_threshold,
            upper_threshold,
            correction,
            true,
        );
    } else {
        let gt_vec = gt_to_vec(&news_gt, htg_diff_vec.len());
        let mut pr_curve = Vec::<(f32, f32)>::new();
        let thresholds = [50., 100., 150., 200., 250., 300., 350., 400.];
        for &lower in &thresholds {
            for &upper in &thresholds {
                let pred_vec =
                    shot_change_detection(&htg_diff_vec, lower, lower + upper, correction, false);
                pr_curve.push((recall(&pred_vec, &gt_vec), precision(&pred_vec, &gt_vec)));
            }
        }

        pr_curve.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());
        pr_curve.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
        println!("Recall, Precision",);
        for &(r, p) in &pr_curve {
            println!("{}, {}", r, p,);
        }
    }
    Ok(())
}

fn shot_change_detection(
    htg_diff_vec: &Vec<f32>,
    lower_threshold: f32,
    upper_threshold: f32,
    correction: bool,
    show: bool,
) -> Vec<bool> {
    let mut pred_vec = Vec::<bool>::with_capacity(htg_diff_vec.len());
    for _ in 0..htg_diff_vec.len() {
        pred_vec.push(false);
    }

    let mut _htg_diff_vec = htg_diff_vec.clone();
    let mut acc = 0.;
    let mut start_idx = 0;

    for idx in 2..htg_diff_vec.len() - 2 {
        if correction {
            let l_val = htg_diff_vec[idx - 1];
            let l_max = f32::max(htg_diff_vec[idx - 1], htg_diff_vec[idx - 2]);
            let r_val = htg_diff_vec[idx + 1];
            let r_max = f32::max(htg_diff_vec[idx + 1], htg_diff_vec[idx + 2]);

            if (htg_diff_vec[idx] < lower_threshold
                && lower_threshold < l_max
                && lower_threshold < r_val)
                || (htg_diff_vec[idx] < lower_threshold
                    && lower_threshold < l_val
                    && lower_threshold < r_max)
            {
                _htg_diff_vec[idx] = f32::max((l_max + r_val) / 2., (l_val + r_max) / 2.);
            }
        }

        if _htg_diff_vec[idx] >= lower_threshold {
            if acc == 0. {
                start_idx = idx;
                acc = _htg_diff_vec[idx]
            } else {
                acc += _htg_diff_vec[idx] - lower_threshold
            }
        } else {
            if acc >= upper_threshold {
                if start_idx == idx - 1 {
                    if show {
                        println!("{}", start_idx);
                    }

                    pred_vec[start_idx] = true;
                } else {
                    if show {
                        println!("{}~{}", start_idx, idx - 1);
                    }
                    for i in start_idx..idx {
                        pred_vec[i] = true;
                    }
                }
            }
            acc = 0.
        }
    }
    pred_vec
}

fn gt_to_vec(gts: &Vec<(usize, usize)>, size: usize) -> Vec<bool> {
    let mut gt_vec = Vec::<bool>::with_capacity(size);
    for _ in 0..size {
        gt_vec.push(false);
    }

    for gt in gts {
        for idx in gt.0..gt.1 + 1 {
            gt_vec[idx] = true;
        }
    }
    gt_vec
}

fn precision(pred_vec: &Vec<bool>, gt_vec: &Vec<bool>) -> f32 {
    let mut tp = 0.;
    for idx in 0..pred_vec.len() {
        if pred_vec[idx] && gt_vec[idx] {
            tp += 1.;
        }
    }
    let y = pred_vec
        .iter()
        .fold(0., |acc, &pred| if pred { acc + 1. } else { acc });
    if y != 0. {
        tp / y
    } else {
        1.
    }
}

fn recall(pred_vec: &Vec<bool>, gt_vec: &Vec<bool>) -> f32 {
    let mut tp = 0.;
    for idx in 0..pred_vec.len() {
        if pred_vec[idx] && gt_vec[idx] {
            tp += 1.;
        }
    }
    let p = gt_vec
        .iter()
        .fold(0., |acc, &gt| if gt { acc + 1. } else { acc });

    if p != 0. {
        tp / p
    } else {
        1.
    }
}
