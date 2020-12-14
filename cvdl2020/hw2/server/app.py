from cv2 import cv2 as cv2

import tool
import q2

from flask import Flask
from flask import jsonify
from flask import send_file
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
bgSub = cv2.VideoCapture("../Q1_Image/bgSub.mp4")
bgSubFramesBuffer = tool.get_frames_buffer(bgSub, cv2.COLOR_BGR2GRAY)

q2

img = cv2.cvtColor(
    cv2.imread("../Q3_Image/rl.jpg"),
    cv2.COLOR_BGR2GRAY
)


@app.route("/")
def helloWorld():
    return "Hello, cross-origin-world!"


@app.route("/q1-inf")
def q1_size():
    return jsonify({
        "fps": bgSub.get(cv2.CAP_PROP_FPS),
    })


@app.route("/q2-inf")
def q2_inf():
    return jsonify({
        "fps": q2.fps,
        "keyPoints": q2.keyPoints,
    })
