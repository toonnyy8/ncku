<template>
    <div class="flex justify-start">
        <div class="text-gray-800">
            <canvas ref="imgMorphCanvasRef" width="600" height="600"></canvas>
            <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                v-model="time"
                v-on:input="run(time)"
            />
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
        const imgMorphCanvasRef: Ref<HTMLCanvasElement> = ref()

        const srcLink = ref("")
        let srcImg: HTMLImageElement = new Image()
        let tarImg: HTMLImageElement = new Image()

        onMounted(() => {
            const imgMorphCanvas = imgMorphCanvasRef.value
            const gl = imgMorphCanvas.getContext("webgl2", {
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

            let bgProgram: WebGLProgram
            let fgProgram: WebGLProgram

            let srcTransformMat3s: glm.mat3[]
            let tarTransformMat3s: glm.mat3[]
            let pos_arr: number[], uv_arr: number[], idx_arr: number[]

            let fg_vao: WebGLVertexArrayObject
            let bg_vao: WebGLVertexArrayObject

            let fg_texture: WebGLTexture
            let bg_texture: WebGLTexture

            run.value = (t: number) => {
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                render(t, gl, bgProgram, bg_vao, bg_texture, tarTransformMat3s, idx_arr.length)
                render(1 - t, gl, fgProgram, fg_vao, fg_texture, srcTransformMat3s, idx_arr.length)
            }

            const channel = new BroadcastChannel("channel")
            interface Msg {
                msgType: "opened" | "lines" | "srcImgLink" | "tarImgLink"
                lines?: { src: Line; tar: Line }[]
                link?: string
            }
            channel.onmessage = (event: MessageEvent<Msg>) => {
                const msg = event.data
                switch (msg.msgType) {
                    case "lines": {
                        const lines = msg.lines
                        ;({ pos_arr, uv_arr, idx_arr } = genBufferData(40, 40))

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
                                    1,
                                    0
                                )
                            })
                            let w_acc = ws.reduce((acc, w) => acc + w, 0)
                            ws.forEach((w, lineIdx) =>
                                srcWeights[Math.floor(lineIdx / 4)].push(w / w_acc)
                            )
                        }
                        gl.deleteVertexArray(fg_vao)
                        fg_vao = genVAO(gl, pos_arr, uv_arr, idx_arr, srcWeights)

                        let tarWeights = new Array(Math.ceil(lines.length / 4))
                            .fill(0)
                            .map(() => []) //lines.map(() => [])
                        for (let i = 0; i < pos_arr.length; i += 2) {
                            let ws = new Array(Math.ceil(lines.length / 4) * 4).fill(0)
                            lines.forEach((line, lineIdx) => {
                                ws[lineIdx] = calcWeight(
                                    { x: pos_arr[i], y: pos_arr[i + 1] },
                                    line.tar,
                                    0.001,
                                    1,
                                    0
                                )
                            })
                            let w_acc = ws.reduce((acc, w) => acc + w, 0)
                            ws.forEach((w, lineIdx) =>
                                tarWeights[Math.floor(lineIdx / 4)].push(w / w_acc)
                            )
                        }
                        gl.deleteVertexArray(bg_vao)
                        bg_vao = genVAO(gl, pos_arr, uv_arr, idx_arr, tarWeights)

                        bgProgram = genShaderProgram(gl, lines.length, true)
                        fgProgram = genShaderProgram(gl, lines.length, false)

                        srcTransformMat3s = []
                        tarTransformMat3s = []
                        lines.forEach(({ src, tar }) => {
                            let line1 = PoseLine.create(
                                glm.vec2.fromValues(src.from.x, src.from.y),
                                glm.vec2.fromValues(src.to.x, src.to.y)
                            )
                            let line2 = PoseLine.create(
                                glm.vec2.fromValues(tar.from.x, tar.from.y),
                                glm.vec2.fromValues(tar.to.x, tar.to.y)
                            )
                            srcTransformMat3s.push(line1.transformMat3(line2))
                            tarTransformMat3s.push(line2.transformMat3(line1))
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
                    case "tarImgLink": {
                        tarImg.src = msg.link

                        tarImg.onload = () => {
                            gl.deleteTexture(bg_texture)
                            bg_texture = gl.createTexture()
                            gl.bindTexture(gl.TEXTURE_2D, bg_texture)

                            gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGB8, tarImg.width, tarImg.height)
                            gl.texSubImage2D(
                                gl.TEXTURE_2D,
                                0,
                                0,
                                0,
                                gl.RGB,
                                gl.UNSIGNED_BYTE,
                                tarImg
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
            imgMorphCanvasRef,
            srcLink,
            time,
        }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
