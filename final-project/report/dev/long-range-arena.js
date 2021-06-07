///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const long_range_arena =
    (() => {
        const long_listOpt = [
            template.page3(0)(
                'Long Range Arena',
                'Task',
                'Long ListOpt',
                template.div_hc(0)([
                    html.table()([
                        html.tr()([
                            html.td({ style: [css.w.percent(50)] })([
                                html.ul({ style: [css.tx.left(), css.m.l(10)] })([
                                    html.li()([
                                        `Input`,
                                        html.br(),
                                        html.span({ style: [css.tx.color(100, 200, 255)] })`[`, `MAX 4 3`,
                                        html.br(),
                                        html.span({ style: [css.tx.color(255, 100, 100)] })`[`,
                                        'MIN 2 3',
                                        html.span({ style: [css.tx.color(255, 100, 100)] })`]`,
                                        html.br(),
                                        '1 0',
                                        html.br(),
                                        html.span({ style: [css.tx.color(255, 100, 100)] })`[`,
                                        'MEDIAN 1 5 8 9 2',
                                        html.span({ style: [css.tx.color(255, 100, 100)] })`]`,
                                        html.span({ style: [css.tx.color(100, 200, 255)] })`]`,
                                    ]),
                                    html.br(),
                                    html.li()([
                                        `Output：5`,
                                    ]),
                                    html.br(),
                                    html.li()([
                                        `Max Seq Len：2K`,
                                    ]),
                                ]),
                            ]),
                            html.td({ class: ["text-lg"], style: [css.w.percent(5)] })([
                            ]),
                            html.td({ class: ["text-lg"], style: [css.w.percent(45), css.tx.justify()] })([
                                "由 max、min、medium、sum_mod 這幾種運算組成的前序表達式作為輸入，其運算答案作為輸出。",
                            ])
                        ]),
                    ]),
                ])
            ),
        ]
        const text_classification = [
            template.page3(0)(
                'Long Range Arena',
                'Task',
                html.p({ class: ["text-xl"] })([
                    'Byte-Level Text',
                    html.br(),
                    'Classification',
                ]),
                template.div_hc(0)([
                    html.ul({ style: [css.tx.left(), css.m.l(40)] })([
                        html.li({ style: [css.m.b(5)] })`Dataset：IMDb reviews`,
                        html.li({ style: [css.m.b(5)] })`Binary Sentiment Classification`,
                        html.li({ style: [css.m.b(5)] })`Max Seq Len：4K`,
                    ])
                ])
            ),
        ]
        const document_retrieval = [
            template.page3(0)(
                'Long Range Arena',
                'Task',
                html.p({ class: ["text-xl"] })([
                    'Byte-Level',
                    html.br(),
                    'Document Retrieval',
                ]),
                template.div_hc(0)([
                    html.ul({ style: [css.tx.left(), css.m.l(40)] })([
                        html.li({ style: [css.m.b(5)] })`Dataset：ACL Anthology Network`,
                        html.li({ style: [css.m.b(5)] })`Two Tower Model, Not Cross-Attention`,
                        html.li({ style: [css.m.b(5)] })`Similarity Score`,
                        html.li({ style: [css.m.b(5)] })`Max Seq Len：4K & 4K`,
                    ])
                ])
            ),
            template.page3(0)(
                'Long Range Arena',
                'Task',
                html.p({ class: ["text-xl"] })([
                    'Byte-Level',
                    html.br(),
                    'Document Retrieval',
                ]),
                template.div_hc(0)([
                    html.table()([
                        html.tr()([
                            html.td({ style: [css.w.percent(51)] })([
                                "Two Tower",
                                html.br(),
                                html.img({ src: "./img/two-tower-models.png", style: [css.w.percent(100)] }),
                            ]),
                            html.td({ style: [css.w.percent(4)] })([
                            ]),
                            html.td({ style: [css.w.percent(45)] })([
                                "Cross Attention",
                                html.br(),
                                html.img({ src: "./img/cross-attention-models.png", style: [css.w.percent(100)] }),
                            ])
                        ]),
                    ]),


                ])
            ),
        ]
        const image_classification = [
            template.page3(0)(
                'Long Range Arena',
                'Task',
                html.p({ class: ["text-xl"] })([
                    'Image',
                    html.br(),
                    'Classification',
                ]),
                template.div_hc(0)([
                    html.ul({ style: [css.tx.left(), css.m.l(40)] })([
                        html.li({ style: [css.m.b(5)] })`Dataset：CIFAR-10`,
                        html.li({ style: [css.m.b(5)] })`Gray Scale to embedding index`,
                        html.li({ style: [css.m.b(5)] })`Vocabulary size of 256(=Gray Scale)`,
                        html.li({ style: [css.m.b(5)] })`Max Seq Len：1024 (32x32)`,
                    ])
                ])
            ),
        ]
        const pathfinder = [
            template.page3(0)(
                'Long Range Arena',
                'Task',
                'Pathfinder',
                template.div_hc(0)([
                    html.table()([
                        html.tr()([
                            html.td({ style: [css.w.percent(47.5)] })([
                                "Positive",
                                html.br(),
                                html.img({ src: "./img/Pathfinder-Positive.png", style: [css.w.percent(70)] })
                            ]),
                            html.td({ style: [css.w.percent(5)] })([
                            ]),
                            html.td({ style: [css.w.percent(47.5)] })([
                                "Negative",
                                html.br(),
                                html.img({ src: "./img/Pathfinder-Negative.png", style: [css.w.percent(70)] })
                            ])
                        ]),
                    ]),
                    html.br(),
                    "Max Seq Len：1024 (32x32)"
                ])
            ),
        ]
        return [
            template.page2(0)(
                'Long Range Arena',
                'Task',
                html.ol({ style: [css.m.l(20)] })([
                    html.li({ style: [css.m.b(5)] })`Long ListOpt`,
                    html.li({ style: [css.m.b(5)] })`Byte-Level Text Classification`,
                    html.li({ style: [css.m.b(5)] })`Byte-Level Document Retrieval`,
                    html.li({ style: [css.m.b(5)] })`Image Classification on Sequences of Pixels`,
                    html.li({ style: [css.m.b(5)] })`Pathfinder`,
                    html.li()([html.del()`Pathfinder-X`]),
                ])
            ),
            ...long_listOpt,
            ...text_classification,
            ...document_retrieval,
            ...image_classification,
            ...pathfinder,
        ]
    })()