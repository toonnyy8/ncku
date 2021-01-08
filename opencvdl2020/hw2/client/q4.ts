import * as tf from "@tensorflow/tfjs"
export const runQ4 = () => {
    {
        let baseline = 178
        let focal = 2826
        let xr_xl = 123
        let h = 1920
        let w = 2820
        let calcDepth = (disparity: number) => {
            return (baseline * focal) / (disparity + xr_xl)
        }
        let img = new Image()
        let canvas = document.createElement("canvas")
        canvas.style.width = "600px"
        canvas.width = w
        canvas.height = h
        document.body.appendChild(canvas)
        document.body.appendChild(document.createElement("br"))

        let textarea = document.createElement("textarea")
        textarea.style.width = "100%"
        textarea.readOnly = true
        document.body.appendChild(textarea)
        document.body.appendChild(document.createElement("br"))

        let button = document.createElement("button")
        button.innerText = "Q4"
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            fetch(`http://localhost:5000/q4-img`)
                .then((response) => response.blob())
                .then((blob) => {
                    img.src = URL.createObjectURL(blob)
                    img.onload = () => {
                        let ctx = canvas.getContext("2d")
                        ctx.drawImage(img, 0, 0, w, h)
                    }
                    return fetch(`http://localhost:5000/q4-disparity`)
                })
                .then((response) => response.arrayBuffer())
                .then((buf) => {
                    let rect = canvas.getBoundingClientRect()
                    let u8buf = new Uint8Array(buf)
                    // console.log(u8buf)
                    console.log(rect)
                    canvas.onmousedown = (e) => {
                        let obj = <HTMLElement>canvas
                        let obj_left = 0
                        let obj_top = 0
                        let xpos = e.pageX
                        let ypos = e.pageY
                        while (obj.offsetParent) {
                            obj_left += obj.offsetLeft
                            obj_top += obj.offsetTop
                            obj = <HTMLElement>obj.offsetParent
                        }
                        xpos -= obj_left
                        xpos *= w / 600
                        xpos = Math.round(xpos)
                        ypos -= obj_top
                        ypos *= w / 600
                        ypos = Math.round(ypos)
                        let disparity = u8buf[ypos * w + xpos]
                        let depth = calcDepth(disparity)
                        let ctx = canvas.getContext("2d")
                        ctx.drawImage(img, 0, 0, w, h)
                        ctx.fillStyle = "#ff5555"
                        ctx.fillRect(xpos - 25, ypos - 25, 51, 51)
                        console.log({ xpos: xpos, ypos: ypos })
                        console.log(depth)
                        textarea.value = `disparity：${disparity} pixels
depth：${depth} mm`
                    }
                })
        }
    }
}
