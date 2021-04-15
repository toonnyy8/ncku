<template>
    <div class="flex justify-sdstt">
        <div class="text-gray-800">
            <canvas
                v-show="mode == 'src'"
                class="max-w-7xl"
                ref="srcCanvasRef"
                width="600"
                height="600"
                v-on:mousedown="srcMousedown"
                v-on:mousemove="srcMousemove"
                v-on:mouseup="srcMouseup"
                v-on:mouseover="srcMouseup"
            ></canvas>
            <canvas
                v-show="mode == 'dst'"
                class="max-w-7xl"
                ref="dstCanvasRef"
                width="600"
                height="600"
                v-on:mousedown="dstMousedown"
                v-on:mousemove="dstMousemove"
                v-on:mouseup="dstMouseup"
                v-on:mouseover="dstMouseup"
            ></canvas>
            <button
                v-bind:class="{
                    'bg-green-300': srcImg != undefined && mode != 'src',
                    'bg-blue-300': srcImg == undefined && mode != 'src',
                    'bg-yellow-300': mode == 'src',
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = 'src'), renderCanvas()"
            >
                src
            </button>
            <button
                v-bind:class="{
                    'bg-green-300': dstImg != undefined && mode != 'dst',
                    'bg-blue-300': dstImg == undefined && mode != 'dst',
                    'bg-yellow-300': mode == 'dst',
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = 'dst'), renderCanvas()"
            >
                dst
            </button>
            <button class="bg-pink-500 text-white py-1 px-5 rounded-b-lg" v-on:click="loadImg()">
                load img
            </button>

            <button
                class="bg-red-600 text-white py-1 px-5 rounded-b-lg"
                v-show="
                    lines.length != 0 &&
                    lines.reduce((prev, line) => prev && line.dst != undefined, true) &&
                    srcImg != undefined &&
                    dstImg != undefined
                "
                v-on:click="openView"
            >
                open view
            </button>
        </div>
        <div class="text-gray-800 w-36 m-2">
            <div class="h-10">
                <div v-if="lines[lookLineIdx] && lines[lookLineIdx][mode]">
                    from: ({{ Math.round(lines[lookLineIdx][mode].from.x * 100) / 100 }},
                    {{ Math.round(lines[lookLineIdx][mode].from.y * 100) / 100 }})
                    <br />
                    to: ({{ Math.round(lines[lookLineIdx][mode].to.x * 100) / 100 }},
                    {{ Math.round(lines[lookLineIdx][mode].to.y * 100) / 100 }})
                </div>
            </div>
            <ul>
                <li v-for="(value, name) in lines" :key="name" class="flex justify-sdstt my-2">
                    <div
                        v-on:click=";(lookLineIdx = name), renderCanvas()"
                        v-bind:class="{
                            'bg-blue-300': value.dst == undefined && name != lookLineIdx,
                            'bg-green-300': value.dst != undefined && name != lookLineIdx,
                            'bg-yellow-300': name == lookLineIdx,
                        }"
                        class="py-1 px-3 w-full rounded-l-lg"
                    >
                        line {{ name }}
                    </div>
                    <div
                        v-on:click="removeLine(name)"
                        class="bg-pink-600 p-1 w-10 rounded-r-lg text-center"
                    >
                        <img :src="close_icon" alt="remove" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from "vue"
// @ts-ignore
import close_icon from "url:../icon/highlight_off_black_24dp.svg"
interface Point {
    x: number
    y: number
}
interface Line {
    from: Point
    to: Point
}

const imgSize = 600

const drawLine = (ctx: CanvasRenderingContext2D, line: Line, color: string = `#ffcc33`) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo((line.from.x + 1) * (imgSize / 2), (-line.from.y + 1) * (imgSize / 2))
    ctx.lineTo((line.to.x + 1) * (imgSize / 2), (-line.to.y + 1) * (imgSize / 2))
    ctx.stroke()

    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.strokeStyle = `#ff5522`
    ctx.fillStyle = `#ff5522`
    ctx.arc(
        (line.from.x + 1) * (imgSize / 2),
        (-line.from.y + 1) * (imgSize / 2),
        5,
        0,
        Math.PI * 2,
        true
    )
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = `#22ffff`
    ctx.fillStyle = `#22ffff`
    ctx.arc(
        (line.to.x + 1) * (imgSize / 2),
        (-line.to.y + 1) * (imgSize / 2),
        5,
        0,
        Math.PI * 2,
        true
    )
    ctx.fill()
    ctx.stroke()
}
const color = {
    other: `#93c5fd`,
    success: `rgba(110, 231, 183)`,
    primary: `#ffcc33`,
}

export default defineComponent({
    setup() {
        const srcCanvasRef: Ref<HTMLCanvasElement> = ref()

        const srcMousedown = ref((e: MouseEvent) => {})
        const srcMousemove = ref((e: MouseEvent) => {})
        const srcMouseup = ref((e: MouseEvent) => {})

        const dstCanvasRef: Ref<HTMLCanvasElement> = ref()

        const dstMousedown = ref((e: MouseEvent) => {})
        const dstMousemove = ref((e: MouseEvent) => {})
        const dstMouseup = ref((e: MouseEvent) => {})

        const lines: Ref<{ src: Line; dst: Line }[]> = ref([])

        const lookLineIdx = ref(-1)

        const mode = ref("src")

        const removeLine = ref((idx: number) => {
            lines.value = lines.value.reduce((lineArr, currLine, currIdx) => {
                if (currIdx != idx) {
                    lineArr.push(currLine)
                }
                return lineArr
            }, [])

            if (lookLineIdx.value != -1) {
                if (lookLineIdx.value == idx) {
                    lookLineIdx.value = -1
                } else if (lookLineIdx.value > idx) {
                    lookLineIdx.value -= 1
                }
            }

            renderCanvas.value()
        })

        const renderCanvas = ref(() => {})

        let srcCtx: CanvasRenderingContext2D
        let dstCtx: CanvasRenderingContext2D

        onMounted(() => {
            const srcCanvas = srcCanvasRef.value
            srcCtx = srcCanvas.getContext("2d")
            const dstCanvas = dstCanvasRef.value
            dstCtx = dstCanvas.getContext("2d")

            let down = false
            let move = false
            let tempLine: Line = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }

            srcMousedown.value = (e) => {
                down = true
                tempLine = {
                    from: {
                        x: (e.pageX - srcCanvas.offsetLeft) / (imgSize / 2) - 1,
                        y: -((e.pageY - srcCanvas.offsetTop) / (imgSize / 2) - 1),
                    },
                    to: {
                        x: (e.pageX - srcCanvas.offsetLeft) / (imgSize / 2) - 1,
                        y: -((e.pageY - srcCanvas.offsetTop) / (imgSize / 2) - 1),
                    },
                }
                drawLine(srcCtx, tempLine, color.primary)
            }
            srcMousemove.value = (e: MouseEvent) => {
                if (down) {
                    tempLine.to = {
                        x: (e.pageX - srcCanvas.offsetLeft) / (imgSize / 2) - 1,
                        y: -((e.pageY - srcCanvas.offsetTop) / (imgSize / 2) - 1),
                    }
                    if (!move) {
                        move = true
                        lines.value.push({ src: Object.assign({}, tempLine), dst: undefined })
                        lookLineIdx.value = lines.value.length - 1
                    } else {
                        lines.value[lookLineIdx.value] = {
                            src: Object.assign({}, tempLine),
                            dst: undefined,
                        }
                    }
                    renderCanvas.value()
                }
            }
            srcMouseup.value = (e) => {
                if (down && move) {
                    if (
                        lines.value[lookLineIdx.value].src.from.x ==
                            lines.value[lookLineIdx.value].src.to.x &&
                        lines.value[lookLineIdx.value].src.from.y ==
                            lines.value[lookLineIdx.value].src.to.y
                    ) {
                        lines.value.pop()
                    }
                }
                down = false
                move = false
                renderCanvas.value()
            }

            dstMousedown.value = (e) => {
                if (lookLineIdx.value != -1) {
                    down = true
                    tempLine = {
                        from: {
                            x: (e.pageX - dstCanvas.offsetLeft) / (imgSize / 2) - 1,
                            y: -((e.pageY - dstCanvas.offsetTop) / (imgSize / 2) - 1),
                        },
                        to: {
                            x: (e.pageX - dstCanvas.offsetLeft) / (imgSize / 2) - 1,
                            y: -((e.pageY - dstCanvas.offsetTop) / (imgSize / 2) - 1),
                        },
                    }
                    drawLine(dstCtx, tempLine, color.primary)
                }
            }
            dstMousemove.value = (e: MouseEvent) => {
                if (down) {
                    tempLine.to = {
                        x: (e.pageX - dstCanvas.offsetLeft) / (imgSize / 2) - 1,
                        y: -((e.pageY - dstCanvas.offsetTop) / (imgSize / 2) - 1),
                    }
                    lines.value[lookLineIdx.value].dst = Object.assign({}, tempLine)
                    renderCanvas.value()
                }
            }
            dstMouseup.value = (e: MouseEvent) => {
                if (down) {
                    down = false
                    if (
                        lines.value[lookLineIdx.value].dst.from.x ==
                            lines.value[lookLineIdx.value].dst.to.x &&
                        lines.value[lookLineIdx.value].dst.from.y ==
                            lines.value[lookLineIdx.value].dst.to.y
                    ) {
                        lines.value[lookLineIdx.value].dst = undefined
                    }
                    if (lines.value.length - 1 > lookLineIdx.value) {
                        lookLineIdx.value += 1
                    }
                    renderCanvas.value()
                }
            }

            renderCanvas.value = () => {
                const ctx = mode.value == "src" ? srcCtx : dstCtx
                ctx.clearRect(0, 0, 800, imgSize)
                const img = mode.value == "src" ? srcImg.value : dstImg.value
                if (img != undefined) ctx.drawImage(img, 0, 0, imgSize, imgSize)
                lines.value.forEach((line, i) => {
                    if (line[mode.value]) {
                        if (i != lookLineIdx.value && line.dst) {
                            drawLine(ctx, line[mode.value], color.success)
                        } else if (i != lookLineIdx.value) {
                            drawLine(ctx, line[mode.value], color.other)
                        } else {
                            drawLine(ctx, line[mode.value], color.primary)
                        }
                    }
                })
            }
        })

        const channel = new BroadcastChannel("channel")
        interface Msg {
            msgType: "opened" | "lines" | "srcImgLink" | "dstImgLink"
            lines?: { src: Line; dst: Line }[]
            link?: string
        }
        channel.onmessage = (event: MessageEvent<Msg>) => {
            const msg = event.data
            switch (msg.msgType) {
                case "opened": {
                    channel.postMessage(<Msg>{
                        msgType: "lines",
                        lines: JSON.parse(JSON.stringify(lines.value)),
                    })
                    channel.postMessage(<Msg>{
                        msgType: "srcImgLink",
                        link: srcImg.value.src,
                    })
                    channel.postMessage(<Msg>{
                        msgType: "dstImgLink",
                        link: dstImg.value.src,
                    })
                    break
                }
            }
        }
        const openView = () => {
            window.open("./index.html", "image morphing view")
        }

        let srcImg: Ref<HTMLImageElement> = ref()
        let dstImg: Ref<HTMLImageElement> = ref()
        const loadImg = () => {
            const inp = document.createElement("input")
            inp.type = "file"
            inp.accept = "image/*"
            inp.onchange = () => {
                const files = inp.files
                const reader = new FileReader()
                reader.addEventListener("loadend", async () => {
                    let img = new Image()
                    img.onload = () => {
                        if (mode.value == "src") srcImg.value = img
                        else if (mode.value == "dst") dstImg.value = img
                        renderCanvas.value()
                    }
                    img.src = <string>reader.result
                })
                reader.readAsDataURL(files[0])
            }
            inp.click()
        }

        return {
            srcCanvasRef,
            srcMousedown,
            srcMousemove,
            srcMouseup,

            dstCanvasRef,
            dstMousedown,
            dstMousemove,
            dstMouseup,

            lines,
            close_icon,
            lookLineIdx,
            removeLine,
            mode,
            renderCanvas,

            openView,

            loadImg,

            srcImg,
            dstImg,
        }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
