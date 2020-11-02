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
                        `更換目前的 Encoder-Decoder：`, html.br(),
                        `即便用上了正確的聲學資訊依然無法帶來顯著提升，`, html.br(),
                        `表示 Encoder-Decoder 可能無法提取重要的資訊。`, html.br(), html.br(),
                    ]),
                    html.li()([
                        `使用 VQ-VAE 2 的多階層(多解析度)，嘗試保留不同細度的聲音特徵。`, html.br(), html.br(),
                    ]),
                ]),
            ]),
        ),
        template.default_page(
            "Possible Solutions",
            html.div({ class: ["text-lg"], style: [css.p.t(1)] })([
                html.ul()([
                    html.li()([
                        `更換目前的 Encoder-Decoder：`, html.br(),
                        `即便用上了正確的聲學資訊依然無法帶來顯著提升，`, html.br(),
                        `表示 Encoder-Decoder 可能無法提取重要的資訊。`, html.br(), html.br(),
                    ]),
                    html.li()([
                        `使用 VQ-VAE 2 的多階層(多解析度)，嘗試保留不同細度的聲音特徵。`, html.br(), html.br(),
                    ]),
                    html.li({ style: [css.tx.color(255, 0, 102)] })([
                        `挑戰：從 Time Domain 進行計算。`, html.br(), html.br(),
                    ]),
                    html.li({ style: [css.tx.color(255, 0, 102)] })([
                        `挑戰：使用 Phase 的資訊。`,
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