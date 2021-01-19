///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const conclusion =
    (() => {
        return [
            template.default_page(
                'Conclusion',
                html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                    html.ul()([
                        html.li()([
                            `在使用 1D Conv 且不使用 Mask 的情況下，Magnitude Only 比起 Complex Conv 更容易保留原本的語音`, html.br(),
                        ]),
                        html.li()([
                            `在實驗中發現，如果 VQ-U-Net 將上層的特徵量化，所得到的音質會更加的破碎。`, html.br(),
                        ]),
                    ]),
                ]),
            ),
        ]
    })()