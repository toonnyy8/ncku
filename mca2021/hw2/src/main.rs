use clap::{App, Arg};
use image::{self, ImageBuffer};
use rusty_machine::linalg::{Matrix, Vector};
use rusty_machine::prelude::BaseMatrix;
use rusty_machine::{learning::gmm::GaussianMixtureModel, prelude::UnSupModel};
use serde_derive::{Deserialize, Serialize};
mod load_data;
mod save;

use std::fs;

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
                )
                .arg(
                    Arg::new("weights file")
                        .short('w')
                        .long("weights")
                        .value_name("weights file")
                        .about("save weights file name")
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
                )
                .arg(
                    Arg::new("weights file")
                        .short('w')
                        .long("weights")
                        .value_name("weights file")
                        .about("weights file")
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

    if let Some(ref matches) = matches.subcommand_matches("train") {
        let iters = if let Some(iters) = matches.value_of("iters") {
            let iters = iters.parse::<usize>().unwrap();
            println!("Sets max iters: {}", iters);
            iters
        } else {
            10
        };
        let mut gmm = GaussianMixtureModel::new(k);
        gmm.set_max_iters(iters);

        if let Some(files) = matches.values_of("train files") {
            let files = files.collect::<Vec<_>>();
            println!("train files：{:?}", files);

            let dataset = load_data::load_imgs(&files);

            gmm.train(&dataset).unwrap();
        }

        let gmm_file = serde_json::to_string(&save::GmmFile::from(&gmm)).unwrap();
        if let Some(weights_name) = matches.value_of("weights file") {
            fs::write(format!("{}.json", weights_name), gmm_file).unwrap();
        } else {
            fs::write("gmm_file.json", gmm_file).unwrap();
        }
    } else if let Some(ref matches) = matches.subcommand_matches("eval") {
        let mut gmm = if let Some(weights_file) = matches.value_of("weights file") {
            println!("weights file: {}", weights_file);
            fs::read_to_string(weights_file);
            let gmm_file: save::GmmFile =
                serde_json::from_str(&fs::read_to_string(weights_file).unwrap().as_str()).unwrap();
            gmm_file.as_gmm(k)
        } else {
            GaussianMixtureModel::new(k)
        };
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
}
