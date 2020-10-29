///<reference path="../src/html.js">
///<reference path="../src/css.js">

const title = (() => {
    const span6xl = html.span({ class: ["text-6xl"] })
    const span3xl = html.span({ class: ["text-3xl"] })
    const span2xl = html.span({ class: ["text-2xl"] })
    const spanlg = html.span({ class: ["text-lg"] })
    const pxl_1 = html.p({ class: ["text-xl"], style: [css.tx.left(), css.w.percent(48), css.m.auto()] })
    const pxl_2 = html.p({ class: ["text-xl"], style: [css.p.all(10)] })
    const div_vc = html.div({
        style: [
            css.display.flex(),
            css.flex.wrap.yes(),
            css.align.items.center(),
            css.h.percent(100),
            css.w.percent(100),
        ]
    })
    const div_hc = html.div({
        class: ["text-xl"],
        style: [
            css.p.all(10),
            css.tx.center(),
            css.w.percent(100),
        ]
    })
    return [
        html.page()([
            div_vc([
                div_hc([
                    html.a({ class: ["text-2xl"], href: "https://arxiv.org/abs/1904.13142", style: [css.tx.color(255, 235, 205)] })
                        `Incorporating Symbolic Sequential Modeling for Speech Enhancement`,
                    html.hr(),
                    pxl_1([
                        spanlg`Chien-Feng Liao, Yu Tsao,`, html.br(),
                        spanlg`Xugang Lu, Hisashi Kawai`,
                    ]),
                ])
            ])
        ]),
        html.page()([
            div_vc([
                div_hc([
                    span3xl`Outline`,
                    html.hr(),
                    html.ul({ style: [css.tx.left(), css.m.l(100)] })([
                        html.li()`Introduction`,
                        html.li()`Methodology`,
                        html.ul({ class: ["text-lg"] })([
                            html.li()`U-Net`,
                            html.li()`Symbolic Encoder`,
                            html.li()`Multi Head Attention`,
                        ]),
                        html.li()`Architecture`,
                        html.li()`Experiments`,
                        html.li()`Conclusion`,
                    ])
                ])
            ])
        ]),
    ]
})()