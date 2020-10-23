import * as tf from "@tensorflow/tfjs"

document.getElementById("q1-upload").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = (event) => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = function () {
                console.log(img.height, img.width)
                canvas.height = img.height
                canvas.width = img.width
                ctx.drawImage(img, 0, 0); // Or at whatever offset you like
                document.getElementById("q1").append(canvas)
            };
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}
