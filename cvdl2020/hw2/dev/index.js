const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const cors = require('@koa/cors');
const cv = require('opencv4nodejs')

let img = cv.imread(`${__dirname}/../Q4_Image/1.jpg`, cv.IMREAD_COLOR)
console.log(img)
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
    }
})
app.listen(3000);