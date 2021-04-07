use clap::{App, Arg};
use image::{self, ImageBuffer};
use rusty_machine::linalg::{Matrix, Vector};
use rusty_machine::prelude::BaseMatrix;
use rusty_machine::{learning::gmm::GaussianMixtureModel, prelude::UnSupModel};

fn main() {
    let matches = App::new("GMM Program")
        .version("1.0")
        .arg(
            Arg::new("config")
                .short('c')
                .long("config")
                .value_name("FILE")
                .about("Sets a custom config file")
                .takes_value(true),
        )
        .get_matches();
    let img = image::io::Reader::open("./data/soccer1.jpg")
        .unwrap()
        .decode()
        .unwrap();

    let gt_img = &image::io::Reader::open("./data/soccer1_mask.png")
        .unwrap()
        .decode()
        .unwrap()
        .to_luma8();
    let train_img = img
        // .resize(100, 100, image::imageops::FilterType::Nearest)
        .to_rgb8();
    let test_img = img.to_rgb8();

    let train_data = Matrix::new(
        (train_img.height() * train_img.width()) as usize,
        3,
        train_img
            .to_vec()
            .iter()
            .map(|&val| val as f64)
            .collect::<Vec<_>>(),
    );
    let test_data = Matrix::new(
        (test_img.height() * test_img.width()) as usize,
        3,
        test_img
            .to_vec()
            .iter()
            .map(|&val| val as f64)
            .collect::<Vec<_>>(),
    );
    let k = 16;
    let mut gmm = GaussianMixtureModel::new(k);
    gmm.set_max_iters(20);
    gmm.train(&train_data).unwrap();

    let post_probs = gmm.predict(&test_data).unwrap();

    // Probabilities that each point comes from each Gaussian.
    let mut m = (0..k).map(|_| (0, 0)).collect::<Vec<_>>();
    let pixel_classes = &post_probs
        .iter_rows()
        .enumerate()
        .map(|val| {
            let class = val
                .1
                .iter()
                .enumerate()
                .reduce(|prev, curr| if prev.1 > curr.1 { prev } else { curr })
                .unwrap()
                .0;
            let pix = gt_img
                .get_pixel(val.0 as u32 % gt_img.width(), val.0 as u32 / gt_img.width())
                .0[0];
            if pix == 255 {
                m[class].0 += 1;
            } else {
                m[class].1 += 1;
            };
            class
        })
        .collect::<Vec<usize>>();

    let out_img = ImageBuffer::from_fn(test_img.width(), test_img.height(), |x, y| {
        let class = pixel_classes[(y * test_img.width() + x) as usize];

        image::Luma([if m[class].0 > m[class].1 {
            255 as u8
        } else {
            0 as u8
        }])
    });
    out_img.save("test.png");

    println!("{:?}", gmm.means());
    println!("{:?}", gmm.covariances());
    println!("{:?}", gmm.mixture_weights());
}
