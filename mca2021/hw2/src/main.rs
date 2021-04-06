use clap::{App, Arg};
use image::{self, ImageBuffer};
use rusty_machine::linalg::{Matrix, Vector};
use rusty_machine::prelude::BaseMatrix;
use rusty_machine::{learning::gmm::GaussianMixtureModel, prelude::UnSupModel};

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

    // {
    //     let mut gmm = GaussianMixtureModel::new(3);
    //     let inputs = Matrix::new(4, 2, vec![1.0, 2.0, -3.0, -3.0, 0.1, 1.5, -5.0, -2.5]);
    //     gmm.set_max_iters(1);
    //     gmm.train(&inputs).unwrap();
    //     // gmm.predict(&test_data);
    //     gmm.set(inputs)
    // }

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
