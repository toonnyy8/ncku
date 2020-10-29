///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const introduction = (() => {
    return [
        template.default_page(
            "Introduction",
            html.p({ class: ["text-base"] })([
                `即使處於在吵雜的環境中，只要聽眾能理解講者的說話內容，就能恢復具有缺損的語音訊號。`,
                html.br(), html.br(),
                `作者認為，這是仰賴人類所擁有的語言知識達成的結果。`, html.br(),
                `也就是說，藉由語言模型的輔助，可以有效抑制干擾雜訊造成的破壞。`, html.br(), html.br(),
                `因此本篇論文嘗試使用 VQ-VAE 的 Symbolic Book 建構聲學單元，再由 Transformer 的 Multi Head Attention(MHA) 使用聲學特徵來提取說話內容，`,
                `幫助提升 Speech Enhancement 的效果。`
            ])
        ),
    ]
})()