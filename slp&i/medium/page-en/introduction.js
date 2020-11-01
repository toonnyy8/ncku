///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const introduction = (() => {
    return [
        template.default_page(
            "Speech Enhancement",
            html.p({ class: ["text-base"], style: [css.tx.left(), css.p.t(15)] })([
                `The real world is full of various background noises.
                These noises can pollute the speech signal and reduce the accuracy of ASR,
                hearing aids and other speech tasks.`, html.br(), html.br(),
                `However, when humans face these sounds disturbed by background noise,
                they can reduce the noise interference by adjusting their focus.`, html.br(),
            ])
        ),
        template.default_page(
            "Speech Enhancement",
            html.p({ class: ["text-base"], style: [css.tx.left(), css.p.t(15)] })([
                `It can even restore the damaged voice signal when understanding the speaker’s content.`, html.br(), html.br(),
                `Therefore, the research focus of this monograph will focus on how to use the attention mechanism and
                acoustic units to suppress the damage caused by noise and reconstruct clean speech.`,
            ])
        ),
    ]
})()