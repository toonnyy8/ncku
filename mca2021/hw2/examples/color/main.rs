use image::{self, GenericImageView, ImageBuffer};
use rusty_machine::{learning::gmm::GaussianMixtureModel, prelude::UnSupModel};
use rusty_machine::{linalg::Matrix, prelude::BaseMatrix};

fn main() {
    let mut img = image::io::Reader::open("./test1.png")
        .unwrap()
        .decode()
        .unwrap()
        .as_luma8()
        .unwrap();
}
