from cv2 import cv2 as cv2
import numpy as np
import tool

_opticalFlow = cv2.VideoCapture("../Q2_Image/opticalFlow.mp4")
_opticalFlowFrames = tool.get_frames(_opticalFlow, cv2.COLOR_BGR2RGB)

fps = _opticalFlow.get(cv2.CAP_PROP_FPS)
_params = cv2.SimpleBlobDetector_Params()

_params.filterByColor = True
_params.blobColor = 0

_params.filterByArea = True
_params.minArea = 25
_params.maxArea = 60

_params.filterByCircularity = True
_params.minCircularity = 0.6
_params.maxCircularity = 1

_detector = cv2.SimpleBlobDetector_create(_params)

_prev_frame = cv2.cvtColor(_opticalFlowFrames[0], cv2.IMREAD_GRAYSCALE)
_prev_keyPoint = np.array(
    [keyPoint.pt for keyPoint in _detector.detect(_prev_frame)], dtype="float32").reshape([-1, 1, 2])
_next_keyPoint = None
_lk_params = dict(winSize=(15, 15),
                  maxLevel=2,
                  criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))
keyPoints = []

for _next_frame in _opticalFlowFrames[1:]:
    _next_frame = cv2.cvtColor(_next_frame, cv2.IMREAD_GRAYSCALE)
    _next_keyPoint, st, err = cv2.calcOpticalFlowPyrLK(
        _prev_frame, _next_frame, _prev_keyPoint, None, **_lk_params)
    keyPoints.append([{"prevX": int(kp[0][0]), "prevY":int(kp[0][1]),
                       "nextX": int(kp[1][0]), "nextY":int(kp[1][1])}
                      for kp in zip(_prev_keyPoint[st == 1], _next_keyPoint[st == 1])])
    _prev_frame = _next_frame
    _prev_keyPoint = _next_keyPoint[st == 1].reshape([-1, 1, 2])
