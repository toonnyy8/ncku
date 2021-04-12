import * as glm from "./lib/gl-matrix"
import * as shader from "./shader"

interface Point {
    x: number
    y: number
}
interface Line {
    from: Point
    to: Point
}
const calcVecLen = (vec: Point) => {
    return (vec.x ** 2 + vec.y ** 2) ** 0.5
}
const calcLineLen = (line: Line) => {
    let vec = { x: line.to.x - line.from.x, y: line.to.y - line.from.y }
    return calcVecLen(vec)
}
const calcDist = (point: Point, line: Line) => {
    let vec1 = { x: point.x - line.from.x, y: point.y - line.from.y }
    let vec2 = { x: line.to.x - line.from.x, y: line.to.y - line.from.y }
    let vec2Len = calcVecLen(vec2)
    let len = (vec1.x * vec2.x + vec1.y * vec2.y) / vec2Len
    if (len < 0) {
        return (vec1.x ** 2 + vec1.y ** 2) ** 0.5
    } else if (len > vec2Len) {
        let vec3 = { x: point.x - line.to.x, y: point.y - line.to.y }
        return calcVecLen(vec3)
    } else {
        return (calcVecLen(vec1) ** 2 - len ** 2) ** 0.5
    }
}

console.log(calcDist({ x: 2, y: 1 }, { from: { x: 0, y: 0 }, to: { x: 1, y: 0 } }))

const calcWeight = (point: Point, line: Line, a: number, b: number, p: number) => {
    let dist = calcDist(point, line)
    let lineLen = calcLineLen(line)
    return (lineLen ** p / (a + dist)) ** b
}
const normalizeWeights = (weights: number[]) => {
    let acc = weights.reduce((acc, curr) => acc + curr, 0)
    return weights.map((w) => w / acc)
}
const line2line = (line1: Line, line2: Line, t: number) => {
    let translate = { x: (line2.from.x - line1.from.x) * t, y: (line2.from.y - line1.from.y) * t }
    let scale = t * (calcLineLen(line2) / calcLineLen(line1)) + (1 - t)
    // let rotation = t * (calcLineLen(line2) / calcLineLen(line1)) + (1 - t)
}

console.log(glm)
;(async () => {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas")

    const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true })
    gl.clearColor(0, 0, 0, 1)
    gl.clearDepth(1)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    document.getElementById("load").onclick = () => {
        const inp = document.createElement("input")
        inp.type = "file"
        inp.accept = "image/*"
        inp.onchange = () => {
            const files = inp.files
            const reader = new FileReader()
            reader.addEventListener("loadend", async () => {
                let img = new Image()
                img.onload = () => {
                    const fieldOfView = (60 * Math.PI) / 180 // in radians
                    const aspect = gl.canvas.height / gl.canvas.width
                    const zNear = 0.01
                    const zFar = 1000
                    const projectionMatrix = glm.mat4.perspective(
                        glm.mat4.create(),
                        fieldOfView,
                        aspect,
                        zNear,
                        zFar
                    )

                    let v = glm.mat4.lookAt(glm.mat4.create(), [0, 0, 1], [0, 0, 0], [0, 1, 0])

                    let mvp = glm.mat4.multiply(glm.mat4.create(), projectionMatrix, v)

                    /**
                     * @type {number[]}
                     */
                    let arr = []
                    /**
                     * @type {number[]}
                     */
                    let uv_arr = []
                    for (let y = -1; y <= 1; y += 0.1) {
                        for (let x = -1; x <= 1; x += 0.1) {
                            arr = arr.concat([x, y])
                            uv_arr = uv_arr.concat([(x + 1) / 2, 1 - (y + 1) / 2])
                            // console.log([x, y])
                        }
                    }
                    console.log(arr)

                    /**
                     * @type {number[]}
                     */
                    let idx_arr = []
                    for (let j = 0; j < 20; j++) {
                        // idx_arr = idx_arr.concat([i, i + 1, i + 22])
                        // idx_arr = idx_arr.concat([i, i + 22, i + 21])
                        for (let i = 0; i < 20; i++) {
                            const n = j * 21 + i
                            idx_arr = idx_arr.concat([n, n + 1, n + 22])
                            idx_arr = idx_arr.concat([n, n + 22, n + 21])
                            // console.log([i, i + 1, i + 22])
                        }
                    }

                    // for (let i = 0;i < 20;i++) {
                    //     idx_arr = idx_arr.concat([i, i + 1, i + 22])
                    //     idx_arr = idx_arr.concat([i, i + 22, i + 21])
                    // }
                    console.log(idx_arr)

                    let vs_source =
                        `#version 300 es\n` +
                        `layout (location = 0) in vec2 a_position;\n` +
                        `layout (location = 1) in vec2 a_texcoord;\n` +
                        `uniform mat4 u_mvp;\n` +
                        `out vec2 v_texcoord;\n` +
                        `void main(void) {\n` +
                        `   gl_Position = vec4(a_position.x, a_position.y, 0.0, 1.0);\n` +
                        `   v_texcoord = a_texcoord;\n` +
                        `}\n`
                    let fs_source =
                        `#version 300 es\n` +
                        `precision mediump float;\n` +
                        `in vec2 v_texcoord;\n` +
                        `uniform sampler2D u_texture;\n` +
                        `out vec4 f_color;\n` +
                        `void main(void) {\n` +
                        `   f_color = texture(u_texture, v_texcoord);\n` +
                        // `   f_color = vec4(v_texcoord, 0.5, 1.0);\n` +
                        `}\n`

                    let program = shader.createProgram(gl, vs_source, fs_source)

                    gl.enableVertexAttribArray(0)
                    const positionBuffer = gl.createBuffer()
                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
                    gl.bufferData(
                        gl.ARRAY_BUFFER,
                        // new Float32Array([
                        //     -1, -1,
                        //     -0.8, -1,
                        //     -0.8, -0.8,
                        // ]),
                        new Float32Array(arr),
                        gl.STATIC_DRAW
                    )
                    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

                    gl.enableVertexAttribArray(1)
                    const texcoordBuffer = gl.createBuffer()
                    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv_arr), gl.STATIC_DRAW)
                    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0)

                    const ebo = gl.createBuffer()
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(idx_arr), gl.STATIC_DRAW)
                    gl.useProgram(program)

                    const texture = gl.createTexture()
                    gl.bindTexture(gl.TEXTURE_2D, texture)

                    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, img.width, img.height)
                    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGB, gl.UNSIGNED_BYTE, img)
                    gl.generateMipmap(gl.TEXTURE_2D)

                    let u_textureLocation = gl.getUniformLocation(program, "u_texture")
                    gl.uniform1i(u_textureLocation, 0)
                    gl.activeTexture(gl.TEXTURE0)
                    gl.bindTexture(gl.TEXTURE_2D, texture)

                    gl.drawElements(gl.TRIANGLES, idx_arr.length, gl.UNSIGNED_INT, 0)
                }
                img.src = <string>reader.result
            })
            reader.readAsDataURL(files[0])
        }
        inp.click()
    }
})()
