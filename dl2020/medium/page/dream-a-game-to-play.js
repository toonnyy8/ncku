///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const dream_a_game_to_play = (() => {
    return [
        template.default_page(
            "Dream a game to play",
            html.p({ class: ["text-base"], style: [css.tx.left(), css.p.t(15)] })([
                `人類可以將玩過的遊戲在腦海中再現出來。`, html.br(),
                `運氣好的話還可以夢到自己在打電動。`, html.br(), html.br(),
                `那如果用類神經網路來重現這個能力不就等同，我可以用它來複製一份遊戲出來(危險發言)。`, html.br(),
                `而且這份複製出來的遊戲還能夠「跨平台」(重點)。`, html.br(), html.br(),
                `因此本次實驗將會使用類似 World Model 的結構，嘗試將無隨機系統的自製小型格鬥遊戲複製出來。`
            ])
        ),
        template.page(0)(
            "Dream a game to play",
            html.div({ style: [css.tx.center(), css.p.t(15)] })([
                html.img({
                    src: "./img/ftg.png",
                    style: [css.w.percent(70)]
                })
            ]),
        ),
    ]
})()