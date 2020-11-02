///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const problems = (() => {
    return [
        template.default_page(
            "Problems",
            html.p({ style: [css.p.t(1)] })([
                html.ol({ class: ["text-lg"] })([
                    html.li({ style: [css.p.b(10)] })`The experiment did not reach the desired result on the evaluation criteria of PESQ and STOI.`,
                    html.li()`Even if the correct acoustic information is given to the Oracle model, there is not much improvement compared with the
Proposed model.`
                ]),
            ])
        ),
    ]
})()