const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const cv2 = require('opencv4nodejs')

let img = cv2.imread(`${__dirname}/../Q4_Image/1.jpg`, cv2.IMREAD_COLOR)

let bgSub = new cv2.VideoCapture(`${__dirname}/../Q1_Image/bgSub.mp4`)
/**
 * @type {Buffer}
 */
let bgSubFrames
let bgSubH = 0, bgSubW = 0, bgSubFrameNum = 0
{
    let frame = bgSub.read().cvtColor(cv2.COLOR_BGR2GRAY)
    bgSubFrames = frame.getData()
    bgSubH = frame.rows
    bgSubW = frame.cols
    bgSubFrameNum += 1
    while (1) {
        frame = bgSub.read()
        if (frame.empty) {
            break
        }
        frame = frame.cvtColor(cv2.COLOR_BGR2GRAY)
        bgSubFrameNum += 1
        bgSubFrames = Buffer.concat([bgSubFrames, frame.getData()])
    }
}
const app = new Koa();
app.use(cors());
function render(filename) {
    let fullpath = path.join(__dirname, filename)
    return fs.readFileSync(fullpath, 'binary')
}

/**
在此可組合各種 Middleware
**/
app.use(async (ctx) => {
    console.log(ctx.request.url)

    switch (ctx.request.url) {
        case "/":
            ctx.body = render('index.html')
            break
        case "/test.js":
            ctx.type = 'text/javascript'
            ctx.body = render('test.js')
            break
        case "/test":
            ctx.body = JSON.stringify({ hello: "world" })
            break
        case "/q1-size":
            ctx.body = JSON.stringify({ h: bgSubH, w: bgSubW, frameNum: bgSubFrameNum })
            break
        case "/q1-img":
            ctx.body = bgSubFrames
            break
    }
})
app.listen(3000);