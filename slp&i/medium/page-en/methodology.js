///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const methodology =
    (() => {
        return [
            template.default_page(
                'Methodology',
                html.p({ style: [css.tx.center(), css.tx.size(15), css.p.t(15)] })([
                    html.a({
                        href: 'https://arxiv.org/abs/1505.04597',
                        style: [css.tx.color(255, 235, 205)]
                    })`U-Net`, html.br(),
                    `+`, html.br(), html.a({
                        href: 'https://arxiv.org/abs/1711.00937',
                        style: [css.tx.color(255, 235, 205)]
                    })`VQ-VAE`,
                    html.br(), `+`, html.br(), html.a({
                        href: 'https://arxiv.org/abs/1706.03762',
                        style: [css.tx.color(255, 235, 205)]
                    })`Multi Head Attention`,
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'U-Net',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/u-net.png', style: [css.w.percent(100)] }),
                    html.img({ src: './img/methodology/loss-mse.png', style: [css.w.percent(60)] }),
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'Symbolic Encoder',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/symbolic-encoder.png', style: [css.w.percent(80)] }),
                    html.img({ src: './img/methodology/loss-symbolic.png', style: [css.w.percent(70)] }),
                ]),
            ),
            template.page3(10)(
                'Methodology',
                'Symbolic Encoder',
                'VQ-VAE',
                html.div({ class: ["text-base"] })([
                    template.div_hc(0)([html.img({ src: './img/methodology/vq-vae.png', style: [css.w.percent(100)] })]),
                    html.br(),
                    "The hidden vector output by the Encoder is vector quantized before being input to the Decoder for generation.", html.br(),
                    "Two-step training：",
                    html.ul({ style: [css.p.l(20)] })([
                        html.li({ class: ["text-lg"], style: [css.tx.color(255, 0, 102)] })([
                            "Train Encoder-CodeBook-Decoder."
                        ]),
                        html.li()([
                            "Train Pixel CNN to generate discrete hidden variants.", html.br(),
                            "(Q(z|x) in the figure above)"
                        ]),
                    ])
                ]),
            ),
            template.page2(0)(
                'Methodology',
                'Multi Head Attention',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/mha.png', style: [css.w.percent(35), css.p.r(5)] }),
                    html.img({ src: './img/methodology/multi-head-attention.png', style: [css.w.percent(55), css.p.l(5)] }),
                ]),
            ),

            template.page2(0)(
                'Methodology',
                'Loss',
                template.div_hc(0)([
                    html.img({ src: './img/methodology/loss-mse.png', style: [css.h.mm(40)] }),
                    html.img({ src: './img/methodology/loss-symbolic.png', style: [css.h.mm(20)] }),
                    html.br(),
                    html.br(),
                    html.img({ src: './img/methodology/loss-total.png', style: [css.h.mm(20)] }),
                ]),
            ),
        ]
    })()