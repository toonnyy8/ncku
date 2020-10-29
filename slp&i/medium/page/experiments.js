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
                        "語音：", template.a("https://github.com/philipperemy/timit")`TIMIT`, html.br(),
                    ]),
                    html.li()(["噪音：", template.a("http://web.cse.ohio-state.edu/pnl/corpus/HuNonspeech/HuCorpus.html")`PNL 100 Nonspeech Sounds`])
                ]),
                "將語音與噪音以不同的訊號雜訊比 (SNR, Signal-to-noise ratio) 混和後作為輸入，並將乾淨的語音作為 Ground Truth"
            ]),
        ),
        template.page2(10)(
            "Experiments",
            "Baseline Model",
            template.div_hc(0)([
                html.p({ class: ["text-lg"] })([
                    "論文中提出的方法與另外三組模型進行比較", html.br(),
                    "分別是 U-Net、U-Net-MOL 與 Oracle："
                ]),
                html.ol({ class: ["text-lg"], style: [css.p.l(40), css.tx.left()] })([
                    html.li()`U-Net${html.br()}單純的 U-Net`,
                    html.li()`U-Net-MOL
                    ${html.br()}
                    使用了 ${html.a({
                        href: "https://arxiv.org/pdf/1703.07172.pdf"
                    })`multi objective learning`} 的 U-Net`,
                    html.li()`Oracle${html.br()}
                    將原本的 Symbolic Encoder 換成輸入聲音的 phoneme(音素) embedding`,
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
                html.p({ class: ["text-base"], })([
                    "TIMIT 資料集內，除了語音以外也將每個時間點的音素都標記好了", html.br(),
                    html.span()`而 Oracle 就是將音素進行 Embedding 後作為 K${html.sub()`in`}、V${html.sub()`in`} 使用`, html.br(),
                ]),
                html.br(),
                html.img({ src: './img/experiments/phoneme.gif', style: [css.w.percent(100)] }),
                html.span({ class: ["text-lg"], })`音素範例 (${template.a("http://mirlab.org/jang/books/audioSignalProcessing/speechAssessment.asp?title=8-3%20%BBy%AD%B5%B5%FB%A4%C0")`來源`})`
            ]),
        ),
        template.page(0)(
            "Experiments",
            template.div_hc(0)([
                html.img({ src: './img/experiments/performance.png', style: [css.w.percent(100)] }),
                html.ol({ class: ["text-base"], style: [css.tx.left(), css.p.l(40)] })([
                    html.li()([
                        "使用了 Symbolic Encoder 與 MHA 的模型，效果比 Oracle 以外的 Baseline Model 更好",
                        html.br(),
                        html.br(),
                    ]),
                    html.li()([
                        "Oracle 證明了在 Speech Enhancement 的問題中加入音素資訊能夠提升模型的表現"
                    ])
                ])
            ]),
        ),
        template.page(0)(
            "Experiments",
            template.div_hc(0)([
                html.img({ src: './img/experiments/performance-booksize.png', style: [css.w.percent(50)] }),
                html.p({ class: ["text-base"] })([
                    "當 Book Size 過大時會出現「index collapse」", html.br(), html.br(),
                    "導致有部分的 symbolic vector 不會被使用到"
                ])
            ]),
        ),
        template.page(0)(
            "Experiments",
            html.table({ class: ["text-base"] })([
                html.tr()([
                    html.td({ style: [css.w.percent(50)] })([
                        html.img({ src: './img/experiments/chosen-times.png', style: [css.w.percent(100)] })
                    ]),
                    html.td({ style: [css.w.percent(10),] })([]),
                    html.td({ style: [css.w.percent(40),] })([
                        "橫軸是 Symbolic index", html.br(), html.br(),
                        "而上面每個值代表某個發音作為輸入時，",
                        "會被 mapping 到某個 Symbolic 的次數", html.br(), html.br(),
                        "當發音越相似，其分佈就越接近"
                    ]),
                ])
            ]),
        ),
        template.page(0)(
            "Experiments",
            html.table({ class: ["text-base"] })([
                html.tr()([
                    html.td({ style: [css.w.percent(50)] })([
                        html.img({ src: './img/experiments/phoneme-similarity.png', style: [css.w.percent(100)] })
                    ]),
                    html.td({ style: [css.w.percent(10),] })([]),
                    html.td({ style: [css.w.percent(40),] })([
                        "將各種發音的分佈進行相似度計算", html.br(), html.br(),
                        "有些不同的發音會得出相似的結果是因為輸入含有噪音的緣故"
                    ]),
                ])
            ]),
        ),
    ]
})()