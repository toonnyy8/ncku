///<reference path="../src/glb.js">

/**
 * @type {HTMLButtonElement}
 */
const load_bn = document.getElementById("load")
load_bn.onclick = () => {

    const inp = document.createElement("input")
    inp.type = "file"
    inp.accept = ".glb"
    inp.onchange = () => {
        const files = inp.files
        const reader = new FileReader()
        reader.addEventListener("loadend", () => {
            const { gltf, bin } = Gltf.importFromArrayBuffer(reader.result)
            console.log(gltf)
        })
        reader.readAsArrayBuffer(files[0])
    }
    inp.click()
}

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById("canvas")

const gl = canvas.getContext("webgl2")
gl.clearColor(0, 0, 0, 1)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)