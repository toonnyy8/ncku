
import { css } from "./css"
import { html } from "./html"

export const title = (() => {
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
                    html.a({ class: ["text-3xl"], href: "https://arxiv.org/abs/2009.06732" })
                        `Efficient Transformers: A Survey`,
                    html.hr(),
                    pxl_1([
                        spanlg`Yi Tay, Mostafa Dehghani, Dara Bahri, Donald Metzler`,
                    ]),
                ])
            ])
        ]),
        html.page()([
            div_vc([
                div_hc([
                    html.a({ class: ["text-3xl"], href: "https://arxiv.org/abs/2011.04006" })
                        `Long Range Arena: A Benchmark for Efficient Transformers`,
                    html.hr(),
                    pxl_1([
                        spanlg`Yi Tay, Mostafa Dehghani, Samira Abnar, Yikang Shen, Dara Bahri, Philip Pham, Jinfeng Rao, Liu Yang, Sebastian Ruder, Donald Metzler`,
                    ]),
                ])
            ])
        ]),
        html.page()([
            div_vc([
                div_hc([
                    span3xl`Outline`,
                    html.hr(),
                    html.ul({ style: [css.tx.left(), css.m.l(70)] })([
                        html.li()`Introduction`,
                        html.li()`Efficient Transformers`,
                        html.li()`Long Range Arena`,
                        html.li()`Experiments`,
                        html.li()`Conclusion`,
                    ])
                ])
            ])
        ]),
    ]
})()