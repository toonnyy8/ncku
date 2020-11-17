# [DSP Project of Chapter 5](https://toonnyy8.github.io/ncku/dsp2020/hw3/build/index.html)
> dev 資料夾中存放開發用原始碼。  
> build 資料夾則是存放已經打包完的程式碼，可直接開啟 index.html 觀看執行結果。

「Upload」 在處理完後能下載調整 pitch 後的 wav 檔。
> 感謝 https://github.com/higuma/wav-audio-encoder-js

> Shift the pitch of a soundtrack of a person singing (downloaded from the course Web site) and process the data to make them sing 6 semitones loweror higher. Please show the spectrogram of the three audio files for comparison.

#### 關於半音：
* 升八度等於頻率變成兩倍
* 一個八度距離 12 個半音
* 所以升一個半音約等於頻率變成 2**(1/12) 倍 
* 六個半音約為 2**(6/12) = 2**(1/2)

## 實作
> ~~參考 [An Efficient Method for Pitch Shifting Digitally Sampled Sounds](https://www.jstor.org/stable/3679554?seq=1) 這篇論文提出的方法並稍作改變~~

原本嘗試使用時域的方式改變 pitch，但效果不好。因此改使用頻域的調變方式。
>  參考 https://github.com/jagger2048/PitchShifting

1. 輸入介紹
```typescript
let shiftValue // 升降的半音數量
let audioArr // 原始聲音訊號
```

2. 變數介紹
```typescript
let rate = 2 ** (shiftValue / 12) // 由半音計算頻率縮放倍數
let analysis = 64 // 拆分訊號時每個 frame 的步長，如果太長會導致輸出聲音出現些許回音感
let synthesis = Math.round(analysis * rate) // 合成訊號時每個 frame 的步長
let win_len = analysis * 8 // 每個 frame 的 window size
let win = tf.signal.hannWindow(win_len) // hann window
let ana_count = Math.ceil(len(audioArr) / analysis) // frame 數量
let omega = tf.tensor( // 每個平律的基本偏移量（？？
    new Array(win_len)
        .fill(0)
        .map((_, idx) =>
            2 * Math.PI * idx * analysis / win_len
        ))
let ang_pre: tf.Tensor1D = tf.zeros([win_len]) // 上一個 frame 的相位
let ang: tf.Tensor1D = tf.zeros([win_len]) // frame 的相位
let y_ang: tf.Tensor1D = tf.zeros([win_len]) // 輸出的相位
let out = [] // 輸出
```

3. 主要運算流程
```typescript
for (let offset = 0; offset < ana_count; offset++) {
    tf.tidy(() => {
        let frame = <tf.Tensor1D>tf.tensor(audioArr.slice(analysis * offset, analysis * offset + win_len)) // 切割 frame
        if (frame.shape[0] < win_len) { // 如果長度不足就補 0
            frame = tf.pad1d(frame, [0, win_len - frame.shape[0]])
        }
        frame = frame.mul(win) // 乘上 window

        let frame_fft = <tf.Tensor1D>tf.fft(tf.complex(frame, tf.zerosLike(frame))) // 計算頻譜
        ang_pre.dispose()
        ang_pre = tf.keep(ang.clone())
        ang.dispose()
        ang = tf.keep(tf.atan2(tf.imag(frame_fft), tf.real(frame_fft))) // 計算相位
        let mag = frame_fft.abs() // 計算大小

        let delta = ang.sub(ang_pre.add(omega))
        let phase_unwrap = delta.sub(tf.round(delta.div(2 * Math.PI)).mul(2 * Math.PI))
        let phase_inc = (phase_unwrap.add(omega)).div(analysis)

        if (offset == 0) {
            y_ang.dispose()
            y_ang = ang.clone()
        }
        else {
            let dis = y_ang
            y_ang = y_ang.clone()
            dis.dispose()
            y_ang = y_ang.add(phase_inc.mul(synthesis))
        }
        y_ang = tf.keep(y_ang.sub(tf.round(y_ang.div(2 * Math.PI)).mul(2 * Math.PI)))

        let h = tf.complex(
            tf.cos(y_ang).mul(mag),
            tf.sin(y_ang).mul(mag),
        ) // 用新的相位重建頻譜
        let y_ifft = <number[]>tf.real(tf.ifft(h)).mul(win).flatten().arraySync() // 計算時域訊號
        y_ifft.forEach((sample, idx) => { // 以 synthesis 作為步長疊加訊號
            if (out[offset * synthesis + idx] === undefined) out[offset * synthesis + idx] = 0
            out[offset * synthesis + idx] += sample
        })

    })
}
```

4. 經過步驟 3 後會得到變速不變調的訊號，在將此訊號重取樣回原長度便可得到變調不變速的訊號
```typescript
out = <number[]>tf.image.resizeBilinear(
    tf.tensor3d(out, [len(out), 1, 1]),
    [ana_count * analysis + (win_len - analysis), 1]
).flatten().arraySync()
out = out.slice(0, len(audioArr))
```

## 後續
目前計算方式是將一個 frame 作為一個 batch 進行運算，在 gpu 上進行時效率較低，要耗費較多的時間，但如果將所有 frame 作為一個 batch 進行運算又會使用過量記憶體。因此後續應該會以多個 frame 作為一個 batch，使其可以充分運用 gpu 的並行優勢，又不會使記憶體過載。