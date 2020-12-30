from flask_cors import CORS
from flask import send_file
from flask import request
from flask import jsonify
from flask import Flask
import q5
import q4
import q3
import q2
import tool
from cv2 import cv2 as cv2
import numpy as np
from PIL import Image
import io
import torch
torch.device('cpu')


app = Flask(__name__)
CORS(app)
bgSub = cv2.VideoCapture("../Q1_Image/bgSub.mp4")
bgSubFramesBuffer = tool.get_frames_buffer(bgSub, cv2.COLOR_BGR2GRAY)

q2

img = cv2.cvtColor(
    cv2.imread("../Q3_Image/rl.jpg"),
    cv2.COLOR_BGR2GRAY
)


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


@app.route("/q3-video")
def q3_video():
    with open("./q3.webm", 'rb') as bites:
        return send_file(
            io.BytesIO(bites.read()),
            mimetype='video/webm'
        )


@app.route("/q4-img")
def q4_img():
    return np.concatenate([q4.imgs, q4.imgs_new]).tobytes()


@app.route("/q5-img", methods=['POST'])
def q5_img():
    img_inf = request.get_json()
    with open("../kagglecatsanddogs_3367a/PetImages/{}/{}.jpg".format(img_inf["class"], img_inf["idx"]), 'rb') as bites:
        return send_file(
            io.BytesIO(bites.read()),
            mimetype='image/jpg'
        )


@app.route("/q5-test", methods=['POST'])
def q5_test():
    img_inf = request.get_json()
    img = Image.open(
        "../kagglecatsanddogs_3367a/PetImages/{}/{}.jpg".format(img_inf["class"], img_inf["idx"]))

    img = img.resize((224, 224), Image.ANTIALIAS).convert('L')
    out = q5.model(torch.tensor(np.array(img).reshape(
        [1, 1, 224, 224])/255, dtype=torch.float32))
    return jsonify({
        "pred": out[0].tolist(),
    })


@app.route("/q5-re", methods=['POST'])
def q5_re():
    img_inf = request.get_json()
    img = cv2.imread(
        "../kagglecatsanddogs_3367a/PetImages/{}/{}.jpg".format(img_inf["class"], img_inf["idx"]))
    img = q5.random_erasing(img, 1, 0.4, 0.1, 0.4, 0.1)
    cv2.imwrite("re.jpg", img)
    with open("./re.jpg", 'rb') as bites:
        return send_file(
            io.BytesIO(bites.read()),
            mimetype='image/jpg'
        )
