///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const conclusion = (() => {
    return [
        template.default_page(
            "Conclusion",
            html.div({ class: ["text-base"] })([
                html.p()([
                    `Use Symbolic Encoder to first encode speech into high-level phoneme-like content,
                    and extract features through Multi Head Attention,
                    which can achieve better results than before.`
                ])
            ]),
        ),
        template.default_page(
            "Conclusion",
            html.div({ class: ["text-base"] })([
                "Review：",
                html.ul()([
                    html.li()([
                        `The structure of Symbolic Encoder + Multi Head Attention is to establish a basic skeleton for speech (speaking content).`, html.br(), html.br(),
                    ]),
                    html.li()([
                        `U-Net's shortcut can assist in adding intonation information (tonal fluctuations, timbre, etc.) to the basic skeleton.`, html.br(), html.br(),
                    ]),
                    html.li()([
                        `In the second generation of VQ-VAE, you can try to use a multi-layer (multi-resolution) method to retain more acoustic features for the model`
                    ]),
                ]),
            ]),
        ),
    ]
})()