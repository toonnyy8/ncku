<template>
    <div class="flex justify-sdstt">
        <div class="text-gray-800">
            <canvas
                class="max-w-7xl"
                ref="canvasRef"
                width="600"
                height="600"
                v-on:mousedown="mousedown"
                v-on:mousemove="mousemove"
                v-on:mouseup="mouseup"
                v-on:mouseover="mouseup"
            ></canvas>
            <button
                v-bind:class="{
                    'bg-green-300': imgs[0] != undefined && mode != 0,
                    'bg-blue-300': imgs[0] == undefined && mode != 0,
                    'bg-yellow-300': mode == 0,
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = 0), renderCanvas()"
            >
                A
            </button>
            <button
                v-bind:class="{
                    'bg-green-300': imgs[1] != undefined && mode != 1,
                    'bg-blue-300': imgs[1] == undefined && mode != 1,
                    'bg-yellow-300': mode == 1,
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = 1), renderCanvas()"
            >
                B
            </button>
            <button
                v-bind:class="{
                    'bg-green-300': imgs[2] != undefined && mode != 2,
                    'bg-blue-300': imgs[2] == undefined && mode != 2,
                    'bg-yellow-300': mode == 2,
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = 2), renderCanvas()"
            >
                C
            </button>
            <button class="bg-pink-500 text-white py-1 px-5 rounded-b-lg" v-on:click="loadImg()">
                load img
            </button>

            <button
                class="bg-red-600 text-white py-1 px-5 rounded-b-lg"
                v-show="
                    lines.length != 0 &&
                    lines.reduce(
                        (prev, line) => prev && line[1] != undefined && line[2] != undefined,
                        true
                    ) &&
                    imgs[0] != undefined &&
                    imgs[1] != undefined &&
                    imgs[2] != undefined
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
                            'bg-blue-300':
                                (value[1] == undefined || value[2] == undefined) &&
                                name != lookLineIdx,
                            'bg-green-300':
                                value[1] != undefined &&
                                value[2] != undefined &&
                                name != lookLineIdx,
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
        const canvasRef: Ref<HTMLCanvasElement> = ref()

        const mousedown = ref((e: MouseEvent) => {})
        const mousemove = ref((e: MouseEvent) => {})
        const mouseup = ref((e: MouseEvent) => {})

        const dstCanvasRef: Ref<HTMLCanvasElement> = ref()

        const dstMousedown = ref((e: MouseEvent) => {})
        const dstMousemove = ref((e: MouseEvent) => {})
        const dstMouseup = ref((e: MouseEvent) => {})

        const lines: Ref<[Line, Line, Line][]> = ref([])

        const lookLineIdx = ref(-1)

        const mode = ref(0)

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

        onMounted(() => {
            const canvas = canvasRef.value
            let ctx = canvas.getContext("2d")

            let down = false
            let move = false
            let tempLine: Line = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }

            mousedown.value = (e) => {
                if (mode.value == 0 || lookLineIdx.value != -1) {
                    down = true
                    tempLine = {
                        from: {
                            x: (e.pageX - canvas.offsetLeft) / (imgSize / 2) - 1,
                            y: -((e.pageY - canvas.offsetTop) / (imgSize / 2) - 1),
                        },
                        to: {
                            x: (e.pageX - canvas.offsetLeft) / (imgSize / 2) - 1,
                            y: -((e.pageY - canvas.offsetTop) / (imgSize / 2) - 1),
                        },
                    }
                    drawLine(ctx, tempLine, color.primary)
                }
            }
            mousemove.value = (e: MouseEvent) => {
                if (mode.value == 0) {
                    if (down) {
                        tempLine.to = {
                            x: (e.pageX - canvas.offsetLeft) / (imgSize / 2) - 1,
                            y: -((e.pageY - canvas.offsetTop) / (imgSize / 2) - 1),
                        }
                        if (!move) {
                            move = true
                            lines.value.push([Object.assign({}, tempLine), undefined, undefined])
                            lookLineIdx.value = lines.value.length - 1
                        } else {
                            lines.value[lookLineIdx.value] = [
                                Object.assign({}, tempLine),
                                undefined,
                                undefined,
                            ]
                        }
                        renderCanvas.value()
                    }
                } else {
                    if (down) {
                        tempLine.to = {
                            x: (e.pageX - canvas.offsetLeft) / (imgSize / 2) - 1,
                            y: -((e.pageY - canvas.offsetTop) / (imgSize / 2) - 1),
                        }
                        lines.value[lookLineIdx.value][mode.value] = Object.assign({}, tempLine)
                        renderCanvas.value()
                    }
                }
            }
            mouseup.value = (e) => {
                if (mode.value == 0) {
                    if (down && move) {
                        if (
                            lines.value[lookLineIdx.value][0].from.x ==
                                lines.value[lookLineIdx.value][0].to.x &&
                            lines.value[lookLineIdx.value][0].from.y ==
                                lines.value[lookLineIdx.value][0].to.y
                        ) {
                            lines.value.pop()
                        }
                    }
                    down = false
                    move = false
                    renderCanvas.value()
                } else {
                    if (down) {
                        down = false
                        if (
                            lines.value[lookLineIdx.value][mode.value].from.x ==
                                lines.value[lookLineIdx.value][mode.value].to.x &&
                            lines.value[lookLineIdx.value][mode.value].from.y ==
                                lines.value[lookLineIdx.value][mode.value].to.y
                        ) {
                            lines.value[lookLineIdx.value][mode.value] = undefined
                        }
                        if (lines.value.length - 1 > lookLineIdx.value) {
                            lookLineIdx.value += 1
                        }
                        renderCanvas.value()
                    }
                }
            }

            dstMousedown.value = (e) => {}
            dstMousemove.value = (e: MouseEvent) => {}
            dstMouseup.value = (e: MouseEvent) => {}

            renderCanvas.value = () => {
                ctx.clearRect(0, 0, 800, imgSize)
                const img = imgs.value[mode.value]
                if (img != undefined) ctx.drawImage(img, 0, 0, imgSize, imgSize)
                lines.value.forEach((line, i) => {
                    if (line[mode.value]) {
                        if (i != lookLineIdx.value && line[1] && line[2]) {
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
            msgType: "opened" | "image morphing"
            lines?: [Line, Line, Line][]
            links?: string[]
        }
        channel.onmessage = (event: MessageEvent<Msg>) => {
            const msg = event.data
            switch (msg.msgType) {
                case "opened": {
                    channel.postMessage(<Msg>{
                        msgType: "image morphing",
                        lines: JSON.parse(JSON.stringify(lines.value)),
                        links: imgs.value.map((img) => img.src),
                    })
                    break
                }
            }
        }
        const openView = () => {
            window.open("./index.html", "image morphing view")
        }

        let imgs = <Ref<[HTMLImageElement, HTMLImageElement, HTMLImageElement]>>(
            ref([undefined, undefined, undefined])
        )
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
                        imgs.value[mode.value] = img
                        renderCanvas.value()
                    }
                    img.src = <string>reader.result
                })
                reader.readAsDataURL(files[0])
            }
            inp.click()
        }

        return {
            canvasRef,
            mousedown,
            mousemove,
            mouseup,

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

            imgs,
        }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
