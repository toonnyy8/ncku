///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const introduction = (() => {
    return [
        template.default_page(
            "Speech Enhancement",
            html.p({ class: ["text-base"], style: [css.tx.left(), css.p.t(15)] })([
                `現實世界中充滿了各式各樣的背景雜音，這些噪音會汙染語音訊號，`,
                `降低如 ASR、助聽器與其他語音任務的正確性。`, html.br(), html.br(),
                `然而人類在面對這些被背景雜訊干擾的聲音時，可以藉由調整注意力集中處來減低噪音的干擾。`, html.br(),
                `甚至能在理解講者的說話內容時，恢復受損的語音訊號。`, html.br(), html.br(),
                `因此，本次專論研究重點將會著重於如何使用注意力機制與聲學單元來抑制雜訊造成的破壞並重建乾淨的語音。`,
            ])
        ),
    ]
})()