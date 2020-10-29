///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const experiments = (() => {
    return [
        template.page(10)(
            "Experiments",
            html.ul({ class: ["text-lg"], style: [css.p.l(70), css.tx.left()] })([
                html.li()([
                    "Sample rate：16kHz"
                ]),
                html.li()([
                    "Hamming window",
                    html.ul()([
                        html.li()([
                            "size：512"
                        ]),
                        html.li()([
                            "stride：256"
                        ]),
                    ])
                ]),
                html.li()([
                    "Input frame：64"
                ]),
                html.li()([
                    "Optimizer：Adam",
                    html.ul()([
                        html.li()([
                            "learning rate：0.0001"
                        ]),
                        html.li()([
                            "beta 1：0.5"
                        ]),
                        html.li()([
                            "beta 9：0.9"
                        ]),
                    ])
                ]),
            ])
        ),
        template.page2(0)(
            "Experiments",
            "Data Set",
            html.div({ class: ["text-lg"] })([
                html.ul({ style: [css.p.l(60)] })([
                    html.li()([
                        "Speech：", template.a("https://github.com/philipperemy/timit")`TIMIT`, html.br(),
                    ]),
                    html.li()(["Noise：", template.a("http://web.cse.ohio-state.edu/pnl/corpus/HuNonspeech/HuCorpus.html")`PNL 100 Nonspeech Sounds`])
                ]),
                "The voice and noise are mixed with different signal-to-noise ratio (SNR) as input, and the clean voice is used as ground truth."
            ]),
        ),
        template.page2(10)(
            "Experiments",
            "Baseline Model",
            template.div_hc(0)([
                html.ol({ class: ["text-lg"], style: [css.p.l(40), css.tx.left()] })([
                    html.li()`U-Net${html.br()}Just a U-Net.`, html.br(),
                    html.li()`U-Net-MOL${html.br()}using ${html.a({
style: [css.tx.color(255, 235, 205)],
href: "https://arxiv.org/pdf/1703.07172.pdf"
})`multi objective learning`}.`, html.br(),
                    html.li()`Oracle${html.br()}Replace Symbolic Encoder with phoneme (phoneme) embedding of input speech.`,
                ])
            ])
        ),
        template.page3(10)(
            "Experiments",
            "Baseline Model",
            "Oracle",
            template.div_hc(0)([html.img({ src: './img/experiments/oracle.png', style: [css.w.percent(100)] })]),
        ),
        template.page3(10)(
            "Experiments",
            "Baseline Model",
            "Oracle",
            template.div_hc(0)([
                html.p({ class: ["text-base"], style: [css.tx.left()] })([
                    "In the TIMIT data set, in addition to speech, the phonemes at each time point are also marked.", html.br(), html.br(),
                    html.span()`Oracle embeds the phonemes as the input of MHA's Key and value.`, html.br(),
                ]),
                html.br(),
                html.img({ src: './img/experiments/phoneme.gif', style: [css.w.percent(100)] }),
                html.span({ class: ["text-lg"], })`Phoneme example
(${template.a("http://mirlab.org/jang/books/audioSignalProcessing/speechAssessment.asp?title=8-3%20%BBy%AD%B5%B5%FB%A4%C0")`source`})`
            ]),
        ),
        template.page(0)(
            "Experiments",
            template.div_hc(0)([
                html.img({ src: './img/experiments/performance.png', style: [css.w.percent(100)] }),
                html.ol({ class: ["text-base"], style: [css.tx.left(), css.p.l(40)] })([
                    html.li()([
                        "Models using Symbolic Encoder and MHA have better results than Baseline Models other than Oracle.",
                        html.br(),
                        html.br(),
                    ]),
                    html.li()([
                        "Oracle proved that adding phoneme information to the Speech Enhancement question can improve the performance of the model."
                    ])
                ])
            ]),
        ),
        template.page(0)(
            "Experiments",
            template.div_hc(0)([
                html.img({ src: './img/experiments/performance-booksize.png', style: [css.w.percent(50)] }),
                html.p({ class: ["text-base"] })([
                    "\"Index collapse\" will appear when the Book Size is too large.", html.br(), html.br(),
                    "As a result, part of the symbolic vector will not be used."
                ])
            ]),
        ),
        template.page(0)(
            "Experiments",
            html.table({ class: ["text-base"] })([
                html.tr()([
                    html.td({ style: [css.w.percent(45)] })([
                        html.img({ src: './img/experiments/chosen-times.png', style: [css.w.percent(100)] })
                    ]),
                    html.td({ style: [css.w.percent(5),] })([]),
                    html.td({ style: [css.w.percent(50),] })([
                        "The horizontal axis represents Symbolic index.", html.br(), html.br(),
                        "And each value above represents the number of times the pronunciation corresponds to a certain Symbolic.", html.br(), html.br(),
                        "Similar pronunciations have similar distributions."
                    ]),
                ])
            ]),
        ),
        template.page(0)(
            "Experiments",
            html.table({ class: ["text-base"] })([
                html.tr()([
                    html.td({ style: [css.w.percent(45)] })([
                        html.img({ src: './img/experiments/phoneme-similarity.png', style: [css.w.percent(100)] })
                    ]),
                    html.td({ style: [css.w.percent(5),] })([]),
                    html.td({ style: [css.w.percent(50),] })([
                        "Calculate the similarity of pronunciation distribution.", html.br(), html.br(),
                        "Some different pronunciations will give similar results because the input contains noise."
                    ]),
                ])
            ]),
        ),
    ]
})()