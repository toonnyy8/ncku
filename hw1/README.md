# 成大 繪圖技術設計與應用 2021

[github.io](https://toonnyy8.github.io/ncku/cgap2021/hw1/)

需支援 webgl2

模型格式：glb

操作：

-   使用支援 webgl2 之瀏覽器開啟 index.html
-   點擊 load file 選擇模型
-   按住畫布上下左右拖動可調整視角
-   滑鼠滾輪可接近、遠離模型

Source Code 解說：

-   src/gltf.js 用來解析 glb 檔與建立 texture
-   src/gl-unit.js 用來依據解析完的 glb 資料建立出場景
    -   Scene
        -   nodes : Node[]
    -   Node
        -   mesh : Mesh
        -   children : Node[]
    -   Mesh
        -   primitives : Primitive[]
    -   Primitive => 最小結構
        -   texture
        -   vao
        -   program
-   src/shader.js 編譯並建構 shader program
-   src/index.js 主程式
