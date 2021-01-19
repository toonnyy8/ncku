///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const methodology =
    (() => {
        return [
            template.default_page(
                'Methodology',
                html.div({ style: [css.tx.center(), css.tx.size(11), css.p.t(5)] })([
                    html.p({ style: [css.p.t(5)] })([
                        "U-Net",
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(150, 150, 150)] })`Orthogonal-U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        "VoV-U-Net",
                        html.br(),
                        `vs`,
                        html.br(),
                        "Fragment-VQ-U-Net",
                        html.br(),
                        `vs`,
                        html.br(),
                        "Complex-VoV-U-Net",
                    ]),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'Only Magnitude',
                html.div({ style: [css.tx.center(), css.tx.size(12), css.p.t(5)] })([
                    html.p({ style: [css.p.t(5)] })([
                        html.span({ style: [css.tx.color(255, 0, 102)] })`U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(255, 0, 102)] })`VoV-U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(255, 0, 102)] })`Fragment-VQ-U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(155, 155, 155)] })`Complex-VoV-U-Net`,
                    ]),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'Predict All',
                html.div({ style: [css.tx.center(), css.tx.size(12), css.p.t(5)] })([
                    html.p({ style: [css.p.t(5)] })([
                        html.span({ style: [css.tx.color(155, 155, 155)] })`U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(155, 155, 155)] })`VoV-U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(155, 155, 155)] })`Fragment-VQ-U-Net`,
                        html.br(),
                        `vs`,
                        html.br(),
                        html.span({ style: [css.tx.color(255, 0, 102)] })`Complex-VoV-U-Net`,
                    ]),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'U-Net',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/u-net.png', style: [css.w.percent(85)] }),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'VoV-U-Net',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/vov-u-net.png', style: [css.w.percent(85)] }),
                ]),
            ),
            template.page3(0)(
                'Methodology',
                'VoV-U-Net',
                'VoV Bolck',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/vovnet.png', style: [css.w.percent(85)] }),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'VQ-U-Net',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/vq-u-net.png', style: [css.w.percent(85)] }),
                ]),
            ),
            template.page3(0)(
                'Methodology',
                'VQ-U-Net',
                'Fragment-VQ',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/Fragment-VQ.png', style: [css.w.percent(85)] }),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'Complex-Conv',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/complex-conv.png', style: [css.w.percent(70)] }),
                ]),
            ),
        ]
    })()