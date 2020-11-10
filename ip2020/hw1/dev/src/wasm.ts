import { WASI } from "@wasmer/wasi"

const fs = require("fs")
let moduleBuffer = fs.readFileSync(`${__dirname}/../wasm/module.wasm`)

const wasi = new WASI({});

let messages = []

export default WebAssembly.instantiate(
    moduleBuffer,
    {
        wasi_snapshot_preview1: wasi.wasiImport,
        env: {
            main: () => { },
            consoleLog: (num: number) => console.log(num),
            postMessage: (num: number) => messages.push(num),
        }
    })
    .then(obj => {
        return {
            getMessage: () => {
                let msg = [...messages]
                messages = []
                return msg
            },
            memory: <WebAssembly.Memory>obj.instance.exports.memory,
            new_int_arr: <(size: number) => number>obj.instance.exports.new_int_arr,
            delete_int_arr: <(ptr: number) => void>obj.instance.exports.delete_int_arr,
            gray: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.gray,
            extract_red: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.extract_red,
            extract_green: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.extract_green,
            extract_blue: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.extract_blue,
            mean_filter: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.mean_filter,
            median_filter: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.median_filter,
            histogram: <(img_ptr: number, width: number, height: number, channel: number) => number>obj.instance.exports.histogram,
            equalization: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.equalization,
            threshold: <(img_ptr: number, width: number, height: number, cutoff: number) => number>obj.instance.exports.threshold,
            vertical_filter: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.vertical_filter,
            horizontal_filter: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.horizontal_filter,
            combined: <(img1_ptr: number, img2_ptr: number, width: number, height: number, rate: number) => number>obj.instance.exports.combined,
            overlap: <(img1_ptr: number, img2_ptr: number, width: number, height: number) => number>obj.instance.exports.overlap,
            new_vec: <(x: number, y: number) => number>obj.instance.exports.new_vec,
            delete_vec: <(ptr: number) => void>obj.instance.exports.delete_vec,
            transpose: <(
                img_ptr: number,
                width: number,
                height: number,
                new_width: number,
                new_height: number,
                img_pt1: number,
                img_pt2: number,
                matching_pt1: number,
                matching_pt2: number) => number>obj.instance.exports.transpose,
            intensity_difference: <(img1_ptr: number, img2_ptr: number, width: number, height: number) => number>obj.instance.exports.intensity_difference,
        }
    })
