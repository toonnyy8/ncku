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

pub fn load_imgs_as_label(paths: &Vec<&str>) -> Vec<usize> {
    paths
        .iter()
        .map(|path| {
            image::io::Reader::open(path)
                .unwrap()
                .decode()
                .unwrap()
                .to_luma8()
                .to_vec()
        })
        .collect::<Vec<_>>()
        .concat()
        .iter()
        .map(|&val| if val == 255 { 1 } else { 0 })
        .collect::<Vec<_>>()
}

pub fn to_pixels_kernel(pred: &Matrix<f64>) -> Vec<usize> {
    pred.row_iter()
        .enumerate()
        .map(|val| {
            let class = val
                .1
                .iter()
                .enumerate()
                .reduce(|prev, curr| if prev.1 > curr.1 { prev } else { curr })
                .unwrap()
                .0;
            class
        })
        .collect::<Vec<usize>>()
}

pub fn to_pixels_kernel_class(pixels_kernel: &Vec<usize>, kernel_class: &Vec<usize>) -> Vec<usize> {
    pixels_kernel
        .iter()
        .map(|&pixel_kernel| kernel_class[pixel_kernel])
        .collect::<Vec<_>>()
}

pub fn to_img(
    pixels_kernel_class: &Vec<usize>,
    width: u32,
    height: u32,
) -> ImageBuffer<image::Luma<u8>, Vec<u8>> {
    ImageBuffer::from_fn(width, height, |x, y| {
        let kernel_class = pixels_kernel_class[(y * width + x) as usize];

        image::Luma([if kernel_class == 1 {
            255 as u8
        } else {
            0 as u8
        }])
    })
}

pub fn dice_coefficient(pixels_kernel_class: &Vec<usize>, label: &Vec<usize>) -> f32 {
    assert_eq!(
        pixels_kernel_class.len(),
        label.len(),
        "pixels_kernel_class len must be equal to label",
    );

    let acc = pixels_kernel_class.iter().fold(0, |acc, val| acc + val)
        + label.iter().fold(0, |acc, val| acc + val);
    let mut intersect = 0;
    for idx in 0..pixels_kernel_class.len() {
        intersect += pixels_kernel_class[idx] * label[idx];
    }
    intersect as f32 * 2. / acc as f32
}

pub fn pixel_accuracy(pixels_kernel_class: &Vec<usize>, label: &Vec<usize>) -> f32 {
    assert_eq!(
        pixels_kernel_class.len(),
        label.len(),
        "pixels_kernel_class len must be equal to label",
    );

    let mut accuracy = 0.;
    for idx in 0..pixels_kernel_class.len() {
        if pixels_kernel_class[idx] == label[idx] {
            accuracy += 1.
        }
    }
    accuracy / pixels_kernel_class.len() as f32
}
