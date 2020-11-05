import wasm from "./wasm"

const canvas = <HTMLCanvasElement>document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const imgHistory: ImageData[] = []
const len = <T>(arr: T[]) => arr.length


let undo_bn = <HTMLButtonElement>document.getElementById("undo")
undo_bn.onclick = () => {
    if (len(imgHistory) > 0) {
        imgHistory.pop()
    }
    if (len(imgHistory) > 0) {
        ctx.putImageData(imgHistory[len(imgHistory) - 1], 0, 0)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = 0
        canvas.height = 0
    }
}

let upload_bn = <HTMLButtonElement>document.getElementById("upload")
upload_bn.onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            var img = new Image;
            img.onload = () => {
                console.log(img.width, img.height)
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                // const imgArray = new Uint8Array(ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer)
                imgHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height))
            }
            img.src = <string>reader.result
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

let gray_bn = <HTMLButtonElement>document.getElementById("gray")
gray_bn.onclick = () => {
    wasm
        .then(({ memory, gray }) => {
            const mem = new Int32Array(memory.buffer);
            const imgData = imgHistory[len(imgHistory) - 1]
            mem.set(new Uint8Array(imgData.data.buffer))

            const result_ptr = gray(0, imgData.width, imgData.height)

            const result = mem.slice(result_ptr / Int32Array.BYTES_PER_ELEMENT, result_ptr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);
        })
}


let extract_red_bn = <HTMLButtonElement>document.getElementById("extract-red")
extract_red_bn.onclick = () => {
    wasm
        .then(({ memory, extract_red }) => {
            const mem = new Int32Array(memory.buffer);
            const imgData = imgHistory[len(imgHistory) - 1]
            mem.set(new Uint8Array(imgData.data.buffer))

            const result_ptr = extract_red(0, imgData.width, imgData.height)

            const result = mem.slice(result_ptr / Int32Array.BYTES_PER_ELEMENT, result_ptr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);
        })
}

let extract_green_bn = <HTMLButtonElement>document.getElementById("extract-green")
extract_green_bn.onclick = () => {
    wasm
        .then(({ memory, extract_green }) => {
            const mem = new Int32Array(memory.buffer);
            const imgData = imgHistory[len(imgHistory) - 1]
            mem.set(new Uint8Array(imgData.data.buffer))

            const result_ptr = extract_green(0, imgData.width, imgData.height)

            const result = mem.slice(result_ptr / Int32Array.BYTES_PER_ELEMENT, result_ptr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);
        })
}

let extract_blue_bn = <HTMLButtonElement>document.getElementById("extract-blue")
extract_blue_bn.onclick = () => {
    wasm
        .then(({ memory, extract_blue }) => {
            const mem = new Int32Array(memory.buffer);
            const imgData = imgHistory[len(imgHistory) - 1]
            mem.set(new Uint8Array(imgData.data.buffer))

            const result_ptr = extract_blue(0, imgData.width, imgData.height)

            const result = mem.slice(result_ptr / Int32Array.BYTES_PER_ELEMENT, result_ptr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);
        })
}

let mean_filter_bn = <HTMLButtonElement>document.getElementById("mean-filter")
mean_filter_bn.onclick = () => {
    wasm
        .then(({ memory, mean_filter }) => {
            const mem = new Int32Array(memory.buffer);
            const imgData = imgHistory[len(imgHistory) - 1]
            mem.set(new Uint8Array(imgData.data.buffer))

            const result_ptr = mean_filter(0, imgData.width, imgData.height)

            const result = mem.slice(result_ptr / Int32Array.BYTES_PER_ELEMENT, result_ptr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);
        })
}

let median_filter_bn = <HTMLButtonElement>document.getElementById("median-filter")
median_filter_bn.onclick = () => {
    wasm
        .then(({ memory, median_filter }) => {
            const mem = new Int32Array(memory.buffer);
            const imgData = imgHistory[len(imgHistory) - 1]
            mem.set(new Uint8Array(imgData.data.buffer))

            const result_ptr = median_filter(0, imgData.width, imgData.height)

            const result = mem.slice(result_ptr / Int32Array.BYTES_PER_ELEMENT, result_ptr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);
        })
}