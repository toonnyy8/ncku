
from cv2 import cv2 as cv2
import numpy as np

imgL = cv2.imread('../Q4_Image/imgL.png', 0)
imgR = cv2.imread('../Q4_Image/imgR.png', 0)
stereo = cv2.StereoBM_create(numDisparities=256, blockSize=25)
disparity = stereo.compute(imgL, imgR)
norm_disparity = np.array(disparity)
norm_disparity = cv2.normalize(disparity, norm_disparity, alpha=0,
                               beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8U)
cv2.imwrite("./static/q4/disparity.png", norm_disparity)
