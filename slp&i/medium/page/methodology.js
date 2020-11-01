///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const methodology =
    (() => {
        return [
            template.default_page(
                'Methodology',
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(15)] })([
                    html.p()([
                        html.a({
                            href: 'https://arxiv.org/abs/1505.04597',
                        })`Incorporating Symbolic Sequential Modeling For Speech Enhancement`,
                    ]),
                    html.p({ style: [css.p.t(15)] })([
                        html.a({
                            href: 'https://arxiv.org/abs/1505.04597',
                        })`U-Net`,
                        html.br(),
                        `+`,
                        html.br(),
                        html.a({
                            href: 'https://arxiv.org/abs/1711.00937',
                        })`VQ-VAE`,
                        html.br(),
                        `+`,
                        html.br(),
                        html.a({
                            href: 'https://arxiv.org/abs/1706.03762',
                        })`Multi Head Attention`,
                    ]),
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
                    html.span({ class: ["text-lg"] })`源自於 VQ-VAE 中的 Code Book 概念`, html.br(), html.br(),
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
                    "先將 Encoder 輸出的 hidden vector 進行向量量化後才輸入 Decoder 生成", html.br(),
                    "兩步驟訓練：",
                    html.ul({ style: [css.p.l(70)] })([
                        html.li()([
                            "訓練 Encoder-CodeBook-Decoder"
                        ]),
                        html.li()([
                            "訓練 Pixel CNN 來生成離散的 hidden variants", html.br(),
                            "(上圖的 q(z|x))"
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
            html.page()([
                template.div_hc(0)([
                    html.img({ src: './img/architecture/complete-model.png', style: [css.w.percent(98), css.p.t(8)] })]),
            ]),
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
            template.page2(0)(
                'Methodology',
                'Experiments',
                template.div_hc(0)([
                    html.img({ src: './img/experiments/performance.png', style: [css.w.percent(100)] }),
                ]),
            ),
        ]
    })()