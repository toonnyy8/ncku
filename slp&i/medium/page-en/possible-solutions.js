///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const possibleSolutions = (() => {
    return [
        template.default_page(
            "Possible Solutions",
            html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                html.ul()([
                    html.li()([
                        `Change the current Encoder-Decoder :`, html.br(),
                        html.p({ class: ["text-base"], })([
                            `Even if the correct acoustic information is used, it cannot bring significant improvement.`, html.br(),
                            `Indicates that the current Encoder-Decoder may not be able to extract important information.`, html.br(), html.br(),
                        ])
                    ]),
                ]),
            ]),
        ),
        template.default_page(
            "Possible Solutions",
            html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                html.ul()([
                    html.li()([
                        `Use the multi-layer (multi-resolution) of VQ-VAE 2
                        to try to preserve the sound characteristics of different fineness.`, html.br(), html.br(),
                    ]),
                ]),
            ]),
        ),
        template.page2(20)(
            "Possible Solutions",
            "Challenge",
            html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                html.ul()([
                    html.li({ style: [css.tx.color(255, 0, 102)] })([
                        `Calculate from Time Domain.`, html.br(), html.br(),
                    ]),
                    html.li({ style: [css.tx.color(255, 0, 102)] })([
                        `Use Phase information.`,
                    ]),
                ]),
            ]),
        ),
        template.page2(0)(
            "Possible Solutions",
            "VQ-VAE2",
            html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                html.img({ src: "./img/methodology/vq-vae2.png", style: [css.w.percent(100)] })
            ]),
        ),
        template.page2(0)(
            "Possible Solutions",
            html.span({ class: ["text-xl"], style: [css.tx.color(255, 0, 102)] })`Dense CNN`,
            html.div({ class: ["text-lg"], style: [css.tx.left(), css.p.t(1)] })([
                // html.a({ href: "https://arxiv.org/abs/2009.01941", class: ["text-lg"], })`Dense CNN with Self-Attention for Time-Domain Speech Enhancement`,
                html.img({ src: "./img/methodology/DCN.png", style: [css.w.percent(100), css.p.t()] })
            ]),
        ),
        template.page2(0)(
            "Possible Solutions",
            html.span({ class: ["text-xl"], style: [css.tx.color(255, 0, 102)] })`Deep Complex U-Net`,
            html.div({ class: ["text-lg"], style: [css.tx.left(), css.p.t(1)] })([
                html.a({ href: "https://openreview.net/forum?id=SkeRTsAcYm", class: ["text-xl"], })`Phase-Aware Speech Enhancement with Deep Complex U-Net`,
                html.img({ src: "./img/methodology/Deep-Complex-U-Net.png", style: [css.w.percent(100), css.p.t(20)] })
            ]),
        ),
    ]
})()