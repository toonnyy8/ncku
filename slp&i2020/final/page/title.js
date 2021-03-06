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
                    html.span({ class: ["text-2xl"], })
                        `Speech Enhancement 專論研究`,
                    html.hr(),
                    html.div({ style: [css.p.l(70)], })([
                        html.table({ class: ["text-lg"], })([
                            html.tr()([
                                html.td({ style: [css.tx.right()] })([`Advisor :`]),
                                html.td()([`Chung-Hsien Wu`]),
                            ]),
                            html.tr()([
                                html.td({ style: [css.tx.right()] })([`Presenter :`]),
                                html.td()([`Jen-Hung Huang`]),
                            ]),
                        ])
                    ])
                ])
            ])
        ]),
    ]
})()