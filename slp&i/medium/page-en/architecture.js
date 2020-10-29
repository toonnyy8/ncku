///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const architecture =
    (() => {
        return [
            template.default_page(
                'Architecture',
                html.p()([html.img({ src: './img/architecture/model.png', style: [css.w.percent(100)] })]),
            ),
            template.page2(0)(
                'Architecture',
                'Encoder',
                template.div_hc(0)([
                    html.img({ src: './img/architecture/encoder.png', style: [css.w.percent(60)] })
                ]),
            ),
            template.page2(0)(
                'Architecture',
                'Decoder',
                template.div_hc(0)([
                    html.img({ src: './img/architecture/decoder.png', style: [css.w.percent(70)] })
                ]),
            ),
            template.page2(0)(
                'Architecture',
                'Symbolic Encoder',
                template.div_hc(0)([html.img({ src: './img/architecture/symbolic-encoder.png', style: [css.w.percent(90)] })]),
            ),
            template.page2(0)(
                'Architecture',
                'Complete Model',
                template.div_hc(0)([html.img({ src: './img/architecture/complete-model.png', style: [css.w.percent(80)] })]),
            ),
        ]
    })()