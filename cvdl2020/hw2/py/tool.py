from cv2 import cv2 as cv2


def get_frames(capture: cv2.VideoCapture, colorCode: int = None):
    frames = []
    while (True):
        ret, frame = capture.read()
        if not ret:
            break
        if colorCode != None:
            frame = cv2.cvtColor(frame, colorCode)
        frames.append(frame)
    return frames


def get_frames_buffer(capture: cv2.VideoCapture, colorCode: int = None):
    frames = get_frames(capture, colorCode)
    buffer = frames[0].data.tobytes()
    for frame in frames[1:]:
        buffer += frame.data.tobytes()
    return buffer
