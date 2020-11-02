
import fs from "fs"
let wasm = fs.readFileSync(__dirname + "/../../tfjs-backend-wasm.wasm")
let simd_wasm = fs.readFileSync(__dirname + "/../../tfjs-backend-wasm-simd.wasm")
let threaded_simd_wasm = fs.readFileSync(__dirname + "/../../tfjs-backend-wasm-threaded-simd.wasm")

export default {
    'tfjs-backend-wasm.wasm': URL.createObjectURL(new Blob([wasm], { type: 'application/wasm' })),
    'tfjs-backend-wasm-simd.wasm': URL.createObjectURL(new Blob([simd_wasm], { type: 'application/wasm' })),
    'tfjs-backend-wasm-threaded-simd.wasm': URL.createObjectURL(new Blob([threaded_simd_wasm], { type: 'application/wasm' })),
}