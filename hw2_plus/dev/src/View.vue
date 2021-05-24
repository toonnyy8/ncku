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
                v-bind:max="imgsNum - 1"
                step="0.001"
                v-model="time"
                v-bind:style="`width:${(imgsNum - 1) * 100}px;`"
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

        let imgsNum = ref(2)
        let imgs = <HTMLImageElement[]>[]
        let srcImg: HTMLImageElement = new Image()
        let dstImg: HTMLImageElement = new Image()
        let width = ref(500),
            height = ref(500)

        onMounted(() => {
            const gl = createGl(canvasRef.value)

            let bg_program: WebGLProgram
            let fg_program: WebGLProgram

            let transforms: { src: Transform; dst: Transform }[][]

            let { pos_arr, uv_arr, idx_arr } = genBufferData(25, 25)

            let fg_vao: WebGLVertexArrayObject
            let bg_vao: WebGLVertexArrayObject
            let vaos: WebGLVertexArrayObject[] = []

            let fg_texture: WebGLTexture
            let bg_texture: WebGLTexture
            let textures: WebGLTexture[] = []

            run.value = (t: number) => {
                let time = t == transforms.length ? 1 : t - Math.floor(t)
                let idx = t == transforms.length ? t - 1 : Math.floor(t)
                let w = imgs[idx].width * (1 - time) + (imgs[idx + 1]?.width ?? 0) * time
                let h = imgs[idx].height * (1 - time) + (imgs[idx + 1]?.height ?? 0) * time
                ;({ w, h } = calcWH(w, h))
                width.value = w
                height.value = h
                switch (mode.value) {
                    case "morphing": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            time,
                            gl,
                            bg_program,
                            vaos[idx + 1],
                            textures[idx + 1],
                            transforms[idx].map(({ dst }) => dst.withTime(1 - time)),
                            idx_arr.length
                        )
                        render(
                            time,
                            gl,
                            fg_program,
                            vaos[idx],
                            textures[idx],
                            transforms[idx].map(({ src }) => src.withTime(time)),
                            idx_arr.length
                        )
                        break
                    }
                    case "src": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            time,
                            gl,
                            bg_program,
                            vaos[idx],
                            textures[idx],
                            transforms[idx].map(({ src }) => src.withTime(time)),
                            idx_arr.length
                        )
                        render(
                            time,
                            gl,
                            fg_program,
                            vaos[idx],
                            textures[idx],
                            transforms[idx].map(({ src }) => src.withTime(time)),
                            idx_arr.length
                        )
                        break
                    }
                    case "dst": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            time,
                            gl,
                            bg_program,
                            vaos[idx + 1],
                            textures[idx + 1],
                            transforms[idx].map(({ dst }) => dst.withTime(1 - time)),
                            idx_arr.length
                        )
                        render(
                            time,
                            gl,
                            fg_program,
                            vaos[idx + 1],
                            textures[idx + 1],
                            transforms[idx].map(({ dst }) => dst.withTime(1 - time)),
                            idx_arr.length
                        )
                        break
                    }
                }
            }

            const channel = new BroadcastChannel("channel")
            interface Msg {
                msgType: "opened" | "image morphing"
                lines?: Line[][]
                links?: string[]
            }
            channel.onmessage = async (event: MessageEvent<Msg>) => {
                const msg = event.data
                switch (msg.msgType) {
                    case "image morphing": {
                        textures.forEach((texture) => gl.deleteTexture(texture))
                        textures = msg.links.map(() => gl.createTexture())
                        imgs = []
                        for (let idx = 0; idx < msg.links.length; idx++) {
                            let img = await new Promise(
                                (resolve: (value: HTMLImageElement) => void, reject) => {
                                    let img = new Image()
                                    img.onload = () => {
                                        gl.bindTexture(gl.TEXTURE_2D, textures[idx])

                                        gl.texStorage2D(
                                            gl.TEXTURE_2D,
                                            1,
                                            gl.RGB8,
                                            img.width,
                                            img.height
                                        )
                                        gl.texSubImage2D(
                                            gl.TEXTURE_2D,
                                            0,
                                            0,
                                            0,
                                            gl.RGB,
                                            gl.UNSIGNED_BYTE,
                                            img
                                        )
                                        gl.generateMipmap(gl.TEXTURE_2D)
                                        resolve(img)
                                    }
                                    img.src = msg.links[idx]
                                }
                            )
                            imgs.push(img)
                        }
                        imgsNum.value = imgs.length

                        const lines = msg.lines
                        vaos.forEach((vao) => gl.deleteVertexArray(vao))
                        vaos = imgs.map((_, imgIdx) => {
                            let weights = new Array(Math.ceil(lines.length / 4))
                                .fill(0)
                                .map(() => [])
                            for (let i = 0; i < pos_arr.length; i += 2) {
                                let ws = new Array(Math.ceil(lines.length / 4) * 4).fill(0)
                                lines.forEach((line, lineIdx) => {
                                    ws[lineIdx] = calcWeight(
                                        { x: pos_arr[i], y: pos_arr[i + 1] },
                                        line[imgIdx],
                                        0.001,
                                        2,
                                        0.5
                                    )
                                })
                                let w_acc = ws.reduce((acc, w) => acc + w, 0)
                                ws.forEach((w, lineIdx) =>
                                    weights[Math.floor(lineIdx / 4)].push(w / w_acc)
                                )
                            }
                            return genVAO(gl, pos_arr, uv_arr, idx_arr, weights)
                        })

                        bg_program = genShaderProgram(gl, lines.length, true)
                        fg_program = genShaderProgram(gl, lines.length, false)

                        transforms = []
                        for (let i = 0; i < imgs.length - 1; i++) {
                            transforms.push(
                                lines.map((_lines) => {
                                    let line1 = PoseLine.create(
                                        glm.vec2.fromValues(_lines[i].from.x, _lines[i].from.y),
                                        glm.vec2.fromValues(_lines[i].to.x, _lines[i].to.y)
                                    )
                                    let line2 = PoseLine.create(
                                        glm.vec2.fromValues(
                                            _lines[i + 1].from.x,
                                            _lines[i + 1].from.y
                                        ),
                                        glm.vec2.fromValues(_lines[i + 1].to.x, _lines[i + 1].to.y)
                                    )
                                    return {
                                        src: new Transform(line1, line2),
                                        dst: new Transform(line2, line1),
                                    }
                                })
                            )
                        }

                        run.value(time.value)
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
            imgsNum,
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
