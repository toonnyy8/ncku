import * as tf from "@tensorflow/tfjs"
{
    const f = (n: number) =>
        tf.fill([n], 0.9).pow(tf.range(0, n, 1, "int32"))

    f(10).print()
}

{
    const f = (n: number) => Math.pow(0.9, n)
    console.log(
        new Array(40).fill(0).map((_, idx) => f(idx))
    )

    const g = (x: (n: number) => number) => {
        const memory: number[] = []
        const _g = (n: number) => {
            if (n < 0) return 0
            else if (memory.length > n) return memory[n]
            else if (n == 0) return memory[n] = x(n)
            else return memory[n] = 1.8 * Math.cos(Math.PI / 16) * _g(n - 1) - 0.81 * _g(n - 2) + x(n) + (1 / 2) * x(n - 1)
        }
        return _g
    }

    const _g = g(f)
    console.log(
        new Array(100).fill(0).map((_, idx) => _g(idx))
    )
}

{
    const canvas = document.createElement("canvas")
    canvas.width = 400
    canvas.height = 200

    const ctx = canvas.getContext("2d")
}

{
    const filter = (b: number[], a: number[]) => (x) => { }
}