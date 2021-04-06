use super::*;
#[derive(Serialize, Deserialize, Debug)]
pub struct GmmFile {
    weights: Vec<f64>,
    means: Mat,
    covars: Vec<Mat>,
}
impl GmmFile {
    pub fn from(gmm: &GaussianMixtureModel) -> Self {
        Self {
            weights: gmm.mixture_weights().data().clone(),
            means: Mat::from(gmm.means().unwrap()),
            covars: gmm
                .covariances()
                .unwrap()
                .iter()
                .map(|covar| Mat::from(covar))
                .collect::<Vec<_>>(),
        }
    }

    pub fn as_gmm(&self, k: usize) -> GaussianMixtureModel {
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
