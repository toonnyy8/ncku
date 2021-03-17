///<reference path="../src/gltf.js">
///<reference path="../src/gl-matrix.js">
///<reference path="../src/shader.js">
///<reference path="../src/gl-unit.js">


; (async () => {
    /**
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById("canvas")

    const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true })
    gl.clearColor(0, 0, 0, 1)
    gl.clearDepth(1)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    const fieldOfView = 60 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.01;
    const zFar = 1000;
    const projectionMatrix = glMatrix.mat4.perspective(
        glMatrix.mat4.create(),
        fieldOfView,
        aspect,
        zNear,
        zFar,
    )
    let rotationY = 0;
    let rotationX = 0;
    let radius = 5
    let nowRadius = 5
    let offset = [0, 0, 0]
    let pointerdown = false
    let mouseX = 0
    let mouseY = 0

    canvas.ontouchstart = (e) => { e.preventDefault(); }
    canvas.ontouchend = (e) => { e.preventDefault(); }
    canvas.ontouchmove = (e) => { e.preventDefault(); }

    canvas.onmousedown = (e) => { e.preventDefault(); }
    canvas.onmouseup = (e) => { e.preventDefault(); }
    canvas.onmousemove = (e) => { e.preventDefault(); }

    canvas.onpointerdown = (e) => {
        pointerdown = true
        mouseX = e.x
        mouseY = e.y
    }
    canvas.onpointerup = (e) => { pointerdown = false }
    canvas.onpointermove = (e) => {
        e.preventDefault();
        if (pointerdown) {
            rotationY += Math.PI * (e.x - mouseX) / 360
            rotationX += Math.PI * (e.y - mouseY) / 360
        }
        mouseX = e.x
        mouseY = e.y
    }
    canvas.onwheel = (e) => {
        if (e.deltaY > 0) { radius *= 1.05 }
        else { radius /= 1.05 }
    }
    let scene
    let renderLoop = () => {
        if (nowRadius > radius / 1.01 && nowRadius < radius * 1.01) {
            nowRadius = radius
        } else
            if (nowRadius < radius) {
                nowRadius *= 1.01
            } else if (nowRadius > radius) {
                nowRadius /= 1.01
            }
        let v = glMatrix.mat4.lookAt(
            glMatrix.mat4.create(),
            [
                offset[0],
                offset[1],
                nowRadius + offset[2],
            ],
            offset,
            [0, 1, 0],
        )

        let mvp = glMatrix.mat4.multiply(
            glMatrix.mat4.create(),
            projectionMatrix,
            v,
        )
        if (rotationY > Math.PI * 2) {
            rotationY -= Math.PI * 2
        }
        if (rotationX > Math.PI / 2) {
            rotationX = Math.PI / 2
        } else if (rotationX < -Math.PI / 2) {
            rotationX = -Math.PI / 2
        }
        mvp = glMatrix.mat4.rotateX(
            glMatrix.mat4.create(),
            mvp,
            rotationX
        )
        mvp = glMatrix.mat4.rotateY(
            glMatrix.mat4.create(),
            mvp,
            rotationY
        )

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        if (scene != undefined) {
            scene.draw(mvp)
        }

        requestAnimationFrame(renderLoop)
    }
    renderLoop()

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

                const textures = gltf.createTexture(gl, doc, imgs)
                console.log(doc)
                let size_accessors = doc.accessors.filter(accessor => accessor["max"] != undefined)
                radius = size_accessors
                    .map(accessor =>
                        accessor.max
                            .map((v, idx) => (v - accessor.min[idx]) ** 2)
                            .reduce((prev, curr) => prev + curr) ** 0.5,
                        0)
                    .reduce((prev, curr) => prev > curr ? prev : curr, 0)
                nowRadius = radius

                const sceneInfo = doc.scenes[0]
                scene = glUnit.scene(gl, sceneInfo, doc, bin, textures)
            })
            reader.readAsArrayBuffer(files[0])
        }
        inp.click()
    }
})()
