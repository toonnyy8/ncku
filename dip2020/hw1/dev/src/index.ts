import wasm from "./wasm"
import { histogram } from "./histogram"

const canvas = <HTMLCanvasElement>document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const buffer_canvas = <HTMLCanvasElement>document.getElementById("buffer-canvas")
const buffer_ctx = buffer_canvas.getContext("2d")

const imgHistory: ImageData[] = []
const len = <T>(arr: T[]) => arr.length


let undo_bn = <HTMLButtonElement>document.getElementById("undo")
undo_bn.onclick = () => {
    if (len(imgHistory) > 0) {
        imgHistory.pop()
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (len(imgHistory) > 0) {
        let oldImg = imgHistory[len(imgHistory) - 1]
        canvas.width = oldImg.width
        canvas.height = oldImg.height
        ctx.putImageData(oldImg, 0, 0)
    } else {
        canvas.width = 0
        canvas.height = 0
    }
}


let store_bn = <HTMLButtonElement>document.getElementById("store")
store_bn.onclick = () => {
    let bufImg = ctx.getImageData(0, 0, canvas.width, canvas.height)
    buffer_canvas.width = bufImg.width
    buffer_canvas.height = bufImg.height
    buffer_ctx.putImageData(bufImg, 0, 0)
}

let load_bn = <HTMLButtonElement>document.getElementById("load")
load_bn.onclick = () => {
    let img = buffer_ctx.getImageData(0, 0, canvas.width, canvas.height)
    canvas.width = img.width
    canvas.height = img.height
    ctx.putImageData(img, 0, 0)
    imgHistory.push(img)
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
        .then(({ memory, gray, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = gray(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}


let extract_red_bn = <HTMLButtonElement>document.getElementById("extract-red")
extract_red_bn.onclick = () => {
    wasm
        .then(({ memory, extract_red, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = extract_red(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let extract_green_bn = <HTMLButtonElement>document.getElementById("extract-green")
extract_green_bn.onclick = () => {
    wasm
        .then(({ memory, extract_green, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = extract_green(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let extract_blue_bn = <HTMLButtonElement>document.getElementById("extract-blue")
extract_blue_bn.onclick = () => {
    wasm
        .then(({ memory, extract_blue, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = extract_blue(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let mean_filter_bn = <HTMLButtonElement>document.getElementById("mean-filter")
mean_filter_bn.onclick = () => {
    wasm
        .then(({ memory, mean_filter, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = mean_filter(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let median_filter_bn = <HTMLButtonElement>document.getElementById("median-filter")
median_filter_bn.onclick = () => {
    wasm
        .then(({ memory, median_filter, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = median_filter(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // console.log(
            //     result
            // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}


let histogram_bn = <HTMLButtonElement>document.getElementById("histogram")
histogram_bn.onclick = () => {
    wasm
        .then(({ memory, histogram, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = histogram(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            // // console.log(
            // //     result
            // // )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let threshold_bn = <HTMLButtonElement>document.getElementById("threshold")
threshold_bn.onclick = () => {
    wasm
        .then(({ memory, threshold, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const cutoff = Number((<HTMLInputElement>document.getElementById("cutoff")).value)

            const resultPtr = threshold(imgPtr, imgData.width, imgData.height, cutoff)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            console.log(
                result
            )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let vertical_filter_bn = <HTMLButtonElement>document.getElementById("vertical-filter")
vertical_filter_bn.onclick = () => {
    wasm
        .then(({ memory, vertical_filter, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = vertical_filter(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            console.log(
                result
            )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let horizontal_filter_bn = <HTMLButtonElement>document.getElementById("horizontal-filter")
horizontal_filter_bn.onclick = () => {
    wasm
        .then(({ memory, horizontal_filter, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer);

            const imgData = imgHistory[len(imgHistory) - 1]
            const imgArr = new Uint8Array(imgData.data.buffer)
            const imgPtr = new_int_arr(imgArr.length)
            mem.set(imgArr, imgPtr / Int32Array.BYTES_PER_ELEMENT)

            const resultPtr = horizontal_filter(imgPtr, imgData.width, imgData.height)

            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)
            console.log(
                result
            )
            const resultImgData = new ImageData(new Uint8ClampedArray(result), imgData.width, imgData.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(imgPtr)
            delete_int_arr(resultPtr)
        })
}

let combined_bn = <HTMLButtonElement>document.getElementById("combined")
combined_bn.onclick = () => {
    wasm
        .then(({ memory, combined, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer)

            const img1Data = imgHistory[len(imgHistory) - 1]
            const img1Arr = new Uint8Array(img1Data.data.buffer)
            const img1Ptr = new_int_arr(img1Arr.length)
            mem.set(img1Arr, img1Ptr / Int32Array.BYTES_PER_ELEMENT)

            const img2Data = buffer_ctx.getImageData(0, 0, buffer_canvas.width, buffer_canvas.height)
            const img2Arr = new Uint8Array(img2Data.data.buffer)
            const img2Ptr = new_int_arr(img2Arr.length)
            mem.set(img2Arr, img2Ptr / Int32Array.BYTES_PER_ELEMENT)
            console.log(mem.byteLength)

            const rate = Number((<HTMLInputElement>document.getElementById("combined-rate")).value)

            const resultPtr = combined(img1Ptr, img2Ptr, img1Data.width, img1Data.height, rate)
            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)

            const resultImgData = new ImageData(new Uint8ClampedArray(result), img1Data.width, img1Data.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(img1Ptr)
            delete_int_arr(img2Ptr)
            delete_int_arr(resultPtr)
        })
}

let overlap_bn = <HTMLButtonElement>document.getElementById("overlap")
overlap_bn.onclick = () => {
    wasm
        .then(({ memory, overlap, new_int_arr, delete_int_arr }) => {
            const mem = new Int32Array(memory.buffer)

            const img1Data = imgHistory[len(imgHistory) - 1]
            const img1Arr = new Uint8Array(img1Data.data.buffer)
            const img1Ptr = new_int_arr(img1Arr.length)
            mem.set(img1Arr, img1Ptr / Int32Array.BYTES_PER_ELEMENT)

            const img2Data = buffer_ctx.getImageData(0, 0, buffer_canvas.width, buffer_canvas.height)
            const img2Arr = new Uint8Array(img2Data.data.buffer)
            const img2Ptr = new_int_arr(img2Arr.length)
            mem.set(img2Arr, img2Ptr / Int32Array.BYTES_PER_ELEMENT)
            console.log(mem.byteLength)

            const resultPtr = overlap(img1Ptr, img2Ptr, img1Data.width, img1Data.height)
            const result = mem.slice(resultPtr / Int32Array.BYTES_PER_ELEMENT, resultPtr / Int32Array.BYTES_PER_ELEMENT + canvas.height * canvas.width * 4)

            const resultImgData = new ImageData(new Uint8ClampedArray(result), img1Data.width, img1Data.height)
            imgHistory.push(resultImgData)
            ctx.putImageData(resultImgData, 0, 0);

            delete_int_arr(img1Ptr)
            delete_int_arr(img2Ptr)
            delete_int_arr(resultPtr)
        })
}