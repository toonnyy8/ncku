///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const introduction = (() => {
    return [
        template.default_page(
            "Introduction",
            html.p({ class: ["text-base"] })([
                `Even in a noisy environment, as long as the listener can understand what the speaker is saying, the defective voice signal can be restored.`,
                html.br(), html.br(),
                `The author believes that this is the result of relying on the language knowledge possessed by humans.`, html.br(), html.br(),
                `In other words, with the aid of the language model, the damage caused by interference noise can be effectively suppressed.`, html.br(), html.br(),
            ])
        ), template.default_page(
            "Introduction",
            html.p({ class: ["text-base"] })([
                `Therefore, this paper attempts to use VQ-VAE's Symbolic Book to construct acoustic units, and then Transformer's Multi Head Attention (MHA) uses acoustic features to extract speech content to help improve the effect of Speech Enhancement.`
            ])
        ),
    ]
})()