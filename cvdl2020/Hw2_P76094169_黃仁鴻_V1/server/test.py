import tool
import numpy as np
from cv2 import cv2 as cv2

_img = cv2.imread("../Q3_Image/rl.jpg")
_video = cv2.VideoCapture("../Q3_Image/test4perspective.mp4")
fps = _video.get(cv2.CAP_PROP_FPS)
_frames = tool.get_frames(_video)
dictionary = cv2.aruco.Dictionary_get(cv2.aruco.DICT_6X6_250)
params = cv2.aruco.DetectorParameters_create()

# params.adaptiveThreshWinSizeMin = 3
# params.adaptiveThreshWinSizeMax = 100
# params.adaptiveThreshWinSizeStep = 1
# params.adaptiveThreshConstant = 1
# params.minMarkerPerimeterRate = 0.01
# params.maxMarkerPerimeterRate = 10
params.cornerRefinementMethod = cv2.aruco.CORNER_REFINE_SUBPIX
# params.maxErroneousBitsInBorderRate = 100
# params.minOtsuStdDev = 10
# params.minDistanceToBorder = 1
# params.aprilTagCriticalRad = 0


srcPts = np.array([
    [0, 0],
    [_img.shape[1]-1, 0],
    [0, _img.shape[0]-1],
    [_img.shape[1]-1,  _img.shape[0]-1],
], dtype=np.float32)

out_video = cv2.VideoWriter('output.avi', cv2.VideoWriter_fourcc(*"XVID"), fps,
                            (_frames[0].shape[1], _frames[0].shape[0]))


def getPt(markerIds, markerCorners, id: int, idx: int):
    try:
        index = np.squeeze(np.where(markerIds == id))
        return np.squeeze(markerCorners[index[0]])[idx]
    except:
        return np.array([-1, -1])


allDstPts = []
for _frame in _frames:
    markerCorners, markerIds, rejectedCandidates = cv2.aruco.detectMarkers(
        _frame, dictionary, parameters=params)
    allDstPts.append([
        getPt(markerIds, markerCorners, 25, 1),
        getPt(markerIds, markerCorners, 33, 2),
        getPt(markerIds, markerCorners, 23, 0),
        getPt(markerIds, markerCorners, 30, 0)
    ])
for j in range(4):
    start = -1
    end = -1
    for idx, dstPts in enumerate(allDstPts):
        if (dstPts[j] == -1).all() and start == -1:
            start = idx-1
        elif not (dstPts[j] == -1).all() and start != -1:
            end = idx
            for i in range(start+1, end):
                allDstPts[i][j] = allDstPts[start][j]*(1-(i-start)/(end-start)) + \
                    allDstPts[end][j]*((i-start)/(end-start))
                # allDstPts[i][j] = allDstPts[start][j]
            start = -1
            end = -1
        elif idx == len(allDstPts)-1 and start != -1:
            end = idx+1
            for i in range(start+1, end):
                allDstPts[i][j] = allDstPts[start][j]


for idx, _frame in enumerate(_frames):
    warpPerspective_mat = cv2.getPerspectiveTransform(
        srcPts, np.array(allDstPts[idx], dtype=np.float32))
    out_img = cv2.warpPerspective(_img, warpPerspective_mat, (
        _frame.shape[1], _frame.shape[0]))
    out_img = np.where(out_img == 0, _frame, out_img)
    out_video.write(out_img.astype('uint8'))
out_video.release()
