///<reference path="../src/html.js">
///<reference path="../src/css.js">

const template = (() => {
    const span6xl = html.span({ class: ['text-6xl'] })
    const span3xl = html.span({ class: ['text-3xl'] })
    const span2xl = html.span({ class: ['text-2xl'] })
    const spanlg = html.span({ class: ['text-lg'] })
    const spanbase = html.span({ class: ['text-base'] })
    const pxl_1 = html.p({
        class: ['text-xl'],
        style: [css.tx.left(), css.w.percent(48), css.m.auto()]
    })
    const pxl_2 = html.p({ class: ['text-xl'], style: [css.p.all(10)] })
    const div_vc = html.div({
        style: [
            css.display.flex(),
            css.flex.wrap.yes(),
            css.align.items.center(),
            css.h.percent(100),
            css.w.percent(100),
        ]
    })
    /**
     * 
     * @param {number} paddingNum 
     */
    const div_hc = (paddingNum) => html.div({
        class: ['text-xl'],
        style: [
            css.p.all(paddingNum),
            css.tx.center(),
            css.w.percent(100),
        ]
    })

    return {
        /**
         *
         * @param {string|HTMLElement} title
         * @param {string|HTMLElement} content
         */
        default_page:
            (title, content) => {
                return html.page()([div_vc([div_hc(10)([
                    span3xl([title]),
                    html.hr(),
                    html.div({ style: [css.h.mm(150), css.tx.justify(), css.m.x(20)] })(
                        [content]),
                ])])])
            },

        /**
         *
         * @param {number} contentMargin
         */
        page:
            (contentMargin) =>
                /**
                 *
                 * @param {string|HTMLElement} title
                 * @param {string|HTMLElement} content
                 */
                (title, content) => {
                    return html.page()([div_vc([div_hc(10)([
                        span3xl([title]),
                        html.hr(),
                        html.div({
                            style: [css.h.mm(150), css.tx.justify(), css.m.x(contentMargin)]
                        })([content]),
                    ])])])
                },
        /**
         *
         * @param {number} contentMargin
         */
        page2:
            (contentMargin) =>
                /**
                 *
                 * @param {string|HTMLElement} title1
                 * @param {string|HTMLElement} title2
                 * @param {string|HTMLElement} content
                 */
                (title1, title2, content) => {
                    return html.page()([div_vc([div_hc(10)([
                        html.p({ style: [css.tx.left(), css.pos.abs()] })([
                            spanbase([title1]),
                        ]),
                        span3xl([title2]),
                        html.hr(),
                        html.div({
                            style: [css.h.mm(150), css.tx.justify(), css.m.x(contentMargin)]
                        })([content]),
                    ])])])
                },
        /**
         *
         * @param {number} contentMargin
         */
        page3:
            (contentMargin) =>
                /**
                 *
                 * @param {string|HTMLElement} title1
                 * @param {string|HTMLElement} title2
                 * @param {string|HTMLElement} title3
                 * @param {string|HTMLElement} content
                 */
                (title1, title2, title3, content) => {
                    return html.page()([div_vc([div_hc(10)([
                        html.p({ style: [css.tx.left(), css.pos.abs(), css.w.mm(277)] })([
                            spanbase([title1]),
                        ]),
                        html.p({ style: [css.tx.right(), css.pos.abs(), css.w.mm(277)] })([
                            spanlg([title2]),
                        ]),
                        span3xl([title3]),
                        html.hr(),
                        html.div({
                            style: [css.h.mm(150), css.tx.justify(), css.m.x(contentMargin)]
                        })([content]),
                    ])])])
                },
        div_vc,
        div_hc,
        a: (href = "") => html.a({ href, style: [css.tx.color(255, 235, 205)] }),
    }
})()