# [DSP Project of Chapter 4](https://toonnyy8.github.io/ncku/dsp2020/hw2/build/index.html)
> dev 資料夾中存放開發用原始碼。  
> build 資料夾則是存放已經打包完的程式碼，可直接開啟 index.html 觀看執行結果。

> Change the sampling rate of the audio signal from 16 KHz to 12 KHz.

## 作法
1. 先在時域訊號進行插值補零，於每個值中間加入 L-1 個 0
2. 使用 min(pi/L,pi/M) 作為 cutoff，進行 low pass filter
3. 執行 Dowmsampling，選擇位於 M 整數倍位置的數值

### 建構 ideal low pass filter
```typescript
const ilpf = (T: number) => {
    return (t: number) => {
        const a = Math.sin(Math.PI * t / T)
        const b = Math.PI * t / T
        return a == 0 && b == 0 ? 1 : a / b
    }
}
```

### 進行 Upsampling + low pass filter
```typescript
const f = (t: tf.Tensor1D, L: number, M: number, flen) => {
    // 插入 0
    const x: tf.Tensor2D = t.stack(
        new Array(L - 1)
            .fill(tf.zeros(t.shape)),
        0)
        .transpose([1, 0])
        .reshape([-1, 1])
    let cutoff = Math.max(L, M)
    const lp = ilpf(cutoff)
    return tf.conv1d(
        x,
        tf.tensor3d(
            new Array(flen * L * 2 + 1)
                .fill(0)
                .map((_, idx) => lp(idx - flen * L)),
            [flen * L * 2 + 1, 1, 1]),
        1,
        "valid")
        .flatten()
}
```

### Downsapmling
```typescript
convOut.reshape([-1, M]).slice([0, 0], [-1, 1]).flatten()
```
#### ex.
```typescript
M=4
[
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16],
]
=>[1,5,9,13]
```