export const gray = (x: number[][][],) => {
    let h = x.length
    let w = x[0].length
    const out = new Array(h).fill(0).map(() => new Array(w).fill(0))
    for (let i = 0; i < h; i++)
        for (let j = 0; j < w; j++) {
            out[i][j] = x[i][j].reduce((prev, curr) => prev + curr, 0) / x[i][j].length
        }

    return out
}

export const gaussianKernel3x3 = (sigma: number) => {
    const ds = [
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 2],
    ]
    return ds.map(row => row.map(d => (Math.exp(-d / (2 * (sigma ** 2))) / (2 * Math.PI * (sigma ** 2)))))
}

export const conv3x3 = (x: number[][], kernel: number[][],) => {
    let h = x.length
    let w = x[0].length
    const out = new Array(h).fill(0).map(() => new Array(w).fill(0))
    for (let i = 0; i < h; i++)
        for (let j = 0; j < w; j++) {
            if (i - 1 > 0) {
                if (j - 1 > 0) out[i][j] += x[i - 1][j - 1] * kernel[0][0]
                out[i][j] += x[i - 1][j] * kernel[0][1]
                if (j + 1 < w) out[i][j] += x[i - 1][j + 1] * kernel[0][2]
            }

            if (j - 1 > 0) out[i][j] += x[i][j - 1] * kernel[1][0]
            out[i][j] += x[i][j] * kernel[1][1]
            if (j + 1 < w) out[i][j] += x[i][j + 1] * kernel[1][2]

            if (i + 1 < h) {
                if (j - 1 > 0) out[i][j] += x[i + 1][j - 1] * kernel[2][0]
                out[i][j] += x[i + 1][j] * kernel[2][1]
                if (j + 1 < w) out[i][j] += x[i + 1][j + 1] * kernel[2][2]
            }
        }

    return out
}

export const median7x7 = (x: number[][]): number[][] => {
    const offsets = [-3, -2, -1, 0, 1, 2, 3]
    const h = x.length
    const w = x[0].length
    const out = new Array(h).fill(0).map(() => new Array(w).fill(0))
    for (let i = 0; i < h; i++)
        for (let j = 0; j < w; j++) {
            const arr = x.slice(i - 3 > 0 ? i - 3 : 0, i + 3)
                .reduce((prev, row) => [...prev, ...row.slice(j - 3 > 0 ? j - 3 : 0, j + 3)], [])
                .sort((a, b) => a - b)
            out[i][j] = arr[Math.floor(arr.length / 2)]
        }

    return out
} 