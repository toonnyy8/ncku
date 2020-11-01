///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const schedule = (() => {
    return [
        template.page(0)(
            "Schedule",
            html.div({ class: ["text-sm"] })([
                html.table({ style: [css.w.percent(100), css.tx.left()] })([
                    html.tr()([
                        html.td({ style: [css.w.percent(25)] })``,
                        html.td({ style: [css.w.percent(15), css.tx.center()] })`10、11`,
                        html.td({ style: [css.w.percent(15), css.tx.center()] })`12、13`,
                        html.td({ style: [css.w.percent(15), css.tx.center()] })`14、15`,
                        html.td({ style: [css.w.percent(15), css.tx.center()] })`16、17`,
                        html.td({ style: [css.w.percent(15), css.tx.center()] })`18`,
                    ]),
                    html.tr()([
                        html.td()`Design encoder and decoder`,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td()``,
                        html.td()``,
                        html.td()``,
                        html.td()``,
                    ]),
                    html.tr()([
                        html.td()`Design State Generator`,
                        html.td()``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td()``,
                        html.td()``,
                    ]),
                    html.tr()([
                        html.td()`to be Faster`,
                        html.td()``,
                        html.td()``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td()``,
                    ]),
                    html.tr({ style: [css.bg.color(255, 222, 222)] })([
                        html.td({ style: [css.tx.color(255, 0, 102)] })`Challenge`,
                        html.td()``,
                        html.td()``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td()``,
                    ]),
                    html.tr()([
                        html.td()`Complete the system`,
                        html.td()``,
                        html.td()``,
                        html.td()``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                        html.td()``,
                    ]),
                    html.tr()([
                        html.td()`Demo`,
                        html.td()``,
                        html.td()``,
                        html.td()``,
                        html.td()``,
                        html.td({ style: [css.bg.color(255, 0, 102)] })``,
                    ]),
                ])
            ]),
        ),
    ]
})()