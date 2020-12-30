from cv2 import cv2 as cv2
import numpy as np

# termination criteria
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
# prepare object points, like (0,0,0), (1,0,0), (2,0,0) ....,(6,5,0)
objp = np.zeros((11*8, 3), np.float32)
objp[:, :2] = np.mgrid[0:11, 0:8].T.reshape(-1, 2)
# Arrays to store object points and image points from all the images.
q2_objpoints = []  # 3d point in real world space
q2_imgpoints = []  # 2d points in image plane.
q2_corner_imgs = []
for idx in range(15):
    img = cv2.imread(
        "../Q2_Image/{}.bmp".format(idx+1))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Find the chess board corners
    ret, corners = cv2.findChessboardCorners(gray, (11, 8), None)
    # If found, add object points, image points (after refining them)
    if ret == True:
        q2_objpoints.append(objp)
        corners2 = cv2.cornerSubPix(
            gray, corners, (11, 11), (-1, -1), criteria)
        q2_imgpoints.append(corners)
        # Draw and display the corners
        corner_img = cv2.drawChessboardCorners(img, (11, 8), corners2, ret)
        # corner_img = cv2.resize(corner_img, (512, 512))
        cv2.imwrite("./static/q2/corner_{}.bmp".format(idx+1), corner_img)

ret, q2_mtx, q2_dist, q2_rvecs, q2_tvecs = cv2.calibrateCamera(
    q2_objpoints, q2_imgpoints, (2048, 2048), None, None)


# Arrays to store object points and image points from all the images.
q3_objpoints = []  # 3d point in real world space
q3_imgpoints = []  # 2d points in image plane.
q3_imgs = []
for idx in range(5):
    img = cv2.imread(
        "../Q3_Image/{}.bmp".format(idx+1))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Find the chess board corners
    ret, corners = cv2.findChessboardCorners(gray, (11, 8), None)
    # If found, add object points, image points (after refining them)
    if ret == True:
        q3_objpoints.append(objp)
        q3_imgpoints.append(corners)
        # Draw and display the corners
        q3_imgs.append(img)

ret, q3_mtx, q3_dist, q3_rvecs, q3_tvecs = cv2.calibrateCamera(
    q3_objpoints, q3_imgpoints, (2048, 2048), None, None)

q3_objpts = np.array(
    [[3, 3, -3],  [1, 1, 0], [3, 5, 0], [5, 1, 0]], dtype=np.float)
for idx in range(5):
    imgpts, jac = cv2.projectPoints(
        q3_objpts, q3_rvecs[idx], q3_tvecs[idx], q3_mtx, q3_dist)
    q3_imgs[idx] = cv2.line(q3_imgs[idx], tuple(imgpts[0].astype(np.int32).ravel()),
                            tuple(imgpts[1].astype(np.int32).ravel()), (0, 0, 255), 10)
    q3_imgs[idx] = cv2.line(q3_imgs[idx], tuple(imgpts[1].astype(np.int32).ravel()),
                            tuple(imgpts[2].astype(np.int32).ravel()), (0, 0, 255), 10)
    q3_imgs[idx] = cv2.line(q3_imgs[idx], tuple(imgpts[2].astype(np.int32).ravel()),
                            tuple(imgpts[0].astype(np.int32).ravel()), (0, 0, 255), 10)
    q3_imgs[idx] = cv2.line(q3_imgs[idx], tuple(imgpts[3].astype(np.int32).ravel()),
                            tuple(imgpts[0].astype(np.int32).ravel()), (0, 0, 255), 10)
    q3_imgs[idx] = cv2.line(q3_imgs[idx], tuple(imgpts[3].astype(np.int32).ravel()),
                            tuple(imgpts[1].astype(np.int32).ravel()), (0, 0, 255), 10)
    q3_imgs[idx] = cv2.line(q3_imgs[idx], tuple(imgpts[3].astype(np.int32).ravel()),
                            tuple(imgpts[2].astype(np.int32).ravel()), (0, 0, 255), 10)
    # q3_imgs[idx] = cv2.resize(q3_imgs[idx], (512, 512))
    cv2.imwrite("./static/q3/{}.bmp".format(idx+1), q3_imgs[idx])
