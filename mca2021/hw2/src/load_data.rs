use super::*;

pub fn load_imgs(paths: &Vec<&str>) -> Matrix<f64> {
    let data = paths
        .iter()
        .map(|path| {
            image::io::Reader::open(path)
                .unwrap()
                .decode()
                .unwrap()
                .to_rgb8()
                .to_vec()
        })
        .collect::<Vec<_>>()
        .concat()
        .iter()
        .map(|&val| val as f64)
        .collect::<Vec<_>>();
    let dataset = Matrix::new(data.len() / 3, 3, data);
    dataset
}
