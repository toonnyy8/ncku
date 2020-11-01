///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const you_just_need_attention =
    (() => {
        return [
            template.default_page(
                html.a({
                    href: 'https://arxiv.org/abs/1706.03762',
                })`You just Need Attention`,
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(15)] })([
                    html.img({
                        src: "./img/multi-head-attention.png",
                        style: [css.w.percent(80)]
                    })
                ]),
            ),
            template.default_page(
                html.a({
                    href: 'https://arxiv.org/abs/1706.03762',
                })`You just Need Attention`,
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(1)] })([
                    html.img({
                        src: "./img/step1.png",
                        style: [css.w.percent(70)]
                    })
                ]),
            ),
            template.page(5)(
                html.a({
                    href: 'https://arxiv.org/abs/1706.03762',
                })`You just Need Attention`,
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(1)] })([
                    html.img({
                        src: "./img/step2.png",
                        style: [css.w.percent(100)]
                    })
                ]),
            ),
        ]
    })()