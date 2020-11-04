import base64
import array
import numpy as np
import json
from cv2 import cv2  # as cv

import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# termination criteria
criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
# prepare object points, like (0,0,0), (1,0,0), (2,0,0) ....,(6,5,0)
objp = np.zeros((11*8, 3), np.float32)
objp[:, :2] = np.mgrid[0:11, 0:8].T.reshape(-1, 2)
# Arrays to store object points and image points from all the images.
q1_objpoints = []  # 3d point in real world space
q1_imgpoints = []  # 2d points in image plane.
q1_corner_imgs = []
for idx in range(15):
    img = cv2.imread(
        "Q1_Image/bmp/{}.bmp".format(idx+1), cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Find the chess board corners
    ret, corners = cv2.findChessboardCorners(gray, (11, 8), None)
    # If found, add object points, image points (after refining them)
    if ret == True:
        q1_objpoints.append(objp)
        corners2 = cv2.cornerSubPix(
            gray, corners, (11, 11), (-1, -1), criteria)
        q1_imgpoints.append(corners)
        # Draw and display the corners
        corner_img = cv2.drawChessboardCorners(img, (11, 8), corners2, ret)
        corner_img = cv2.resize(corner_img, (512, 512))
        q1_corner_imgs.append(corner_img.tolist())

ret, q1_mtx, q1_dist, q1_rvecs, q1_tvecs = cv2.calibrateCamera(
    q1_objpoints, q1_imgpoints, (2048, 2048), None, None)


# Arrays to store object points and image points from all the images.
q2_objpoints = []  # 3d point in real world space
q2_imgpoints = []  # 2d points in image plane.
q2_imgs = []
for idx in range(5):
    img = cv2.imread(
        "Q2_Image/bmp/{}.bmp".format(idx+1), cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Find the chess board corners
    ret, corners = cv2.findChessboardCorners(gray, (11, 8), None)
    # If found, add object points, image points (after refining them)
    if ret == True:
        q2_objpoints.append(objp)
        q2_imgpoints.append(corners)
        # Draw and display the corners
        q2_imgs.append(img)

ret, q2_mtx, q2_dist, q2_rvecs, q2_tvecs = cv2.calibrateCamera(
    q2_objpoints, q2_imgpoints, (2048, 2048), None, None)

q2_objpts = np.array(
    [[3, 3, -3],  [1, 1, 0], [3, 5, 0], [5, 1, 0]], dtype=np.float)
for idx in range(5):
    imgpts, jac = cv2.projectPoints(
        q2_objpts, q2_rvecs[idx], q2_tvecs[idx], q2_mtx, q2_dist)
    q2_imgs[idx] = cv2.line(q2_imgs[idx], tuple(imgpts[0].astype(np.int32).ravel()),
                            tuple(imgpts[1].astype(np.int32).ravel()), (255, 0, 0), 10)
    q2_imgs[idx] = cv2.line(q2_imgs[idx], tuple(imgpts[1].astype(np.int32).ravel()),
                            tuple(imgpts[2].astype(np.int32).ravel()), (255, 0, 0), 10)
    q2_imgs[idx] = cv2.line(q2_imgs[idx], tuple(imgpts[2].astype(np.int32).ravel()),
                            tuple(imgpts[0].astype(np.int32).ravel()), (255, 0, 0), 10)
    q2_imgs[idx] = cv2.line(q2_imgs[idx], tuple(imgpts[3].astype(np.int32).ravel()),
                            tuple(imgpts[0].astype(np.int32).ravel()), (255, 0, 0), 10)
    q2_imgs[idx] = cv2.line(q2_imgs[idx], tuple(imgpts[3].astype(np.int32).ravel()),
                            tuple(imgpts[1].astype(np.int32).ravel()), (255, 0, 0), 10)
    q2_imgs[idx] = cv2.line(q2_imgs[idx], tuple(imgpts[3].astype(np.int32).ravel()),
                            tuple(imgpts[2].astype(np.int32).ravel()), (255, 0, 0), 10)
    q2_imgs[idx] = cv2.resize(q2_imgs[idx], (512, 512))
    q2_imgs[idx] = q2_imgs[idx].tolist()


@app.route('/', methods=['GET'])
def home():
    return flask.render_template("index.html")


@app.route('/src/<filename>')
def src(filename):
    return flask.send_from_directory("static", "src/{}".format(filename))


@app.route('/css/<filename>')
def css(filename):
    return flask.send_from_directory("static", "css/{}".format(filename))


@app.route('/vgg16/<filename>')
def vgg16(filename):
    return flask.send_from_directory("static", "vgg16/{}".format(filename))

# @app.route('/json', methods=['POST'])
# def fetch():
#     req = flask.request.get_json()

#     img_array = np.asarray(
#         bytearray(base64.b64decode(req["img"])), dtype=np.uint8)
#     img = cv2.imdecode(img_array, cv2.COLOR_RGB2BGR)
#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#     ret, corners = cv2.findChessboardCorners(gray, (8, 11), None)
#     if ret == True:
#         criteria = (cv2.TERM_CRITERIA_EPS +
#                     cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
#         corners2 = cv2.cornerSubPix(
#             gray, corners, (11, 11), (-1, -1), criteria)

#         # Draw and display the corners
#         img = cv2.drawChessboardCorners(img, (8, 11), corners2, ret)

#         return {"img": base64.b64encode(
#             img.tobytes()).decode(), "corners": corners2.tolist()}

#     return "faild"


@app.route('/Q1/1', methods=['POST'])
def Q1_1():
    return {"corner_imgs": q1_corner_imgs}


@app.route('/Q1/2', methods=['POST'])
def Q1_2():
    return {"mtx": q1_mtx.tolist()}


@app.route('/Q1/3', methods=['POST'])
def Q1_3():
    mtxs = []

    for idx in range(15):
        mtxs.append(np.concatenate(
            [cv2.Rodrigues(q1_rvecs[idx])[0], q1_tvecs[idx]], 1).tolist())
    return {"mtxs": mtxs}


@app.route('/Q1/4', methods=['POST'])
def Q1_4():
    return {"dist": q1_dist.tolist()}


@app.route('/Q2', methods=['POST'])
def Q2():
    return {"imgs": q2_imgs}


@app.route('/Q3', methods=['POST'])
def Q3():
    imgL = cv2.imread('Q3_Image/imL.png', 0)
    imgR = cv2.imread('Q3_Image/imR.png', 0)
    stereo = cv2.StereoBM_create(numDisparities=16, blockSize=15)
    disparity = stereo.compute(imgL, imgR)
    return {"img": disparity.tolist()}


q4_img1 = cv2.imread('Q4_Image/Aerial1.jpg')
q4_gray1 = cv2.cvtColor(q4_img1, cv2.COLOR_BGR2GRAY)
q4_img2 = cv2.imread('Q4_Image/Aerial2.jpg')
q4_gray2 = cv2.cvtColor(q4_img2, cv2.COLOR_BGR2GRAY)

sift = cv2.SIFT_create()

q4_kp1, q4_des1 = sift.detectAndCompute(q4_img1, None)
q4_kp_img1 = q4_img1.copy()

q4_kp2, q4_des2 = sift.detectAndCompute(q4_img2, None)
q4_kp_img2 = q4_img2.copy()

# create BFMatcher object
bf = cv2.BFMatcher(crossCheck=True)
# Match descriptors.
q4_matches = bf.match(q4_des1, q4_des2)
q4_matches = sorted(q4_matches, key=lambda x: x.distance)

q4_kp1_select6 = [q4_kp1[match.queryIdx] for match in q4_matches[:6]]
q4_kp2_select6 = [q4_kp2[match.trainIdx] for match in q4_matches[:6]]
q4_kp_img1 = cv2.drawKeypoints(q4_gray1, q4_kp1_select6, q4_kp_img1)
q4_kp_img2 = cv2.drawKeypoints(q4_gray2, q4_kp2_select6, q4_kp_img2)

q4_matching_img = cv2.drawMatches(q4_img1, q4_kp1, q4_img2, q4_kp2,
                                  q4_matches[:6], None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)


@app.route('/Q4/1', methods=['POST'])
def Q4_1():
    return {"img1": q4_kp_img1.tolist(), "img2": q4_kp_img2.tolist()}


@app.route('/Q4/2', methods=['POST'])
def Q4_2():
    return {"matching_img": q4_matching_img.tolist()}


app.run()
