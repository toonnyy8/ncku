import base64
import array
import numpy as np
import json
from cv2 import cv2  # as cv

import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return flask.render_template("index.html")


@app.route('/json', methods=['POST'])
def fetch():
    req = flask.request.get_json()

    img_array = np.asarray(
        bytearray(base64.b64decode(req["img"])), dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    ret, corners = cv2.findChessboardCorners(gray, (8, 11), None)
    if ret == True:
        criteria = (cv2.TERM_CRITERIA_EPS +
                    cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)
        corners2 = cv2.cornerSubPix(
            gray, corners, (11, 11), (-1, -1), criteria)

        # Draw and display the corners
        img = cv2.drawChessboardCorners(img, (8, 11), corners2, ret)

        return {"img": base64.b64encode(
            img.tobytes()).decode(), "corners": corners2.tolist()}

    return "faild"


app.run()
