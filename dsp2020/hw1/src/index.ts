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
    const x = (n: number) => {
        if (n == 0) return 1
        else return 0
    }

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

    const _g = g(x)
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
    const filter = (b: number[], a: number[], x: number[]) => {
        if (a[0] != 1) {
            console.error("a[0] must equal 1")
            return
        }
        const arrfn = (arr: number[]) => {
            return (n: number) => {
                if (arr[n] != undefined) return arr[n]
                else return 0
            }
        }
        const _b = arrfn(b)
        const _a = arrfn(a)
        const _x = arrfn(x)
        const memory: number[] = []
        const f = (n) => {
            if (n < 0) return 0
            else if (memory.length > n) return memory[n]
            else {
                let out = 0
                for (let k = 0; k <= n; k++) {
                    out += _x(n - k) * _b(k) - f(n - (k + 1)) * _a(k + 1)
                }
                memory[n] = out
                return out
            }
        }
        return f
    }
    let f = filter([1, 1 / 2], [1, -1.8 * Math.cos(Math.PI / 16), 0.81], [1])
    console.log(new Array(40).fill(0).map((_, idx) => f(idx)))
}