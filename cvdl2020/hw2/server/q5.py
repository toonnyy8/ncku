import torch
import resnet50
from PIL import Image
import numpy as np
import random
torch.device('cpu')
model = resnet50.resnet50(num_classes=2)
model.load_state_dict(torch.load(
    "../ResNet50-RS.pkl", map_location=torch.device('cpu')))


def random_erasing(img, eps, max_h, min_h, max_w, min_w):
    if random.uniform(0, 1) > eps:
        return img

    dim = len(img.shape)

    H = img.shape[0]
    W = img.shape[1]
    h = int(random.uniform(min_h, max_h)*H)
    w = int(random.uniform(min_w, max_w)*W)

    y1 = random.randint(0, img.shape[0] - h)
    x1 = random.randint(0, img.shape[1] - w)

    _img = np.array(img)
    noise_type = random.randint(0, 2)
    if noise_type == 0:
        if dim == 2:
            _img[y1:y1+h, x1:x1+w] = 0
        elif dim == 3:
            _img[y1:y1+h, x1:x1+w, :] = 0
    elif noise_type == 1:
        if dim == 2:
            _img[y1:y1+h, x1:x1+w] = 255
        elif dim == 3:
            _img[y1:y1+h, x1:x1+w, :] = 255
    elif noise_type == 2:
        if dim == 2:
            _img[y1:y1+h, x1:x1+w] = np.uint8(np.random.rand(h, w)*255)
        elif dim == 3:
            _img[y1:y1+h, x1:x1+w,
                 :] = np.uint8(np.random.rand(h, w, _img.shape[2])*255)
    return _img
