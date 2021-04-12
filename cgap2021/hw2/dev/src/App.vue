<template>
    <div class="text-gray-800 float-left">
        <canvas
            v-show="mode == 'src'"
            class="max-w-7xl"
            ref="srcCanvasRef"
            width="800"
            height="600"
            v-on:mousedown="srcMousedown"
            v-on:mousemove="srcMousemove"
            v-on:mouseup="srcMouseup"
            v-on:mouseover="srcMouseup"
        ></canvas>
        <canvas
            v-show="mode == 'tar'"
            class="max-w-7xl"
            ref="tarCanvasRef"
            width="800"
            height="600"
            v-on:mousedown="tarMousedown"
            v-on:mousemove="tarMousemove"
            v-on:mouseup="tarMouseup"
            v-on:mouseover="tarMouseup"
        ></canvas>
        <br />
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'src',
                'bg-yellow-300': mode == 'src',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'src'), renderCanvas()"
        >
            src
        </button>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'tar',
                'bg-yellow-300': mode == 'tar',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click=";(mode = 'tar'), renderCanvas()"
        >
            tar
        </button>
    </div>
    <div class="text-gray-800">
        <div class="h-10">
            <div v-if="lines[lookLineIdx] && lines[lookLineIdx][mode]">
                from: ({{ lines[lookLineIdx][mode].from.x }}, {{ lines[lookLineIdx][mode].from.y }})
                <br />
                to: ({{ lines[lookLineIdx][mode].to.x }}, {{ lines[lookLineIdx][mode].to.y }})
            </div>
        </div>
        <br />
        <ul>
            <li v-for="(value, name) in lines" :key="name">
                <div class="flex justify-start w-36 m-2">
                    <div
                        v-on:click=";(lookLineIdx = name), renderCanvas()"
                        v-bind:class="{
                            'bg-blue-300': value.tar == undefined && name != lookLineIdx,
                            'bg-green-300': value.tar != undefined && name != lookLineIdx,
                            'bg-yellow-300': name == lookLineIdx,
                        }"
                        class="py-1 px-3 w-full rounded-l-lg"
                    >
                        line {{ name }}
                    </div>
                    <div
                        v-on:click="removeLine(name)"
                        class="bg-pink-500 p-1 w-10 rounded-r-lg text-center"
                    >
                        <img :src="close_icon" alt="remove" />
                    </div>
                </div>
            </li>
        </ul>
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

const drawLine = (ctx: CanvasRenderingContext2D, line: Line, color: string = `#ffcc33`) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(line.from.x, line.from.y)
    ctx.lineTo(line.to.x, line.to.y)
    ctx.stroke()

    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.strokeStyle = `#ff5522`
    ctx.fillStyle = `#ff5522`
    ctx.arc(line.from.x, line.from.y, 5, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = `#22ffff`
    ctx.fillStyle = `#22ffff`
    ctx.arc(line.to.x, line.to.y, 5, 0, Math.PI * 2, true)
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

        const tarCanvasRef: Ref<HTMLCanvasElement> = ref()

        const tarMousedown = ref((e: MouseEvent) => {})
        const tarMousemove = ref((e: MouseEvent) => {})
        const tarMouseup = ref((e: MouseEvent) => {})

        const lines: Ref<{ src: Line; tar: Line }[]> = ref([])

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

        onMounted(() => {
            const srcCanvas = srcCanvasRef.value
            const srcCtx = srcCanvas.getContext("2d")
            const tarCanvas = tarCanvasRef.value
            const tarCtx = tarCanvas.getContext("2d")

            let down = false
            let move = false
            let tempLine: Line = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }

            srcMousedown.value = (e) => {
                down = true
                tempLine = {
                    from: {
                        x: e.pageX - srcCanvas.offsetLeft,
                        y: e.pageY - srcCanvas.offsetTop,
                    },
                    to: {
                        x: e.pageX - srcCanvas.offsetLeft,
                        y: e.pageY - srcCanvas.offsetTop,
                    },
                }
                drawLine(srcCtx, tempLine, color.primary)
            }
            srcMousemove.value = (e: MouseEvent) => {
                if (down) {
                    tempLine.to = {
                        x: e.pageX - srcCanvas.offsetLeft,
                        y: e.pageY - srcCanvas.offsetTop,
                    }
                    if (!move) {
                        move = true
                        lines.value.push({ src: Object.assign({}, tempLine), tar: undefined })
                        lookLineIdx.value = lines.value.length - 1
                    } else {
                        lines.value[lookLineIdx.value] = {
                            src: Object.assign({}, tempLine),
                            tar: undefined,
                        }
                    }
                    renderCanvas.value()
                }
            }
            srcMouseup.value = (e) => {
                if (down) {
                    down = false
                    move = false
                    if (
                        lines.value[lookLineIdx.value].src.from.x ==
                            lines.value[lookLineIdx.value].src.to.x &&
                        lines.value[lookLineIdx.value].src.from.y ==
                            lines.value[lookLineIdx.value].src.to.y
                    ) {
                        lines.value.pop()
                    }
                    renderCanvas.value()
                }
            }

            tarMousedown.value = (e) => {
                if (lookLineIdx.value != -1) {
                    down = true
                    tempLine = {
                        from: {
                            x: e.pageX - tarCanvas.offsetLeft,
                            y: e.pageY - tarCanvas.offsetTop,
                        },
                        to: {
                            x: e.pageX - tarCanvas.offsetLeft,
                            y: e.pageY - tarCanvas.offsetTop,
                        },
                    }
                    drawLine(tarCtx, tempLine, color.primary)
                }
            }
            tarMousemove.value = (e: MouseEvent) => {
                if (down) {
                    tempLine.to = {
                        x: e.pageX - tarCanvas.offsetLeft,
                        y: e.pageY - tarCanvas.offsetTop,
                    }
                    lines.value[lookLineIdx.value].tar = Object.assign({}, tempLine)
                    renderCanvas.value()
                }
            }
            tarMouseup.value = (e: MouseEvent) => {
                if (down) {
                    down = false
                    if (
                        lines.value[lookLineIdx.value].tar.from.x ==
                            lines.value[lookLineIdx.value].tar.to.x &&
                        lines.value[lookLineIdx.value].tar.from.y ==
                            lines.value[lookLineIdx.value].tar.to.y
                    ) {
                        lines.value[lookLineIdx.value].tar = undefined
                    }
                    renderCanvas.value()
                }
            }

            renderCanvas.value = () => {
                const ctx = mode.value == "src" ? srcCtx : tarCtx
                ctx.clearRect(0, 0, 800, 600)
                lines.value.forEach((line, i) => {
                    if (line[mode.value]) {
                        if (i != lookLineIdx.value && line.tar) {
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

        return {
            srcCanvasRef,
            srcMousedown,
            srcMousemove,
            srcMouseup,

            tarCanvasRef,
            tarMousedown,
            tarMousemove,
            tarMouseup,

            lines,
            close_icon,
            lookLineIdx,
            removeLine,
            mode,
            renderCanvas,
        }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
