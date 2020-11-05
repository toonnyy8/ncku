import { WASI } from "@wasmer/wasi"

const fs = require("fs")
let moduleBuffer = fs.readFileSync(`${__dirname}/../wasm/module.wasm`)

const wasi = new WASI({});

export default WebAssembly.instantiate(
    moduleBuffer,
    {
        wasi_snapshot_preview1: wasi.wasiImport,
        env: { main: () => { } }
    })
    .then(obj => {
        return {
            memory: <WebAssembly.Memory>obj.instance.exports.memory,
            gray: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.gray,
            extract_red: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.extract_red,
            extract_green: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.extract_green,
            extract_blue: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.extract_blue,
            mean_filter: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.mean_filter,
            median_filter: <(img_ptr: number, width: number, height: number) => number>obj.instance.exports.median_filter,
        }
    })
