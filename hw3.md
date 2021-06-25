# 成大 繪圖技術設計與應用 2021

## 作業三 「3D 骨架動畫播放」

### 操作方式

-   點擊關節點：切換操作骨骼
-   A、D、S、W 按鍵：切換操作骨骼
-   X、Y、Z 按鍵：切換旋轉軸(預設 Z 軸)
-   左右拖放：旋轉
-   滑鼠滾輪：切換動畫，分別為
    -   無動畫
    -   閒置動畫(預設)
    -   走路動畫
    -   奔跑動畫

### 執行

用瀏覽器打開 build/hw3/index.html  
瀏覽器需要支援 webgl2

### 安裝並打包

```zsh
npm i
npm run build:hw3
```

### 模型來源

https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Fox