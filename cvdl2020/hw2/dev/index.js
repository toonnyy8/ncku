const fs = require("fs");
const path = require("path");
const Koa = require("koa");
const cors = require("@koa/cors");
const cv2 = require("opencv4nodejs");
const tool = require("./tool")
const q2 = require("./q2.js");
cv = require('./opencv.js')

let img = cv2.imread(`${__dirname}/../Q4_Image/1.jpg`, cv2.IMREAD_COLOR);

let bgSub = new cv2.VideoCapture(`${__dirname}/../Q1_Image/bgSub.mp4`)
let bgSubFramesBuffer = tool.getFramesBuffer(bgSub, cv2.COLOR_BGR2GRAY)

const app = new Koa();
app.use(cors());
function render(filename) {
    let fullpath = path.join(__dirname, filename);
    return fs.readFileSync(fullpath, "binary");
}


app.use(async (ctx) => {
    console.log(ctx.request.url);

    switch (ctx.request.url) {
        case "/":
            ctx.body = render("index.html");
            break;
        case "/test.js":
            ctx.type = "text/javascript";
            ctx.body = render("test.js");
            break;
        case "/test":
            ctx.body = JSON.stringify({ hello: "world" });
            break;
        case "/q1-size":
            ctx.body = JSON.stringify({
                h: bgSub.get(cv2.CAP_PROP_FRAME_HEIGHT),
                w: bgSub.get(cv2.CAP_PROP_FRAME_WIDTH),
                frameNum: bgSub.get(cv2.CAP_PROP_FRAME_COUNT),
                fps: bgSub.get(cv2.CAP_PROP_FPS),
            });
            break;
        case "/q1-img":
            ctx.body = bgSubFramesBuffer;
            break;
    }
});
app.listen(3000);
