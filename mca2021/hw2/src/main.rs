use clap::{App, Arg};
use image::{self, ImageBuffer};
use rusty_machine::linalg::{Matrix, Vector};
use rusty_machine::prelude::BaseMatrix;
use rusty_machine::{learning::gmm::GaussianMixtureModel, prelude::UnSupModel};
use serde_derive::{Deserialize, Serialize};
mod dataset;
mod save;

use std::fs;

fn main() {
    let matches = App::new("My Super Program")
        .version("1.0")
        .author("Kevin K. <kbknapp@gmail.com>")
        .about("Does awesome things")
        .subcommand(
            App::new("train")
                .about("gmm training")
                .version("1.0")
                .arg(
                    Arg::new("kernels")
                        .short('k')
                        .long("kernels")
                        .value_name("kernel number")
                        .about("Sets kernel number")
                        .takes_value(true),
                )
                .arg(
                    Arg::new("train files")
                        .short('f')
                        .long("files")
                        .value_name("train files")
                        .about("train files")
                        .multiple_values(true)
                        .required(true),
                )
                .arg(
                    Arg::new("epochs")
                        .short('e')
                        .long("epochs")
                        .value_name("max epochs")
                        .about("Sets max epochs")
                        .takes_value(true),
                )
                .arg(
                    Arg::new("weights file")
                        .short('w')
                        .long("weights")
                        .value_name("weights file")
                        .about("save weights file name")
                        .takes_value(true),
                )
                .arg(
                    Arg::new("reference files")
                        .short('r')
                        .long("reference")
                        .value_name("reference input, reference target")
                        .about("reference files")
                        .required(true)
                        .multiple_values(true)
                        .takes_value(true),
                ),
        )
        .subcommand(
            App::new("eval")
                .about("evaluation")
                .version("1.0")
                .arg(
                    Arg::new("input file")
                        .short('i')
                        .long("input")
                        .value_name("input file")
                        .about("input file")
                        .required(true)
                        .takes_value(true),
                )
                .arg(
                    Arg::new("output file")
                        .short('o')
                        .long("output")
                        .value_name("output file")
                        .about("output file")
                        .takes_value(true),
                )
                .arg(
                    Arg::new("target file")
                        .short('t')
                        .long("target")
                        .value_name("target file")
                        .about("target file")
                        .takes_value(true),
                )
                .arg(
                    Arg::new("weights file")
                        .short('w')
                        .long("weights")
                        .value_name("weights file")
                        .about("weights file")
                        .required(true)
                        .takes_value(true),
                ),
        )
        .get_matches();

    if let Some(ref matches) = matches.subcommand_matches("train") {
        let k = if let Some(k) = matches.value_of("kernels") {
            println!("Sets kernel number: {}", k.parse::<usize>().unwrap());
            k.parse::<usize>().unwrap()
        } else {
            2
        };
        let epochs = if let Some(epochs) = matches.value_of("epochs") {
            let epochs = epochs.parse::<usize>().unwrap();
            println!("Sets max epochs: {}", epochs);
            epochs
        } else {
            10
        };
        let mut gmm = GaussianMixtureModel::new(k);
        gmm.set_max_iters(epochs);

        if let Some(files) = matches.values_of("train files") {
            let files = files.collect::<Vec<_>>();
            println!("train files：{:?}", files);

            let dataset = dataset::load_imgs(&files);

            gmm.train(&dataset).unwrap();
        }

        let kernel_class = if let Some(files) = matches.values_of("reference files") {
            let files = files.collect::<Vec<_>>();
            assert_eq!(files.len(), 2, "The number of reference files must be two");

            println!("reference files：{:?}", files);

            let mut kernel_class = (0..k).map(|_| (0, 0)).collect::<Vec<_>>();
            let ref_input = dataset::load_imgs(&vec![files[0]]);
            let ref_target = dataset::load_imgs(&vec![files[1]]);
            &gmm.predict(&ref_input)
                .unwrap()
                .row_iter()
                .enumerate()
                .for_each(|(idx, post_probs)| {
                    let class = post_probs
                        .iter()
                        .enumerate()
                        .reduce(|prev, curr| if prev.1 > curr.1 { prev } else { curr })
                        .unwrap()
                        .0;
                    let pix = ref_target.row(idx).sum() as u32 / 3;

                    if pix == 255 {
                        kernel_class[class].1 += 1;
                    } else {
                        kernel_class[class].0 += 1;
                    };
                });
            kernel_class
                .iter()
                .map(|val| if val.0 > val.1 { 0 } else { 1 })
                .collect::<Vec<_>>()
        } else {
            (0..k).map(|_| 0).collect::<Vec<_>>()
        };

        let gmm_file = serde_json::to_string(&save::GmmFile::from(&gmm, &kernel_class)).unwrap();
        if let Some(weights_name) = matches.value_of("weights file") {
            fs::write(format!("{}", weights_name), gmm_file).unwrap();
        } else {
            fs::write("gmm_file", gmm_file).unwrap();
        }
    } else if let Some(ref matches) = matches.subcommand_matches("eval") {
        if let Some(weights_name) = matches.value_of("weights file") {
            println!("weights file: {}", weights_name);
            let gmm_file: save::GmmFile = serde_json::from_str(
                &fs::read_to_string(format!("{}", weights_name))
                    .unwrap()
                    .as_str(),
            )
            .unwrap();
            let gmm = gmm_file.as_gmm();
            let kernel_class = gmm_file.kernel_class();
            if let Some(input_file) = matches.value_of("input file") {
                let input = dataset::load_imgs(&vec![input_file]);
                let pred = &gmm.predict(&input).unwrap();
                let pixels_kernel = dataset::to_pixels_kernel(pred);
                let pixels_kernel_class =
                    dataset::to_pixels_kernel_class(&pixels_kernel, kernel_class);

                println!("input file：{}", input_file);
                if let Some(output_file) = matches.value_of("output file") {
                    println!("output file：{}", output_file);
                    let img = image::io::Reader::open(input_file)
                        .unwrap()
                        .decode()
                        .unwrap();
                    let img = img.as_rgb8().unwrap();
                    let output_img =
                        dataset::to_img(&pixels_kernel_class, img.width(), img.height());
                    output_img.save(output_file).unwrap();
                }
                if let Some(target_file) = matches.value_of("target file") {
                    println!("target file：{}", target_file);
                    let label = dataset::load_imgs_as_label(&vec![target_file]);
                    println!(
                        "Dice Coefficient：{}",
                        dataset::dice_coefficient(&pixels_kernel_class, &label)
                    );
                }
            }
        }
    }
}
