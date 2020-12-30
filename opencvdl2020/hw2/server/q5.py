import torch
import resnet50
import numpy as np
from cv2 import cv2 as cv2
import random
torch.device('cpu')
model = resnet50.resnet50(num_classes=2)
model.load_state_dict(torch.load(
    "../ResNet50-RS.pkl", map_location=torch.device('cpu')))


def random_resize(img, eps, max_h, min_h, max_w, min_w):
    if random.uniform(0, 1) > eps:
        return img

    dim = len(img.shape)

    H = img.shape[0]
    W = img.shape[1]
    h = int(random.uniform(min_h, max_h)*H)
    w = int(random.uniform(min_w, max_w)*W)
    return cv2.resize(img, (h, w))
