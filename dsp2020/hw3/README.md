# [DSP Project of Chapter 4](https://toonnyy8.github.io/ncku/dsp2020/hw2/build/index.html)
> dev 資料夾中存放開發用原始碼。  
> build 資料夾則是存放已經打包完的程式碼，可直接開啟 index.html 觀看執行結果。

「My Downsample」 在處理完後能下載 Downsample 完的 wav 檔。
> 感謝 https://github.com/higuma/wav-audio-encoder-js

> Change the sampling rate of the audio signal from 16 KHz to 12 KHz.

* 升八度等於頻率變成兩倍
* 一個八度距離 12 個半音
* 所以升一個半音約等於頻率變成 2**(1/12) 倍 
* 六個半音約為 2**(6/12) = 2**(1/2)