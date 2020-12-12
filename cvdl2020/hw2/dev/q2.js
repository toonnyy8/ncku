const cv2 = require("opencv4nodejs");
const tool = require("./tool")
let opticalFlow = new cv2.VideoCapture(`${__dirname}/../Q2_Image/opticalFlow.mp4`)
let opticalFlowFrames = tool.getFrames(opticalFlow)
let img = opticalFlowFrames[0]
let params = new cv2.SimpleBlobDetectorParams()

// params.thresholdStep = 5
// params.minThreshold = 60
// params.maxThreshold = 100

params.filterByColor = true
params.blobColor = 0

params.filterByArea = true
params.minArea = 25
params.maxArea = 60

params.filterByCircularity = true
params.minCircularity = 0.6
params.maxCircularity = 1
cv2.calc
let d = new cv2.SimpleBlobDetector(params)
let p = d.detect(img)
let pImg = cv2.drawKeyPoints(img, p)
// cv2.imshowWait("pImg", pImg)
// module.exports