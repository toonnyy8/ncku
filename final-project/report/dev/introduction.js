///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const introduction = (() => {
    return [
        template.page2(20)(
            html.p()([`Efficient`, html.br(),
                `Transformers`]),
            "Introduction",
            html.p({ class: ["text-base"] })([
                `於 2017 年提出的 Transformer 為深度學習模型帶來的巨大的影響。`,
                html.br(),
                `其核心方法 Self Attention 不論是在 NLP 或是 CV 的相關任務都取得了優秀的表現。`,
                html.br(),
                html.br(),
                `然而在計算過程中，會產生一個 L`, html.sup()`2`,
                ` 大小的注意力矩陣。隨著輸入序列增大，耗費的記憶體與計算量也呈平方上升。`,
                html.br(),
                html.br(),
                `尤其是高記憶體複雜度會嚴重阻礙 Transformer 應用在長序列問題上的可行性。`,
                `因此近期有許多論文提出各式 X-former，盡量減少需要耗費的記憶體。`,
            ])
        ),
        template.page2(20)(
            "Long Range Arena",
            "Introduction",
            html.p({ class: ["text-base"] })([
                `但目前缺乏一個系統性的基準來評估這些模型在不同任務上的性能優劣。`,
                html.br(),
                html.br(),
                `為此，Tay et al. 提出了 Long Range Arena 這個由複數任務組成的測試基準，`,
                `用以評估各種 X-former 在文字、影像、推論等等問題上的效果。`,
                html.br(),
                html.br(),
                `本次報告將會簡介各大類型的 Transformer 改善方式與 Long Range Arena 這個評斷指標。`,
            ])
        ),
    ]
})()