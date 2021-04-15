import { Transform } from "./pose"
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

export const calcWeight = (point: Point, line: Line, a: number, b: number, p: number) => {
    let dist = calcDist(point, line)
    let lineLen = calcLineLen(line)
    return (lineLen ** p / (a + dist)) ** b
}

export const genShaderProgram = (gl: WebGL2RenderingContext, lineNum: number, isBg = true) => {
    let vs_source =
        `#version 300 es\n` +
        `precision mediump float;\n` +
        `layout (location = 0) in vec2 a_position;\n` +
        `layout (location = 1) in vec2 a_texcoord;\n` +
        new Array(lineNum).fill(0).reduce((prev, _, idx) => {
            if (idx % 4 == 0) {
                return prev + `layout (location = ${idx / 4 + 2}) in vec4 a_w${idx / 4};\n`
            } else {
                return prev
            }
        }, ``) +
        new Array(lineNum).fill(0).reduce((prev, _, idx) => {
            return prev + `uniform mat3 u_m${idx};\n`
        }, ``) +
        `uniform float u_time;\n` +
        `out vec2 v_texcoord;\n` +
        `void main(void) {\n` +
        `   mat3 m;\n` +
        new Array(lineNum).fill(0).reduce((prev, _, idx) => {
            return prev + `   m += u_m${idx} * a_w${Math.floor(idx / 4)}[${idx % 4}];\n`
        }, ``) +
        `   vec3 pos = m * vec3(a_position, 1.0);\n` +
        // `   gl_Position = vec4(u_time*a_position+(1.-u_time)*pos.xy, 0.0, 1.0);\n` +
        `   gl_Position = vec4(pos.xy, 0.0, 1.0);\n` +
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

export const render = (
    time: number,
    gl: WebGL2RenderingContext,
    program: WebGLProgram,
    vao: WebGLVertexArrayObject,
    texture: WebGLTexture,
    transforms: Transform[],
    count
) => {
    gl.useProgram(program)
    gl.bindVertexArray(vao)

    let u_textureLocation = gl.getUniformLocation(program, "u_texture")
    gl.uniform1i(u_textureLocation, 0)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)

    let u_timeLocation = gl.getUniformLocation(program, "u_time")
    gl.uniform1f(u_timeLocation, time)

    transforms.forEach((transform, lineIdx) => {
        let m = transform.withTime(1 - time)
        let u_mLocation = gl.getUniformLocation(program, `u_m${lineIdx}`)
        gl.uniformMatrix3fv(u_mLocation, false, m)
    })

    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0)
    gl.bindVertexArray(null)
}

export const genVAO = (
    gl: WebGL2RenderingContext,
    pos_arr: number[],
    uv_arr: number[],
    idx_arr: number[],
    weights: number[][]
) => {
    let vao = gl.createVertexArray()
    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(0)
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos_arr), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    gl.enableVertexAttribArray(1)
    const texcoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv_arr), gl.STATIC_DRAW)
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0)

    weights.forEach((weight, lineIdx) => {
        gl.enableVertexAttribArray(2 + lineIdx)
        const weightBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, weightBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(weight), gl.STATIC_DRAW)
        gl.vertexAttribPointer(2 + lineIdx, 4, gl.FLOAT, false, 0, 0)
    })

    const ebo = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(idx_arr), gl.STATIC_DRAW)
    gl.bindVertexArray(null)

    return vao
}
