///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const conclusion = (() => {
    return [
        template.default_page(
            "Conclusion",
            html.div({ class: ["text-base"] })([
                html.p()([
                    `利用 Symbolic Encoder 先將語音編碼成聲音單元，`,
                    `在通過 Multi Head Attention 與提取特徵，能取得比原先更好的結果`
                ]), html.br(),
                "讀者想法：",
                html.ul()([
                    html.li()([
                        `Symbolic Encoder + Multi Head Attention `,
                        `的結構就是在為語音建立基礎結構(說話內容)`, html.br(), html.br(),
                    ]),
                    html.li()([
                        `而利用 U-Net 的 shortcut 便能幫助基礎結構補上語調的資訊(聲調起伏、音色等等)`, html.br(), html.br(),
                    ]),
                    html.li()([
                        `在 VQ-VAE 都出第 2 代的現在，可以試試用多階層(多解析度)的方式，來為模型保留住更多的聲音特徵`, html.br(), html.br(),
                    ]),
                ]),
            ]),
        ),
    ]
})()