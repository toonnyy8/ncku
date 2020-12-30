from cv2 import cv2 as cv2
import numpy as np

img1 = cv2.imread("../Q1_Image/coin01.jpg")

bin_img1 = cv2.bilateralFilter(img1, 5, 200, 300)
bin_img1 = bin_img1[:, :, 0]
bin_img1 = np.uint8(bin_img1 < 128)*255
contours1, hierarchy1 = cv2.findContours(
    bin_img1, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

img1 = cv2.drawContours(img1, contours1, -1, (0, 0, 255), 2)


img2 = cv2.imread("../Q1_Image/coin02.jpg")

bin_img2 = cv2.bilateralFilter(img2, 5, 200, 300)
bin_img2 = bin_img2[:, :, 0]
bin_img2 = np.uint8(bin_img2 < 128)*255
contours2, hierarchy2 = cv2.findContours(
    bin_img2, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

img2 = cv2.drawContours(img2, contours2, -1, (0, 0, 255), 2)

cv2.imwrite("./static/q1/edge_coin01.jpg", img1)
cv2.imwrite("./static/q1/edge_coin02.jpg", img2)
