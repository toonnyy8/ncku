import * as glm from "gl-matrix"
import "./pose"
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
const line2vec = (line: Line) => {
    return { x: line.to.x - line.from.x, y: line.to.y - line.from.y }
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

export const calcWeight = (point: Point, line: Line, a: number, b: number, p: number) => {
    let dist = calcDist(point, line)
    let lineLen = calcLineLen(line)
    return (lineLen ** p / (a + dist)) ** b
}
export const normalizeWeights = (weights: number[]) => {
    let acc = weights.reduce((acc, curr) => acc + curr, 0)
    return weights.map((w) => w / acc)
}
const line2line = (line1: Line, line2: Line, t: number) => {
    let translate = { x: (line2.from.x - line1.from.x) * t, y: (line2.from.y - line1.from.y) * t }
    let scale = t * (calcLineLen(line2) / calcLineLen(line1)) + (1 - t)
    let vec1 = line2vec(line1)
    let vec2 = line2vec(line2)
    let rotation = Math.acos(
        (vec1.x * vec2.x + vec1.y * vec2.y) / (calcVecLen(vec1) * calcVecLen(vec2))
    )
}
let m = glm.mat3.scale(glm.mat3.create(), glm.mat3.create(), glm.vec2.fromValues(2, 1))
let v = glm.vec2.transformMat3(glm.vec2.create(), glm.vec2.fromValues(1, 3), m)
console.log(v)

export const genShaderProgram = (gl: WebGL2RenderingContext, lineNum: number, isBg = true) => {
    let vs_source =
        `#version 300 es\n` +
        `layout (location = 0) in vec2 a_position;\n` +
        `layout (location = 1) in vec2 a_texcoord;\n` +
        new Array(lineNum).fill(0).reduce((prev, _, idx) => {
            return prev + `layout (location = ${idx + 2}) in float a_w${idx};\n`
        }, ``) +
        new Array(lineNum).fill(0).reduce((prev, _, idx) => {
            return prev + `uniform mat3 u_m${idx};\n`
        }, ``) +
        `out vec2 v_texcoord;\n` +
        `void main(void) {\n` +
        `   vec3 pos = vec3(0, 0, 0);\n` +
        new Array(lineNum).fill(0).reduce((prev, _, idx) => {
            return prev + `   pos += u_m${idx} * vec3(a_position.xy, 1.) * a_w${idx};\n`
        }, ``) +
        `   gl_Position = vec4(pos.x, pos.y, 0.0, 1.0);\n` +
        // `   gl_Position = vec4(a_position.xy, 0.0, 1.0);\n` +
        `   v_texcoord = a_texcoord;\n` +
        `}\n`
    let fs_source =
        `#version 300 es\n` +
        `precision mediump float;\n` +
        `in vec2 v_texcoord;\n` +
        `uniform sampler2D u_texture;\n` +
        `uniform float u_time;\n` +
        `out vec4 f_color;\n` +
        `void main(void) {\n` +
        `   f_color = texture(u_texture, v_texcoord);\n` +
        `   f_color = vec4(f_color.rgb, ${isBg ? 1 : "u_time"});\n` +
        // `   f_color = vec4(v_texcoord, 0.5, 1.0);\n` +
        `}\n`

    let program = shader.createProgram(gl, vs_source, fs_source)
    return program
}
export const genBufferData = (x: number, y: number) => {
    let pos_arr: number[] = []
    let uv_arr: number[] = []
    let idx_arr: number[] = []
    for (let j = 0; j <= y; j++) {
        for (let i = 0; i <= x; i++) {
            pos_arr = pos_arr.concat([i / (x / 2) - 1, j / (y / 2) - 1])
            uv_arr = uv_arr.concat([i / x, 1 - j / y])
            if (j != y && i != x) {
                const n = j * (x + 1) + i
                idx_arr = idx_arr.concat([n, n + 1, n + (x + 2)])
                idx_arr = idx_arr.concat([n, n + (x + 2), n + (x + 1)])
            }
        }
    }

    return { pos_arr, uv_arr, idx_arr }
}
;(async () => {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas")

    const gl = canvas.getContext("webgl2", {
        preserveDrawingBuffer: true,
        premultipliedAlpha: false,
    })
    gl.clearColor(0, 0, 0, 1)
    gl.clearDepth(1)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.depthMask(true)
    gl.depthFunc(gl.LEQUAL)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let bgProgram = genShaderProgram(gl, 11, true)
    let fgProgram = genShaderProgram(gl, 11, false)

    document.getElementById("load1").onclick = () => {
        const inp = document.createElement("input")
        inp.type = "file"
        inp.accept = "image/*"
        inp.onchange = () => {
            const files = inp.files
            const reader = new FileReader()
            reader.addEventListener("loadend", async () => {
                let img = new Image()
                img.onload = () => {
                    let { pos_arr, uv_arr, idx_arr } = genBufferData(24, 21)
                    let vs_source =
                        `#version 300 es\n` +
                        `layout (location = 0) in vec2 a_position;\n` +
                        `layout (location = 1) in vec2 a_texcoord;\n` +
                        `uniform mat4 u_mvp;\n` +
                        `out vec2 v_texcoord;\n` +
                        `void main(void) {\n` +
                        `   gl_Position = vec4(a_position.x, a_position.y, 0., 1.0);\n` +
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
                        `   f_color = vec4(f_color.rgb, 0.5);\n` +
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
                        new Float32Array(pos_arr),
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

    document.getElementById("load2").onclick = () => {
        const inp = document.createElement("input")
        inp.type = "file"
        inp.accept = "image/*"
        inp.onchange = () => {
            const files = inp.files
            const reader = new FileReader()
            reader.addEventListener("loadend", async () => {
                let img = new Image()
                img.onload = () => {
                    let { pos_arr, uv_arr, idx_arr } = genBufferData(20, 20)

                    let vs_source =
                        `#version 300 es\n` +
                        `layout (location = 0) in vec2 a_position;\n` +
                        `layout (location = 1) in vec2 a_texcoord;\n` +
                        `uniform mat4 u_mvp;\n` +
                        `out vec2 v_texcoord;\n` +
                        `void main(void) {\n` +
                        `   gl_Position = vec4(a_position.x, a_position.y, 0., 1.0);\n` +
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
                        // `   f_color = vec4(f_color.rgb, 1);\n` +
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
                        new Float32Array(pos_arr),
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
