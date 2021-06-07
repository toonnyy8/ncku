///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const efficient_transformers =
    (() => {
        const fixed_patterns = [
            template.page(0)(
                'Fixed Patterns',
                template.div_hc(0)([
                    html.img({ src: './img/Fixed-Patterns.png', style: [css.w.percent(55)] }),
                ]),
            ),
            template.page2(0)(
                'Fixed',
                "Image Transformer",
                template.div_hc(0)([
                    html.table()([
                        html.tr()([
                            html.td({ style: [css.w.percent(60)] })([
                                html.img({ src: './img/Image-Transformer.png', style: [css.w.percent(80)] }),
                            ]),
                            html.td({ class: ["text-lg"], style: [css.tx.justify()] })([
                                html.p()`Fixed Patterns 利用只計算部分區域間的注意力權重，來降低計算量。`,
                            ])
                        ]),
                    ]),
                ]),
            ),
        ]
        const learnable_patterns = [
            template.page(0)(
                'Learnable Patterns',
                template.div_hc(0)([
                    html.img({ src: './img/Learnable-Patterns.png', style: [css.w.percent(55)] }),
                ]),
            ),
            template.page3(0)(
                'Learnable',
                "Reformer",
                "Sort",
                template.div_hc(0)([
                    html.img({ src: './img/Reformer-sort.png', style: [css.w.percent(90)] }),
                    html.p({ class: ["text-lg"] })([
                        "依據每個 key、query 的相似度，將其分組",
                        html.ul({ style: [css.tx.left(), css.p.l(40)] })([
                            html.li()`在 Reformer 中使用 Locality Sensitive Hash 分組`,
                            html.li()`Routing Transformer 則是用 k-means 分組`
                        ]),
                    ])

                ]),
            ),
            template.page3(0)(
                'Learnable',
                "Reformer",
                "Attention",
                template.div_hc(0)([
                    html.img({ src: './img/Reformer-attention.png', style: [css.w.percent(90)] }),
                    html.p({ class: ["text-lg"] })([
                        "進行組內的 Self Attention",
                        html.br(),
                        html.br(),
                        `不同組代表`,
                        html.span({ style: [css.tx.color(255, 100, 100)] })`相似度低`,
                        `，沒有互相匹配的必要`
                    ])
                ]),
            ),
        ]
        const memory = [
            template.page(0)(
                'Memory',
                template.div_hc(0)([
                    html.img({ src: './img/Memory.png', style: [css.w.percent(55)] }),
                ]),
            ),
            template.page2(0)(
                'Memory',
                "Set Transformer",
                template.div_hc(0)([
                    html.img({ src: './img/Set-Transformer.png', style: [css.w.percent(100)] }),

                ]),
            ),
            template.page2(0)(
                'Memory',
                "Global Attention",
                template.div_hc(0)([
                    html.img({ src: './img/Global-Attention.png', style: [css.w.percent(80)] }),

                ]),
            ),
            template.page2(0)(
                'Memory',
                "Big Bird",
                template.div_hc(0)([
                    html.img({ src: './img/BigBird.png', style: [css.w.percent(100)] }),

                ]),
            ),
        ]
        const low_rank = [
            template.page(0)(
                'Low Rank & Kernel',
                template.div_hc(0)([
                    html.img({ src: './img/Low-Rank.png', style: [css.w.percent(55)] }),
                ]),
            ),
            template.page2(0)(
                html.div()(['Low Rank', html.br(), '& Kernel']),
                "No Attention Matrix",
                template.div_hc(0)([
                    html.img({ src: './img/Low-Rank-1.png', style: [css.w.percent(65)] }),

                ]),
            ),
            template.page2(0)(
                html.div()(['Low Rank', html.br(), '& Kernel']),
                "Linformer",
                template.div_hc(0)([
                    html.img({ src: './img/Linformer.png', style: [css.w.percent(100)] }),

                ]),
            ),
            template.page2(0)(
                html.div()(['Low Rank', html.br(), '& Kernel']),
                html.div({ style: [css.tx.left(), css.p.l(70)] })(['Linear Transformer', html.br(), 'Performer']),
                template.div_hc(0)([
                    html.img({ src: './img/Linear-Transformer.png', style: [css.w.percent(95)] }),

                ]),
            ),
        ]
        const recurrence = [
            template.page(0)(
                'Recurrence',
                template.div_hc(0)([
                    html.img({ src: './img/Recurrence.png', style: [css.w.percent(55)] }),
                ]),
            ),
            template.page2(0)(
                'Recurrence',
                'Transformer XL',
                template.div_hc(0)([
                    html.img({ src: './img/Recurrence-1.png', style: [css.w.percent(70)] }),
                ]),
            ),
            template.page2(0)(
                'Recurrence',
                'Transformer XL',
                template.div_hc(0)([
                    html.img({ src: './img/Recurrence-2.png', style: [css.w.percent(70)] }),
                ]),
            ),
            template.page2(0)(
                'Recurrence',
                'Transformer XL',
                template.div_hc(0)([
                    html.img({ src: './img/Recurrence-3.png', style: [css.w.percent(70)] }),
                ]),
            ),
            template.page2(0)(
                'Recurrence',
                'Compressive Transformer',
                template.div_hc(0)([
                    html.img({ src: './img/Compressive-Transformer.png', style: [css.w.percent(100)] }),
                ]),
            ),
        ]
        const shortcomings = [
            template.page(0)(
                "Shortcomings",
                template.div_hc(0)([
                    html.ul({ style: [css.tx.left(), css.p.l(30)] })([
                        html.li()([
                            `Fixed Patterns`,
                            html.ul()([
                                html.li()([
                                    html.span({ style: [css.tx.color(100, 200, 255)] })`固定的關注區塊`,
                                    '很容易出現',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`資訊缺失`,
                                    '的狀況。'
                                ])
                            ])
                        ]),
                        html.br(),
                        html.li()([
                            `Learnable Patterns`,
                            html.ul()([
                                html.li()([
                                    '在',
                                    html.span({ style: [css.tx.color(100, 200, 255)] })`分組的過程`,
                                    '中會產生 overhead，導致',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`計算速度`,
                                    '無法提升。'
                                ])
                            ])
                        ]),
                        html.br(),
                        html.li()([
                            `Memory`,
                            html.ul()([
                                html.li()([
                                    '因',
                                    html.span({ style: [css.tx.color(100, 200, 255)] })`壓縮上下文資訊`,
                                    '，無法直接應用於',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`自回歸任務`,
                                    '。'
                                ]),
                                html.li()([
                                    '且壓縮亦會造成',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`資訊缺損`,
                                    '。'
                                ]),
                            ])
                        ])
                    ])
                ]),
            ),
            template.page(0)(
                "Shortcomings",
                template.div_hc(0)([
                    html.ul({ style: [css.tx.left(), css.p.l(30)] })([
                        html.li()([
                            `Low Rank & Kernel`,
                            html.ul()([
                                html.li()([
                                    '難以在自回歸任務實施',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`平行化訓練`,
                                    '。'
                                ]),
                                html.br(),
                                html.li()([
                                    'Performer query 與 key 經過轉換後',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`需要更大的 depth`,
                                    ' 才能維持正確率。',
                                ]),
                                html.br(),
                                html.li()([
                                    'Linformer 將 keys&values 的長度 L 壓縮至 k，但為了保持正確率，',
                                    html.span({ style: [css.tx.color(255, 100, 100)] })`k 大小還是與 L 有關`,
                                    '。'
                                ])
                            ])
                        ]),
                    ])
                ]),
            ),
        ]
        return [
            html.page()([
                template.div_hc(0)([
                    html.img({ src: './img/Taxonomy-of-Efficient-Transformer-Architectures.png', style: [css.w.percent(85)] }),
                ]),
            ]),
            ...fixed_patterns,
            ...learnable_patterns,
            ...memory,
            ...low_rank,
            ...recurrence,
            ...shortcomings,
        ]
    })()