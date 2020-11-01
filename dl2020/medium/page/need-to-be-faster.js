///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const need_to_be_faster =
    (() => {
        return [
            template.default_page(
                `Need to be Faster`,
                html.div({ class: ["text-lg"], style: [css.tx.left(), css.p.t(1)] })([
                    `Transformer 理論上能帶來比 LSTM 更好的效果。`, html.br(), html.br(),
                    `但其需要消耗的運算資源與記憶體量實在是太多了。`, html.br(), html.br(),
                    `為了保障遊戲的即時性，將會嘗試使用 `,
                    html.a({ href: "https://arxiv.org/abs/2006.04768" })`Linformer`,
                    ` 或 `,
                    html.a({ href: "https://arxiv.org/abs/2009.14794" })`Performer`,
                    ` 等等以減少運算量為目標的 Transformer 變形。`
                ]),
            ),
        ]
    })()