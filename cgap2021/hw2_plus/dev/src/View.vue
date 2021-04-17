<template>
    <div>
        <canvas
            ref="canvasRef"
            v-bind:style="`width:${width}px;height:${height}px;`"
            width="500"
            height="500"
        ></canvas>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'morphing',
                'bg-yellow-300': mode == 'morphing',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'morphing'), run(time)"
        >
            image morphing
        </button>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'src',
                'bg-yellow-300': mode == 'src',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'src'), run(time)"
        >
            src
        </button>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'dst',
                'bg-yellow-300': mode == 'dst',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'dst'), run(time)"
        >
            dst
        </button>
        <div>
            <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                v-model="time"
                v-on:input="run(time)"
            />{{ time }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from "vue"
import { calcWeight, genShaderProgram, genBufferData, render, genVAO } from "./imgMorph"
import { Line as PoseLine, Transform } from "./pose"
import * as glm from "gl-matrix"
interface Point {
    x: number
    y: number
}
interface Line {
    from: Point
    to: Point
}

export default defineComponent({
    setup() {
        const run = ref((t: number) => {})
        const time = ref(0)
        const mode = ref("morphing")

        const canvasRef: Ref<HTMLCanvasElement> = ref()

        let srcImg: HTMLImageElement = new Image()
        let dstImg: HTMLImageElement = new Image()
        let width = ref(500),
            height = ref(500)

        onMounted(() => {
            const gl = createGl(canvasRef.value)

            let bg_program: WebGLProgram
            let fg_program: WebGLProgram

            let transforms: { src: Transform; dst: Transform }[]

            let pos_arr: number[], uv_arr: number[], idx_arr: number[]

            let fg_vao: WebGLVertexArrayObject
            let bg_vao: WebGLVertexArrayObject

            let fg_texture: WebGLTexture
            let bg_texture: WebGLTexture

            run.value = (t: number) => {
                switch (mode.value) {
                    case "morphing": {
                        let w = srcImg.width * (1 - t) + dstImg.width * t
                        let h = srcImg.height * (1 - t) + dstImg.height * t
                        ;({ w, h } = calcWH(w, h))
                        width.value = w
                        height.value = h

                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            t,
                            gl,
                            bg_program,
                            bg_vao,
                            bg_texture,
                            transforms.map(({ dst }) => dst.withTime(1 - t)),
                            idx_arr.length
                        )
                        render(
                            t,
                            gl,
                            fg_program,
                            fg_vao,
                            fg_texture,
                            transforms.map(({ src }) => src.withTime(t)),
                            idx_arr.length
                        )
                        break
                    }
                    case "src": {
                        let w = srcImg.width
                        let h = srcImg.height
                        ;({ w, h } = calcWH(w, h))
                        width.value = w
                        height.value = h

                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            t,
                            gl,
                            bg_program,
                            fg_vao,
                            fg_texture,
                            transforms.map(({ src }) => src.withTime(t)),
                            idx_arr.length
                        )
                        render(
                            t,
                            gl,
                            fg_program,
                            fg_vao,
                            fg_texture,
                            transforms.map(({ src }) => src.withTime(t)),
                            idx_arr.length
                        )
                        break
                    }
                    case "dst": {
                        let w = srcImg.width
                        let h = srcImg.height
                        ;({ w, h } = calcWH(w, h))
                        width.value = w
                        height.value = h

                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            t,
                            gl,
                            bg_program,
                            bg_vao,
                            bg_texture,
                            transforms.map(({ dst }) => dst.withTime(1 - t)),
                            idx_arr.length
                        )
                        render(
                            t,
                            gl,
                            fg_program,
                            bg_vao,
                            bg_texture,
                            transforms.map(({ dst }) => dst.withTime(1 - t)),
                            idx_arr.length
                        )
                        break
                    }
                }
            }

            const channel = new BroadcastChannel("channel")
            interface Msg {
                msgType: "opened" | "lines" | "srcImgLink" | "dstImgLink"
                lines?: { src: Line; dst: Line }[]
                link?: string
            }
            channel.onmessage = (event: MessageEvent<Msg>) => {
                const msg = event.data
                switch (msg.msgType) {
                    case "lines": {
                        const lines = msg.lines
                        ;({ pos_arr, uv_arr, idx_arr } = genBufferData(25, 25))

                        let srcWeights = new Array(Math.ceil(lines.length / 4))
                            .fill(0)
                            .map(() => []) //lines.map(() => [])
                        for (let i = 0; i < pos_arr.length; i += 2) {
                            let ws = new Array(Math.ceil(lines.length / 4) * 4).fill(0)
                            lines.forEach((line, lineIdx) => {
                                ws[lineIdx] = calcWeight(
                                    { x: pos_arr[i], y: pos_arr[i + 1] },
                                    line.src,
                                    0.001,
                                    2,
                                    0.5
                                )
                            })
                            let w_acc = ws.reduce((acc, w) => acc + w, 0)
                            ws.forEach((w, lineIdx) =>
                                srcWeights[Math.floor(lineIdx / 4)].push(w / w_acc)
                            )
                        }
                        gl.deleteVertexArray(fg_vao)
                        fg_vao = genVAO(gl, pos_arr, uv_arr, idx_arr, srcWeights)

                        let dstWeights = new Array(Math.ceil(lines.length / 4))
                            .fill(0)
                            .map(() => []) //lines.map(() => [])
                        for (let i = 0; i < pos_arr.length; i += 2) {
                            let ws = new Array(Math.ceil(lines.length / 4) * 4).fill(0)
                            lines.forEach((line, lineIdx) => {
                                ws[lineIdx] = calcWeight(
                                    { x: pos_arr[i], y: pos_arr[i + 1] },
                                    line.dst,
                                    0.001,
                                    2,
                                    0.5
                                )
                            })
                            let w_acc = ws.reduce((acc, w) => acc + w, 0)
                            ws.forEach((w, lineIdx) =>
                                dstWeights[Math.floor(lineIdx / 4)].push(w / w_acc)
                            )
                        }
                        gl.deleteVertexArray(bg_vao)
                        bg_vao = genVAO(gl, pos_arr, uv_arr, idx_arr, dstWeights)

                        bg_program = genShaderProgram(gl, lines.length, true)
                        fg_program = genShaderProgram(gl, lines.length, false)

                        transforms = lines.map(({ src, dst }) => {
                            let line1 = PoseLine.create(
                                glm.vec2.fromValues(src.from.x, src.from.y),
                                glm.vec2.fromValues(src.to.x, src.to.y)
                            )
                            let line2 = PoseLine.create(
                                glm.vec2.fromValues(dst.from.x, dst.from.y),
                                glm.vec2.fromValues(dst.to.x, dst.to.y)
                            )
                            return {
                                src: new Transform(line1, line2),
                                dst: new Transform(line2, line1),
                            }
                        })
                    }
                    case "srcImgLink": {
                        srcImg.src = msg.link

                        srcImg.onload = () => {
                            gl.deleteTexture(fg_texture)
                            fg_texture = gl.createTexture()
                            gl.bindTexture(gl.TEXTURE_2D, fg_texture)

                            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, srcImg.width, srcImg.height)
                            gl.texSubImage2D(
                                gl.TEXTURE_2D,
                                0,
                                0,
                                0,
                                gl.RGB,
                                gl.UNSIGNED_BYTE,
                                srcImg
                            )
                            gl.generateMipmap(gl.TEXTURE_2D)
                        }
                        break
                    }
                    case "dstImgLink": {
                        dstImg.src = msg.link

                        dstImg.onload = () => {
                            gl.deleteTexture(bg_texture)
                            bg_texture = gl.createTexture()
                            gl.bindTexture(gl.TEXTURE_2D, bg_texture)

                            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, dstImg.width, dstImg.height)
                            gl.texSubImage2D(
                                gl.TEXTURE_2D,
                                0,
                                0,
                                0,
                                gl.RGB,
                                gl.UNSIGNED_BYTE,
                                dstImg
                            )
                            gl.generateMipmap(gl.TEXTURE_2D)
                            run.value(0)
                        }

                        break
                    }
                }
            }
            channel.postMessage(<Msg>{ msgType: "opened" })
        })

        return {
            run,
            time,
            mode,
            canvasRef,
            width,
            height,
        }
    },
})

const createGl = (canvas: HTMLCanvasElement) => {
    let gl = canvas.getContext("webgl2", {
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
    gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA)

    return gl
}

const calcWH = (w: number, h: number) => {
    if (w > h) {
        return {
            w: 500,
            h: (500 * h) / w,
        }
    } else {
        return {
            w: (500 * w) / h,
            h: 500,
        }
    }
}
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
