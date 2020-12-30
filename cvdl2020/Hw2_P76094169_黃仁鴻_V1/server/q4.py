from cv2 import cv2 as cv2
from sklearn.decomposition import PCA
import numpy as np

_pca = PCA(n_components=10)
_imgs = [cv2.cvtColor(cv2.imread("../Q4_Image/{}.jpg".format(i+1)), cv2.COLOR_BGR2RGB).reshape([-1])
         for i in range(34)]
_pca.fit(_imgs)
# imgs_pca = np.concatenate(_pca.transform(_imgs))
_imgs_pca = _pca.transform(_imgs)
imgs = np.uint8(np.concatenate(_imgs))
imgs_new = np.concatenate(_pca.inverse_transform(_imgs_pca))

imgs_new = np.uint8(np.minimum(np.maximum(imgs_new, 0), 255))
