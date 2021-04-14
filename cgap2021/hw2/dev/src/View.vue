<template>
    <div class="flex justify-start">
        <div class="text-gray-800">
            <canvas
                v-show="mode == 'src'"
                class="max-w-7xl"
                ref="imgMorphCanvasRef"
                width="800"
                height="600"
            ></canvas>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from "vue"
// @ts-ignore
import close_icon from "url:../icon/highlight_off_black_24dp.svg"
import { calcWeight, normalizeWeights, genShader, genBufferData } from "./imgMorph"

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
        const imgMorphCanvasRef: Ref<HTMLCanvasElement> = ref()

        onMounted(() => {
            const imgMorphCanvas = imgMorphCanvasRef.value
            const gl = imgMorphCanvas.getContext("webgl2")

            const channel = new BroadcastChannel("channel")
            interface Msg {
                msgType: "opened" | "lines"
                lines?: { src: Line; tar: Line }[]
            }
            channel.onmessage = (event: MessageEvent<Msg>) => {
                const msg = event.data
                switch (msg.msgType) {
                    case "lines": {
                        const lines = msg.lines
                        console.log(lines)
                        genShader(gl, lines.length)
                        const { pos_arr, uv_arr, idx_arr } = genBufferData(20, 20)

                        let srcWeights: number[][] = lines.map(() => [])
                        for (let i = 0; i < pos_arr.length; i += 2) {
                            let ws = lines.map((line) => {
                                return calcWeight(
                                    { x: pos_arr[i], y: pos_arr[i + 1] },
                                    line.src,
                                    0.001,
                                    1,
                                    1
                                )
                            })
                            let w_acc = ws.reduce((acc, w) => acc + w, 0)
                            ws.forEach((w, lineIdx) => srcWeights[lineIdx].push(w / w_acc))
                        }
                        console.log(srcWeights)

                        let tarWeights: number[][] = lines.map(() => [])
                        for (let i = 0; i < pos_arr.length; i += 2) {
                            let ws = lines.map((line) => {
                                return calcWeight(
                                    { x: pos_arr[i], y: pos_arr[i + 1] },
                                    line.tar,
                                    0.001,
                                    1,
                                    1
                                )
                            })
                            let w_acc = ws.reduce((acc, w) => acc + w, 0)
                            ws.forEach((w, lineIdx) => tarWeights[lineIdx].push(w / w_acc))
                        }
                        console.log(tarWeights)
                        console.log(pos_arr.length)
                        break
                    }
                }
            }
            channel.postMessage(<Msg>{ msgType: "opened" })
        })

        return {
            imgMorphCanvasRef,
        }
    },
})
</script>

<style scoped>
min-w-0 {
    min-width: 0px;
}
</style>
