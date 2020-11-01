///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const world_model =
    (() => {
        return [
            template.default_page(
                html.a({
                    href: 'https://worldmodels.github.io/',
                })`World Model`,
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(1)] })([
                    html.img({
                        src: "./img/world_model_overview.svg",
                        style: [css.w.percent(100), css.bg.color(255, 235, 205)]
                    })
                ]),
            ),
            template.default_page(
                html.a({
                    href: 'https://worldmodels.github.io/',
                })`World Model`,
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(15)] })([
                    html.img({
                        src: "./img/mdn_rnn_new.svg",
                        style: [css.w.percent(80), css.bg.color(255, 235, 205)]
                    })
                ]),
            ),
            template.page(0)(
                html.a({
                    href: 'https://worldmodels.github.io/',
                })`World Model`,
                html.div({ style: [css.tx.center(), css.tx.size(10), css.p.t(15)] })([
                    html.img({
                        src: "./img/vae.svg",
                        style: [css.w.percent(100), css.bg.color(255, 235, 205)]
                    })
                ]),
            ),
        ]
    })()