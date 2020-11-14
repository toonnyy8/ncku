# [DSP Project of Chapter 5](https://toonnyy8.github.io/ncku/dsp2020/hw3/build/index.html)
> dev 資料夾中存放開發用原始碼。  
> build 資料夾則是存放已經打包完的程式碼，可直接開啟 index.html 觀看執行結果。

「My Downsample」 在處理完後能下載 Downsample 完的 wav 檔。
> 感謝 https://github.com/higuma/wav-audio-encoder-js

> Shift the pitch of a soundtrack of a person singing (downloaded from the course Web site) and process the data to make them sing 6 semitones loweror higher. Please show the spectrogram of the three audio files for comparison.

#### 關於半音：
* 升八度等於頻率變成兩倍
* 一個八度距離 12 個半音
* 所以升一個半音約等於頻率變成 2**(1/12) 倍 
* 六個半音約為 2**(6/12) = 2**(1/2)

## 實作
> 參考 [An Efficient Method for Pitch Shifting Digitally Sampled Sounds](https://www.jstor.org/stable/3679554?seq=1) 這篇論文提出的方法並稍作改變

1. 實作 ideal lowpass filter
```typescript
const sinc = (x) => Math.sin(x) / x
const ilp = (Ts, Tcutoff) => (t) => (t == 0 ? 1 : sinc(2 * Math.PI * t / (Ts / Tcutoff)))
```

2. 利用兩個 lowpass filter 相減得到 bandpass filter
```typescript
const bandpass = (Ts: number, from: number, to: number, L: number) => {
    const tofil = ilp(Ts, to)
    const fromfil = ilp(Ts, from)

    let toK = new Array(L).fill(0).map((_, idx) => tofil(idx - Math.floor(L / 2)))
    const toK_acc = toK.reduce((prev, curr) => prev + curr, 0)
    toK = toK.map(val => val / toK_acc)

    let fromK = new Array(L).fill(0).map((_, idx) => fromfil(idx - Math.floor(L / 2)))
    const fromK_acc = fromK.reduce((prev, curr) => prev + curr, 0)
    fromK = fromK.map(val => val / fromK_acc)

    return new Array(L).fill(0).map((_, idx) => toK[idx] - fromK[idx])
}
```

3. 實作 pitch shift 算法  

與原版相比，會先將原聲利用重採樣先得出變調變速的語音，在使用變調變速的語音疊加在相對應的輸出時序上。
```typescript
const pitchShift = (semitones: number, source: ArrayLike<number>) => {
    const windowFn = (x) => (1 + Math.cos(2 * Math.PI * x)) / 2
    let outptr = 0
    let periodratio = 2 ** (-semitones / 12)
    console.log(periodratio)

    let out = new Array(len(source)).fill(0)

    // 得出變調變速的語音
    let newSource = <Float32Array>tf.image.resizeBilinear(
        tf.tensor3d(<number[]>source, [len(source), 1, 1]),
        [Math.round(len(source) * periodratio), 1]
    ).flatten().dataSync()

    let x = 0
    let oldzerocross = -1

    for (let i = 0; i < len(source); i++) {
        let oldx = x
        x = source[i]

        if (oldx > 0 && x <= 0) {
            let periodlength = (i - oldzerocross);
            oldzerocross = i;
            while (outptr < i) {
                let p = Math.round(periodlength * periodratio)
                outptr = outptr + p
                for (let n = -p; n <= p; n++) {

                    if (outptr + n >= 0 &&
                        outptr + n < len(source) &&
                        i + n >= 0 &&
                        i + n < len(source)) {
                        // 使用變調變速的語音代替原聲作為輸出
                        out[outptr + n] +=
                            newSource[Math.round(i * periodratio) + n] *
                            windowFn(n / (p * 2))
                    }
                }
            }
        }
    }
    return out
}
```

4. 依據頻率改變 bandpass 後的大小，在低頻的部分讓其通過，在較高頻的部分則是將其能量縮小(縮至零會導致失去高頻特徵，不減少又會出現雜音)
```typescript
let L = 256 * 2 + 1

let bandpassK1 = bandpass(16000, 110, 550, L)
let bandpassK2 = bandpass(16000, 550, 1760, L)
let bandpassK3 = bandpass(16000, 1760, 4000, L)
let bandpassK = tf.addN([
    tf.tensor(bandpassK1),
    tf.tensor(bandpassK2).mul(0.1),
    tf.tensor(bandpassK3).mul(0.05),
]).dataSync()
```

5. 進行濾波與 pitch shift
```typescript
let pitch_shift_audioArr = <Float32Array>tf.conv1d(
    tf.tensor3d(audioArr, [1, len(audioArr), 1]),
    tf.tensor3d(bandpassK, [L, 1, 1]),
    1,
    "same").flatten().dataSync()
pitch_shift_audioArr = new Float32Array(pitchShift(shiftValue, pitch_shift_audioArr))

```