<template>
    <div class="text-gray-800 float-left">
        <canvas
            v-show="mode == 'source'"
            class="max-w-7xl"
            ref="srcCanvasRef"
            width="800"
            height="600"
            v-on:mousedown="srcMousedown"
            v-on:mousemove="srcMousemove"
            v-on:mouseup="srcMouseup"
        ></canvas>
        <canvas
            v-show="mode == 'target'"
            class="max-w-7xl"
            ref="tarCanvasRef"
            width="800"
            height="600"
        ></canvas>
        <br />
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'source',
                'bg-yellow-300': mode == 'source',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click="activatedMode('source')"
        >
            Source
        </button>
        <button
            v-bind:class="{
                'bg-blue-300': mode != 'target',
                'bg-yellow-300': mode == 'target',
            }"
            class="py-1 px-5 rounded-b-lg"
            v-on:click="activatedMode('target')"
        >
            target
        </button>
    </div>
    <div class="text-gray-800">
        from: ({{ line.from.x }}, {{ line.from.y }})
        <br />
        to: ({{ line.to.x }}, {{ line.to.y }})
        <br />
        <ul>
            <li v-for="(value, name) in lines" :key="name">
                {{ name }}
                <div class="flex justify-start w-72">
                    <div
                        v-on:click="lookLine(name)"
                        v-bind:class="{
                            'bg-blue-300': name != lookLineIdx,
                            'bg-yellow-300': name == lookLineIdx,
                        }"
                        class="py-1 px-3 w-full rounded-l-lg"
                    >
                        from: ({{ value.from.x }}, {{ value.from.y }}) to: ({{ value.to.x }},
                        {{ value.to.y }})
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

export default defineComponent({
    setup() {
        const srcCanvasRef: Ref<HTMLCanvasElement> = ref()
        const srcMousedown = ref((e: MouseEvent) => {})
        const srcMousemove = ref((e: MouseEvent) => {})
        const srcMouseup = ref((e: MouseEvent) => {})
        const line: Ref<Line> = ref({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } })
        const lines: Ref<Line[]> = ref([])
        const _lines: Ref<{ src: Line; tar: Line }[]> = ref([])

        const lookLineIdx = ref(-1)
        const lookLine = ref((idx: number) => {})

        const mode = ref("source")
        const activatedMode = ref((_mode: string) => (mode.value = _mode))

        const removeLine = ref((idx: number) => {
            lines.value = lines.value.reduce((lineArr, currLine, currIdx) => {
                if (currIdx != idx) {
                    lineArr.push(currLine)
                }
                return lineArr
            }, [])
            let lookIdx = lookLineIdx.value
            lookLineIdx.value = -1
            if (lookIdx != -1) {
                if (lookIdx == idx) {
                    lookIdx = -1
                } else if (lookIdx > idx) {
                    lookIdx -= 1
                }
            }

            lookLine.value(lookIdx)
        })

        onMounted(() => {
            const srcCanvas = srcCanvasRef.value
            const srcCtx = srcCanvas.getContext("2d")

            let down = false
            srcMousedown.value = (e) => {
                down = true
                line.value = {
                    from: {
                        x: e.pageX - srcCanvas.offsetLeft,
                        y: e.pageY - srcCanvas.offsetTop,
                    },
                    to: {
                        x: e.pageX - srcCanvas.offsetLeft,
                        y: e.pageY - srcCanvas.offsetTop,
                    },
                }
                srcCtx.clearRect(0, 0, 800, 600)
                lines.value.forEach((line) => drawLine(srcCtx, line, `#93c5fd`))
                drawLine(srcCtx, line.value)
            }
            srcMousemove.value = (e: MouseEvent) => {
                if (down) {
                    line.value.to = {
                        x: e.pageX - srcCanvas.offsetLeft,
                        y: e.pageY - srcCanvas.offsetTop,
                    }
                    srcCtx.clearRect(0, 0, 800, 600)
                    lines.value.forEach((line) => drawLine(srcCtx, line, `#93c5fd`))
                    drawLine(srcCtx, line.value)
                }
            }
            srcMouseup.value = (e) => {
                down = false
                srcCtx.clearRect(0, 0, 800, 600)
                lines.value.forEach((line) => drawLine(srcCtx, line, `#93c5fd`))
                if (line.value.from.x != line.value.to.x || line.value.from.y != line.value.to.y) {
                    drawLine(srcCtx, line.value)
                    lines.value.push(Object.assign({}, line.value))
                    lookLineIdx.value = lines.value.length - 1
                }
            }

            lookLine.value = (idx: number) => {
                if (lookLineIdx.value == idx) {
                    lookLineIdx.value = -1
                } else {
                    lookLineIdx.value = idx
                }
                srcCtx.clearRect(0, 0, 800, 600)
                lines.value.forEach((line, i) => {
                    if (i != lookLineIdx.value) {
                        drawLine(srcCtx, line, `#93c5fd`)
                    } else {
                        drawLine(srcCtx, line)
                    }
                })
                console.log(idx)
            }
        })

        return {
            srcMousedown,
            srcMousemove,
            srcMouseup,
            srcCanvasRef,
            line,
            lines,
            close_icon,
            lookLine,
            lookLineIdx,
            removeLine,
            mode,
            activatedMode,
        }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
