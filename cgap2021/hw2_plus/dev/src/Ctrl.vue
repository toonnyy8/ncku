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
                v-for="(value, name) in imgs"
                :key="name"
                v-bind:class="{
                    'bg-green-300': mode != name,
                    'bg-yellow-300': mode == name,
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = name), renderCanvas()"
            >
                {{ name }}
            </button>
            <button
                v-bind:class="{
                    'bg-blue-300': mode != 'more',
                    'bg-yellow-300': mode == 'more',
                }"
                class="py-1 px-5 rounded-b-lg"
                v-on:click=";(mode = 'more'), renderCanvas()"
            >
                more
            </button>
            <button class="bg-pink-500 text-white py-1 px-5 rounded-b-lg" v-on:click="loadImg()">
                load img
            </button>

            <button
                class="bg-red-600 text-white py-1 px-5 rounded-b-lg"
                v-show="
                    lines.length != 0 &&
                    linesIsOk.reduce((prev, isOk) => prev && isOk, true) &&
                    imgs.length > 1
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
                            'bg-blue-300': !linesIsOk[name] && name != lookLineIdx,
                            'bg-green-300': linesIsOk[name] && name != lookLineIdx,
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
        const imgs: Ref<HTMLImageElement[]> = ref([])

        const canvasRef: Ref<HTMLCanvasElement> = ref()

        const mousedown = ref((e: MouseEvent) => {})
        const mousemove = ref((e: MouseEvent) => {})
        const mouseup = ref((e: MouseEvent) => {})

        const lines: Ref<Line[][]> = ref([])
        const linesIsOk: Ref<boolean[]> = ref([])

        const lookLineIdx = ref(-1)

        const mode = ref("more")

        const removeLine = ref((idx: number) => {
            lines.value = lines.value.reduce((lineArr, currLine, currIdx) => {
                if (currIdx != idx) {
                    lineArr.push(currLine)
                }
                return lineArr
            }, <Line[][]>[])
            linesIsOk.value = linesIsOk.value.reduce((isOkArr, isOk, currIdx) => {
                if (currIdx != idx) {
                    isOkArr.push(isOk)
                }
                return isOkArr
            }, <boolean[]>[])

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
            const ctx = canvas.getContext("2d")

            let down = false
            let move = false
            let tempLine: Line = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }

            mousedown.value = (e) => {
                if (mode.value != `more` && (lookLineIdx.value != -1 || mode.value == `0`)) {
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
                if (down) {
                    tempLine.to = {
                        x: (e.pageX - canvas.offsetLeft) / (imgSize / 2) - 1,
                        y: -((e.pageY - canvas.offsetTop) / (imgSize / 2) - 1),
                    }
                    if (mode.value == `0`) {
                        if (!move) {
                            move = true
                            lookLineIdx.value = lines.value.length
                            lines.value.push(new Array(imgs.value.length).fill(undefined))
                            lines.value[lookLineIdx.value][0] = Object.assign({}, tempLine)
                            linesIsOk.value[lookLineIdx.value] =
                                lines.value[lookLineIdx.value].findIndex(
                                    (line) => line == undefined
                                ) == -1
                        } else {
                            lines.value[lookLineIdx.value][0] = Object.assign({}, tempLine)
                        }
                    } else if (mode.value != `more`) {
                        lines.value[lookLineIdx.value][mode.value] = Object.assign({}, tempLine)
                        if (!move) {
                            move = true
                            linesIsOk.value[lookLineIdx.value] =
                                lines.value[lookLineIdx.value].findIndex(
                                    (line) => line == undefined
                                ) == -1
                        }
                    }
                    renderCanvas.value()
                }
            }
            mouseup.value = (e) => {
                if (down && move && mode.value != `more`) {
                    if (
                        lines.value[lookLineIdx.value][mode.value].from.x ==
                            lines.value[lookLineIdx.value][mode.value].to.x &&
                        lines.value[lookLineIdx.value][mode.value].from.y ==
                            lines.value[lookLineIdx.value][mode.value].to.y
                    ) {
                        if (mode.value == `0`) {
                            lines.value.pop()
                            linesIsOk.value.pop()
                        } else if (mode.value != `more`) {
                            lines.value[lookLineIdx.value][mode.value] = undefined
                            linesIsOk.value[lookLineIdx.value] = false
                        }
                    } else if (mode.value != `0` && lines.value.length - 1 > lookLineIdx.value) {
                        lookLineIdx.value += 1
                    }

                    down = false
                    move = false
                    renderCanvas.value()
                }
            }

            renderCanvas.value = () => {
                ctx.clearRect(0, 0, 800, imgSize)
                if (mode.value != "more") {
                    const img = imgs.value[mode.value]
                    if (img != undefined) ctx.drawImage(img, 0, 0, imgSize, imgSize)
                    lines.value.forEach((line, i) => {
                        if (line[mode.value]) {
                            if (i != lookLineIdx.value && linesIsOk.value[i]) {
                                drawLine(ctx, line[mode.value], color.success)
                            } else if (i != lookLineIdx.value) {
                                drawLine(ctx, line[mode.value], color.other)
                            } else {
                                drawLine(ctx, line[mode.value], color.primary)
                            }
                        }
                    })
                }
            }
        })

        const channel = new BroadcastChannel("channel")
        interface Msg {
            msgType: "opened" | "lines" | "imgsLink" | "srcImgLink" | "dstImgLink"
            lines?: Line[][]
            link?: string
            links?: string[]
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
                        msgType: "imgsLink",
                        links: imgs.value.map((img) => img.src),
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
                        if (mode.value == "more") {
                            imgs.value.push(img)
                            mode.value = `${imgs.value.length - 1}`
                            lines.value.forEach((_lines) => _lines.push(undefined))
                            linesIsOk.value = new Array(lines.value.length).fill(false)
                        } else {
                            imgs.value[mode.value] = img
                        }
                        renderCanvas.value()
                    }
                    img.src = <string>reader.result
                })
                reader.readAsDataURL(files[0])
            }
            inp.click()
        }

        return {
            imgs,
            canvasRef,

            mousedown,
            mousemove,
            mouseup,

            lines,
            linesIsOk,
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
