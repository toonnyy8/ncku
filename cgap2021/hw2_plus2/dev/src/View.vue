<template>
    <div>
        <canvas
            ref="ctrlRef"
            width="220"
            height="200"
            v-on:mousedown="mousedown"
            v-on:mousemove="mousemove"
            v-on:mouseup="mouseup"
            v-on:mouseover="mouseup"
        ></canvas>
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
                'bg-blue-300': mode != 'A',
                'bg-yellow-300': mode == 'A',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'A'), run(time)"
        >
            A
        </button>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'B',
                'bg-yellow-300': mode == 'B',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'B'), run(time)"
        >
            B
        </button>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'C',
                'bg-yellow-300': mode == 'C',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'C'), run(time)"
        >
            C
        </button>
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
        const run = ref(() => {})
        const time = ref(0)
        const mode = ref("morphing")

        const canvasRef: Ref<HTMLCanvasElement> = ref()

        let srcImg: HTMLImageElement = new Image()
        let dstImg: HTMLImageElement = new Image()
        let imgs = <[HTMLImageElement, HTMLImageElement, HTMLImageElement]>[
            undefined,
            undefined,
            undefined,
        ]
        let width = ref(500),
            height = ref(500)
        let areaWeight = [1, 0, 0]

        const ctrlRef: Ref<HTMLCanvasElement> = ref()
        const mousedown = ref((e: MouseEvent) => {})
        const mousemove = ref((e: MouseEvent) => {})
        const mouseup = ref((e: MouseEvent) => {})

        onMounted(() => {
            const ctx = ctrlRef.value.getContext("2d")
            const ctrlRender = (ctrl: { x: number; y: number }) => {
                ctx.clearRect(0, 0, 220, 200)

                ctx.fillStyle = `#000000`
                ctx.strokeStyle = `#000000`
                ctx.beginPath()
                ctx.moveTo(0, 173)
                ctx.lineTo(200, 173)
                ctx.lineTo(100, 0)
                ctx.fill()
                ctx.closePath()

                ctx.strokeStyle = `#ff5522`
                ctx.fillStyle = `#ff5522`
                ctx.beginPath()
                ctx.arc(ctrl.x, ctrl.y, 7, 0, Math.PI * 2, true)
                ctx.fill()
                ctx.closePath()
            }
            ctrlRender({ x: 0, y: 173 })
            let down = false
            const AREA = (200 * 173) / 2
            const points = [
                { x: 0, y: 173 },
                { x: 200, y: 173 },
                { x: 100, y: 0 },
            ]
            const calcAreaWeight = (ctrl: { x: number; y: number }) => {
                let l0 = ((points[0].x - ctrl.x) ** 2 + (points[0].y - ctrl.y) ** 2) ** 0.5
                let l1 = ((points[1].x - ctrl.x) ** 2 + (points[1].y - ctrl.y) ** 2) ** 0.5
                let l2 = ((points[2].x - ctrl.x) ** 2 + (points[2].y - ctrl.y) ** 2) ** 0.5
                let a0 = calcArea(200, l1, l2)
                a0 = a0 <= AREA ? a0 : AREA
                let a1 = calcArea(200, l0, l2)
                a1 = a1 <= AREA ? a1 : AREA
                let a2 = calcArea(200, l0, l1)
                a2 = a2 <= AREA ? a2 : AREA
                return [a0 / AREA, a1 / AREA, a2 / AREA]
            }

            const calcArea = (a: number, b: number, c: number) => {
                let s = (a + b + c) / 2
                let temp = s * (s - a) * (s - b) * (s - c)
                return temp >= 0 ? temp ** 0.5 : 0
            }
            mousedown.value = (e: MouseEvent) => {
                down = true
                let x = e.pageX - ctrlRef.value.offsetLeft
                let y = e.pageY - ctrlRef.value.offsetTop
                if (x > 200) x = 200
                if (-1.73 * x + 173 > y) {
                    y = -1.73 * x + 173
                } else if (1.73 * x - 173 > y) {
                    y = 1.73 * x - 173
                } else if (y > 173) {
                    y = 173
                }
                const ctrl = { x, y }
                areaWeight = calcAreaWeight(ctrl)
                ctrlRender(ctrl)
                run.value()
            }
            mousemove.value = (e: MouseEvent) => {
                if (down) {
                    let x = e.pageX - ctrlRef.value.offsetLeft
                    let y = e.pageY - ctrlRef.value.offsetTop
                    if (x > 200) x = 200
                    if (-1.73 * x + 173 > y) {
                        y = -1.73 * x + 173
                    } else if (1.73 * x - 173 > y) {
                        y = 1.73 * x - 173
                    } else if (y > 173) {
                        y = 173
                    }
                    const ctrl = { x, y }
                    areaWeight = calcAreaWeight(ctrl)
                    ctrlRender(ctrl)
                    run.value()
                }
            }
            mouseup.value = (e: MouseEvent) => {
                down = false
            }

            const gl = createGl(canvasRef.value)

            let bg_program: WebGLProgram
            let fg_program: WebGLProgram

            let transforms: {
                "0to1": { src: Transform; dst: Transform }[]
                "1to2": { src: Transform; dst: Transform }[]
                "2to0": { src: Transform; dst: Transform }[]
            } = { "0to1": undefined, "1to2": undefined, "2to0": undefined }

            let { pos_arr, uv_arr, idx_arr } = genBufferData(25, 25)

            let fg_vao: WebGLVertexArrayObject
            let bg_vao: WebGLVertexArrayObject
            let vaos: [WebGLVertexArrayObject, WebGLVertexArrayObject, WebGLVertexArrayObject] = [
                undefined,
                undefined,
                undefined,
            ]

            let fg_texture: WebGLTexture
            let bg_texture: WebGLTexture
            let textures: [WebGLTexture, WebGLTexture, WebGLTexture] = [
                undefined,
                undefined,
                undefined,
            ]

            run.value = () => {
                let w = imgs.reduce((prev, img, idx) => prev + img.width * areaWeight[idx], 0)
                let h = imgs.reduce((prev, img, idx) => prev + img.height * areaWeight[idx], 0)
                ;({ w, h } = calcWH(w, h))
                width.value = w
                height.value = h
                switch (mode.value) {
                    case "morphing": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            areaWeight[0],
                            gl,
                            bg_program,
                            vaos[0],
                            textures[0],
                            transforms["0to1"].map(({ src }, idx) =>
                                glm.mat3.add(
                                    glm.mat3.create(),
                                    glm.mat3.add(
                                        glm.mat3.create(),
                                        <glm.mat3>src.withTime(1).map((val) => val * areaWeight[1]),
                                        <glm.mat3>(
                                            transforms["2to0"][idx].dst
                                                .withTime(1)
                                                .map((val) => val * areaWeight[2])
                                        )
                                    ),
                                    <glm.mat3>(
                                        transforms["0to1"][idx].src
                                            .withTime(0)
                                            .map((val) => val * areaWeight[0])
                                    )
                                )
                            ),
                            idx_arr.length
                        )

                        render(
                            areaWeight[1],
                            gl,
                            bg_program,
                            vaos[1],
                            textures[1],
                            transforms["1to2"].map(({ src }, idx) =>
                                glm.mat3.add(
                                    glm.mat3.create(),
                                    glm.mat3.add(
                                        glm.mat3.create(),
                                        <glm.mat3>src.withTime(1).map((val) => val * areaWeight[2]),
                                        <glm.mat3>(
                                            transforms["0to1"][idx].dst
                                                .withTime(1)
                                                .map((val) => val * areaWeight[0])
                                        )
                                    ),
                                    <glm.mat3>(
                                        transforms["1to2"][idx].src
                                            .withTime(0)
                                            .map((val) => val * areaWeight[1])
                                    )
                                )
                            ),
                            idx_arr.length
                        )

                        render(
                            areaWeight[2],
                            gl,
                            bg_program,
                            vaos[2],
                            textures[2],
                            transforms["2to0"].map(({ src }, idx) =>
                                glm.mat3.add(
                                    glm.mat3.create(),
                                    glm.mat3.add(
                                        glm.mat3.create(),
                                        <glm.mat3>src.withTime(1).map((val) => val * areaWeight[0]),
                                        <glm.mat3>(
                                            transforms["1to2"][idx].dst
                                                .withTime(1)
                                                .map((val) => val * areaWeight[1])
                                        )
                                    ),
                                    <glm.mat3>(
                                        transforms["2to0"][idx].src
                                            .withTime(0)
                                            .map((val) => val * areaWeight[2])
                                    )
                                )
                            ),
                            idx_arr.length
                        )
                        break
                    }

                    case "A": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            1,
                            gl,
                            bg_program,
                            vaos[0],
                            textures[0],
                            transforms["0to1"].map(({ src }, idx) =>
                                glm.mat3.add(
                                    glm.mat3.create(),
                                    glm.mat3.add(
                                        glm.mat3.create(),
                                        <glm.mat3>src.withTime(1).map((val) => val * areaWeight[1]),
                                        <glm.mat3>(
                                            transforms["2to0"][idx].dst
                                                .withTime(1)
                                                .map((val) => val * areaWeight[2])
                                        )
                                    ),
                                    <glm.mat3>(
                                        transforms["0to1"][idx].src
                                            .withTime(0)
                                            .map((val) => val * areaWeight[0])
                                    )
                                )
                            ),
                            idx_arr.length
                        )
                        break
                    }
                    case "B": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            1,
                            gl,
                            bg_program,
                            vaos[1],
                            textures[1],
                            transforms["1to2"].map(({ src }, idx) =>
                                glm.mat3.add(
                                    glm.mat3.create(),
                                    glm.mat3.add(
                                        glm.mat3.create(),
                                        <glm.mat3>src.withTime(1).map((val) => val * areaWeight[2]),
                                        <glm.mat3>(
                                            transforms["0to1"][idx].dst
                                                .withTime(1)
                                                .map((val) => val * areaWeight[0])
                                        )
                                    ),
                                    <glm.mat3>(
                                        transforms["1to2"][idx].src
                                            .withTime(0)
                                            .map((val) => val * areaWeight[1])
                                    )
                                )
                            ),
                            idx_arr.length
                        )
                        break
                    }
                    case "C": {
                        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
                        render(
                            1,
                            gl,
                            bg_program,
                            vaos[2],
                            textures[2],
                            transforms["2to0"].map(({ src }, idx) =>
                                glm.mat3.add(
                                    glm.mat3.create(),
                                    glm.mat3.add(
                                        glm.mat3.create(),
                                        <glm.mat3>src.withTime(1).map((val) => val * areaWeight[0]),
                                        <glm.mat3>(
                                            transforms["1to2"][idx].dst
                                                .withTime(1)
                                                .map((val) => val * areaWeight[1])
                                        )
                                    ),
                                    <glm.mat3>(
                                        transforms["2to0"][idx].src
                                            .withTime(0)
                                            .map((val) => val * areaWeight[2])
                                    )
                                )
                            ),
                            idx_arr.length
                        )
                        break
                    }
                }
            }
            const channel = new BroadcastChannel("channel")
            interface Msg {
                msgType: "opened" | "image morphing"
                lines?: [Line, Line, Line][]
                links?: [string, string, string]
            }
            channel.onmessage = async (event: MessageEvent<Msg>) => {
                const msg = event.data
                switch (msg.msgType) {
                    case "image morphing": {
                        textures.forEach((texture) => gl.deleteTexture(texture))
                        textures = <[WebGLTexture, WebGLTexture, WebGLTexture]>(
                            msg.links.map(() => gl.createTexture())
                        )
                        imgs = [undefined, undefined, undefined]
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
                            imgs[idx] = img
                        }

                        const lines = msg.lines
                        vaos.forEach((vao) => gl.deleteVertexArray(vao))
                        vaos = <
                            [WebGLVertexArrayObject, WebGLVertexArrayObject, WebGLVertexArrayObject]
                        >imgs.map((_, imgIdx) => {
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

                        transforms["0to1"] = lines.map((_lines) => {
                            let line1 = PoseLine.create(
                                glm.vec2.fromValues(_lines[0].from.x, _lines[0].from.y),
                                glm.vec2.fromValues(_lines[0].to.x, _lines[0].to.y)
                            )
                            let line2 = PoseLine.create(
                                glm.vec2.fromValues(_lines[1].from.x, _lines[1].from.y),
                                glm.vec2.fromValues(_lines[1].to.x, _lines[1].to.y)
                            )
                            return {
                                src: new Transform(line1, line2),
                                dst: new Transform(line2, line1),
                            }
                        })
                        transforms["1to2"] = lines.map((_lines) => {
                            let line1 = PoseLine.create(
                                glm.vec2.fromValues(_lines[1].from.x, _lines[1].from.y),
                                glm.vec2.fromValues(_lines[1].to.x, _lines[1].to.y)
                            )
                            let line2 = PoseLine.create(
                                glm.vec2.fromValues(_lines[2].from.x, _lines[2].from.y),
                                glm.vec2.fromValues(_lines[2].to.x, _lines[2].to.y)
                            )
                            return {
                                src: new Transform(line1, line2),
                                dst: new Transform(line2, line1),
                            }
                        })
                        transforms["2to0"] = lines.map((_lines) => {
                            let line1 = PoseLine.create(
                                glm.vec2.fromValues(_lines[2].from.x, _lines[2].from.y),
                                glm.vec2.fromValues(_lines[2].to.x, _lines[2].to.y)
                            )
                            let line2 = PoseLine.create(
                                glm.vec2.fromValues(_lines[0].from.x, _lines[0].from.y),
                                glm.vec2.fromValues(_lines[0].to.x, _lines[0].to.y)
                            )
                            return {
                                src: new Transform(line1, line2),
                                dst: new Transform(line2, line1),
                            }
                        })

                        run.value()
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

            ctrlRef,
            mousedown,
            mousemove,
            mouseup,
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
