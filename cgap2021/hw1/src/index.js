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
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.CULL_FACE);
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

                const fieldOfView = 45 * Math.PI / 180;   // in radians
                const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
                const zNear = 0.1;
                const zFar = 100.0;
                const projectionMatrix = glMatrix.mat4.create();

                glMatrix.mat4.perspective(projectionMatrix,
                    fieldOfView,
                    aspect,
                    zNear,
                    zFar);
                let cubeRotation = 0.7;

                glMatrix.mat4.translate(projectionMatrix,     // destination matrix
                    projectionMatrix,     // matrix to translate
                    [-0.0, 0.0, -6.0]);  // amount to translate
                glMatrix.mat4.rotate(projectionMatrix,  // destination matrix
                    projectionMatrix,  // matrix to rotate
                    cubeRotation,     // amount to rotate in radians
                    [0, 0, 1]);       // axis to rotate around (Z)
                glMatrix.mat4.rotate(projectionMatrix,  // destination matrix
                    projectionMatrix,  // matrix to rotate
                    cubeRotation * .7,// amount to rotate in radians
                    [0, 1, 0]);       // axis to rotate around (X)
                console.log(projectionMatrix)
                const primitive = glUnit.primitive(gl, doc, bin)
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                primitive.draw(projectionMatrix, textures)
            })
            reader.readAsArrayBuffer(files[0])
        }
        inp.click()
    }
})()
