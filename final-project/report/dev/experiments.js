///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const experiments = (() => {
    return [
        template.page2(0)(
            "Experiments",
            html.p({ class: ["text-xl"] })([
                'Required',
                html.br(),
                'Attention Span',
            ]),
            template.div_hc(0)([
                html.img({ src: './img/required-attention-span.png', style: [css.w.percent(65)] }),
            ]),
        ),
        template.page2(0)(
            "Experiments",
            "Task Score",
            template.div_hc(0)([
                html.img({ src: './img/task-score.png', style: [css.w.percent(100)] }),
            ]),
        ),
        template.page2(0)(
            "Experiments",
            "Power",
            template.div_hc(0)([
                html.img({ src: './img/power.png', style: [css.w.percent(100)] }),
            ]),
        ),
        template.page2(0)(
            "Experiments",
            "Performance",
            template.div_hc(0)([
                html.img({ src: './img/Performance.png', style: [css.w.percent(68)] }),
            ]),
        ),
    ]
})()