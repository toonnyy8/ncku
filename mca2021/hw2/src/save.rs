use super::*;
#[derive(Serialize, Deserialize, Debug)]
pub struct GmmFile {
    weights: Vec<f64>,
    means: Mat,
    covars: Vec<Mat>,
    kernel_class: Vec<usize>,
}
impl GmmFile {
    pub fn from(gmm: &GaussianMixtureModel, kernel_class: &Vec<usize>) -> Self {
        Self {
            weights: gmm.mixture_weights().data().clone(),
            means: Mat::from(gmm.means().unwrap()),
            covars: gmm
                .covariances()
                .unwrap()
                .iter()
                .map(|covar| Mat::from(covar))
                .collect::<Vec<_>>(),
            kernel_class: kernel_class.clone(),
        }
    }

    pub fn as_gmm(&self) -> GaussianMixtureModel {
        let k = self.kernel_class.len();
        GaussianMixtureModel::new(k)
            .with_weights(Vector::from(self.weights.clone()))
            .unwrap()
            .with_means(Matrix::new(
                self.means.rows,
                self.means.cols,
                self.means.data.clone(),
            ))
            .unwrap()
            .with_covars(
                self.covars
                    .iter()
                    .map(|covar| Matrix::new(covar.rows, covar.cols, covar.data.clone()))
                    .collect::<Vec<_>>(),
            )
            .unwrap()
    }
    pub fn kernel_class(&self) -> &Vec<usize> {
        self.kernel_class.as_ref()
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct Mat {
    rows: usize,
    cols: usize,
    data: Vec<f64>,
}
impl Mat {
    fn from(matrix: &Matrix<f64>) -> Self {
        Self {
            rows: matrix.rows(),
            cols: matrix.cols(),
            data: matrix.data().clone(),
        }
    }
}
