import fs from "fs"
import { WASI } from "@wasmer/wasi"
const wasi = new WASI({});
let wasmBuffer = fs.readFileSync(`${__dirname}/../wasm/sum.wasm`)
let wasmBuffer_copy = fs.readFileSync(`${__dirname}/../wasm/copy.wasm`)
let wasmBuffer_gray = fs.readFileSync(`${__dirname}/../wasm/gray.wasm`)

WebAssembly.instantiate(wasmBuffer_gray, { wasi_snapshot_preview1: wasi.wasiImport, env: { main: () => { } } })
    .then(obj => {
        var i32 = new Int32Array(obj.instance.exports.memory.buffer);
        for (var i = 0; i < 16; i++) {
            i32[i] = i;
        }
        let result = obj.instance.exports.gray(0, 2, 2)

        console.log(
            i32.slice(result / Int32Array.BYTES_PER_ELEMENT, result / Int32Array.BYTES_PER_ELEMENT + 16)
        )

    })