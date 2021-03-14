///<reference path="../src/gltf.js">
///<reference path="../src/gl-matrix.js">
///<reference path="../src/shader.js">
///<reference path="../src/gl-unit.js">


; (async () => {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("canvas")

    const gl = canvas.getContext("webgl2")
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    // shader.createProgram(gl,)
    console.log(gl)


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
            reader.addEventListener("loadend", async () => {
                const { doc, bin, imgs } = await gltf.importFromArrayBuffer(reader.result)
                console.log(doc)
                console.log(imgs)
                imgs.forEach(img => document.body.appendChild(img))

                const textures = gltf.createTexture(gl, doc, imgs)
                console.log(textures)


                // let { vertexShader, fragmentShader } = shader.createShaderSource(1)
                // const program = shader.createProgram(gl, vertexShader, fragmentShader)
                // gl.useProgram(program)
                // let xx = glMatrix.mat4.create()
                // let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
                // let zNear = 1
                // let zFar = 2000
                // glMatrix.mat4.perspective(xx, Math.PI / 2, aspect, zNear, zFar)

                const primitive = glUnit.primitive(gl, doc, bin)
                primitive.draw(glMatrix.mat4.create(), textures)
            })
            reader.readAsArrayBuffer(files[0])
        }
        inp.click()
    }
})()
