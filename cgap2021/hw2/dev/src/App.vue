<template>
    <canvas
        class="float-left max-w-7xl"
        ref="canvasRef"
        width="800"
        height="600"
        v-on:mousedown="mousedown"
        v-on:mousemove="mousemove"
        v-on:mouseup="mouseup"
    ></canvas>
    <div class="text-red-500 float-left max-w-7xl">
        from: ({{ line.from.x }}, {{ line.from.y }})
        <br />
        to: ({{ line.to.x }}, {{ line.to.y }})
        <br />
        <ul>
            <li v-for="(value, name) in lines" :key="name">
                {{ name }}
                <div class="flex justify-start ...">
                    <div class="bg-purple-600 w-10 h-10 float-left rounded-l-lg"></div>
                    <div class="float-left">
                        from: ({{ value.from.x }}, {{ value.from.y }}) to: ({{ value.to.x }},
                        {{ value.to.y }})
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from "vue"
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
        const canvasRef: Ref<HTMLCanvasElement> = ref()
        const mousedown = ref((e: MouseEvent) => {})
        const mousemove = ref((e: MouseEvent) => {})
        const mouseup = ref((e: MouseEvent) => {})
        const line: Ref<Line> = ref({ from: { x: 0, y: 0 }, to: { x: 0, y: 0 } })
        const lines: Ref<Line[]> = ref([])

        onMounted(() => {
            const canvas = canvasRef.value
            const ctx = canvas.getContext("2d")

            let down = false
            mousedown.value = (e) => {
                down = true
                line.value = {
                    from: {
                        x: e.pageX - canvas.offsetLeft,
                        y: e.pageY - canvas.offsetTop,
                    },
                    to: {
                        x: e.pageX - canvas.offsetLeft,
                        y: e.pageY - canvas.offsetTop,
                    },
                }
                ctx.clearRect(0, 0, 800, 600)
                ;[...lines.value, line.value].forEach((line) => drawLine(ctx, line))
            }
            mousemove.value = (e: MouseEvent) => {
                if (down) {
                    line.value.to = {
                        x: e.pageX - canvas.offsetLeft,
                        y: e.pageY - canvas.offsetTop,
                    }
                    ctx.clearRect(0, 0, 800, 600)
                    ;[...lines.value, line.value].forEach((line) => drawLine(ctx, line))
                }
            }
            mouseup.value = (e) => {
                down = false
                if (line.value.from.x != line.value.to.x || line.value.from.y != line.value.to.y)
                    lines.value.push(Object.assign({}, line.value))

                ctx.clearRect(0, 0, 800, 600)
                lines.value.forEach((line) => drawLine(ctx, line))
            }
        })
        return { mousedown, mousemove, mouseup, canvasRef, line, lines }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
