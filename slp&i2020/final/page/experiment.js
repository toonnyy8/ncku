///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

let audio = (src) => {
    let aud = document.createElement("audio")
    aud.src = src
    aud.controls = true
    return aud
}

const experiment =
    (() => {
        return [
            template.page(0)(
                'Experiments',
                template.div_hc(0)([
                    html.img({ src: './img/experiments/performance.png', style: [css.w.percent(100)] }),
                ]),
            ),
            template.page2(0)(
                'Experiments',
                'Demo',
                template.div_hc(0)([
                    "target：", audio('./demo/target.wav'),
                    html.br(),
                    "noisy：", audio('./demo/noisy.wav'),
                    html.br(),
                    "U-Net：", audio('./demo/u-net/-6.wav'),
                    html.br(),
                    "VoV-U-Net：", audio('./demo/vov-u-net/-6.wav'),
                    html.br(),
                    "Complex-VoV-U-Net：", audio('./demo/complex/-6.wav'),
                    html.br(),
                    "Fragment-VQ-U-Net：", audio('./demo/vq/-6.wav'),
                ]),
            ),
        ]
    })()