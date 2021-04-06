use clap::{App, Arg};
use image::{self, ImageBuffer};
use rusty_machine::linalg::{Matrix, Vector};
use rusty_machine::prelude::BaseMatrix;
use rusty_machine::{learning::gmm::GaussianMixtureModel, prelude::UnSupModel};

// fn main() {
//     let matches = App::new("GMM Program")
//         .version("1.0")
//         .arg(
//             Arg::new("config")
//                 .short('c')
//                 .long("config")
//                 .value_name("FILE")
//                 .about("Sets a custom config file")
//                 .takes_value(true),
//         )
//         .get_matches();
//     let img = image::io::Reader::open("./data/soccer1.jpg")
//         .unwrap()
//         .decode()
//         .unwrap();

//     let gt_img = &image::io::Reader::open("./data/soccer1_mask.png")
//         .unwrap()
//         .decode()
//         .unwrap()
//         .to_luma8();
//     let train_img = img
//         // .resize(100, 100, image::imageops::FilterType::Nearest)
//         .to_rgb8();
//     let test_img = img.to_rgb8();

//     let train_data = Matrix::new(
//         (train_img.height() * train_img.width()) as usize,
//         3,
//         train_img
//             .to_vec()
//             .iter()
//             .map(|&val| val as f64)
//             .collect::<Vec<_>>(),
//     );
//     let test_data = Matrix::new(
//         (test_img.height() * test_img.width()) as usize,
//         3,
//         test_img
//             .to_vec()
//             .iter()
//             .map(|&val| val as f64)
//             .collect::<Vec<_>>(),
//     );
//     let k = 16;
//     let mut gmm = GaussianMixtureModel::new(k);
//     gmm.set_max_iters(20);
//     gmm.train(&train_data).unwrap();

//     let post_probs = gmm.predict(&test_data).unwrap();

//     // Probabilities that each point comes from each Gaussian.
//     let mut m = (0..k).map(|_| (0, 0)).collect::<Vec<_>>();
//     let pixel_classes = &post_probs
//         .iter_rows()
//         .enumerate()
//         .map(|val| {
//             let class = val
//                 .1
//                 .iter()
//                 .enumerate()
//                 .reduce(|prev, curr| if prev.1 > curr.1 { prev } else { curr })
//                 .unwrap()
//                 .0;
//             let pix = gt_img
//                 .get_pixel(val.0 as u32 % gt_img.width(), val.0 as u32 / gt_img.width())
//                 .0[0];
//             if pix == 255 {
//                 m[class].0 += 1;
//             } else {
//                 m[class].1 += 1;
//             };
//             class
//         })
//         .collect::<Vec<usize>>();

//     let out_img = ImageBuffer::from_fn(test_img.width(), test_img.height(), |x, y| {
//         let class = pixel_classes[(y * test_img.width() + x) as usize];

//         image::Luma([if m[class].0 > m[class].1 {
//             255 as u8
//         } else {
//             0 as u8
//         }])
//     });
//     out_img.save("test.png");

//     println!("{:?}", gmm.means());
//     println!("{:?}", gmm.covariances());
//     println!("{:?}", gmm.mixture_weights());
// }

fn main() {
    let matches = App::new("My Super Program")
        .version("1.0")
        .author("Kevin K. <kbknapp@gmail.com>")
        .about("Does awesome things")
        .arg(
            Arg::new("kernels")
                .short('k')
                .long("kernels")
                .value_name("kernel number")
                .about("Sets kernel number")
                .takes_value(true),
        )
        .arg(
            Arg::new("weights file")
                .short('w')
                .long("weights")
                .value_name("weights file")
                .about("weights file")
                .takes_value(true),
        )
        .subcommand(
            App::new("train")
                .about("gmm training")
                .version("1.0")
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
                    Arg::new("iters")
                        .short('i')
                        .long("iters")
                        .value_name("max iters")
                        .about("Sets max iters")
                        .required(true)
                        .takes_value(true),
                ),
        )
        .subcommand(
            App::new("eval")
                .about("evaluation")
                .version("1.0")
                .arg(
                    Arg::new("test file")
                        .short('f')
                        .long("file")
                        .value_name("test file")
                        .about("test file")
                        .required(true)
                        .takes_value(true),
                )
                .arg(
                    Arg::new("reference dir")
                        .short('r')
                        .long("reference")
                        .value_name("reference dir")
                        .about("reference dir")
                        .required(true)
                        .takes_value(true),
                )
                .arg(
                    Arg::new("target file")
                        .short('t')
                        .long("target")
                        .value_name("target file")
                        .about("target file")
                        .takes_value(true),
                ),
        )
        .get_matches();
    let k = if let Some(k) = matches.value_of("kernels") {
        println!("Sets kernel number: {}", k.parse::<usize>().unwrap());
        k.parse::<usize>().unwrap()
    } else {
        0
    };
    let weights_file = if let Some(weights_file) = matches.value_of("weights file") {
        println!("weights file: {}", weights_file);
        weights_file
    } else {
        ""
    };

    let mix_weights = Vector::new(vec![0.25, 0.25, 0.5]);

    let mut gmm = GaussianMixtureModel::new(3);
    let inputs = Matrix::new(4, 2, vec![1.0, 2.0, -3.0, -3.0, 0.1, 1.5, -5.0, -2.5]);
    gmm.set_max_iters(1);
    gmm.train(&inputs).unwrap();
    // gmm.predict(&test_data);
    let mut var = gmm.covariances().as_mut().unwrap();
    println!("{:?}", var);
    var[0] = Matrix::new(
        2,
        2,
        vec![
            5.267699744140593,
            4.314772031917799,
            4.314772031917799,
            3.7909564267477682,
        ],
    );
    println!("{:?}", gmm.covariances().as_mut());

    if let Some(ref matches) = matches.subcommand_matches("train") {
        if let Some(files) = matches.values_of("train files") {
            let files = files.collect::<Vec<_>>();
            println!("train files：{:?}", files);
        }
        if let Some(i) = matches.value_of("iters") {
            println!("Sets max iters: {}", i.parse::<u32>().unwrap());
        }
    } else if let Some(ref matches) = matches.subcommand_matches("eval") {
        if let Some(file) = matches.value_of("test file") {
            println!("test file：{:?}", file);
        }
        if let Some(file) = matches.value_of("reference dir") {
            println!("reference dir：{:?}", file);
        }
        if let Some(file) = matches.value_of("target file") {
            println!("target file：{:?}", file);
        }
    }

    // Continued program logic goes here...
}
