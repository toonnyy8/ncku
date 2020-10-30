///<reference path="../src/html.js">
///<reference path="../src/css.js">
///<reference path="./template.js">

const introduction = (() => {
    return [
        template.default_page(
            "Speech Enhancement",
            html.p({ class: ["text-base"] })([
                html.ol()([
                    html.li()`Why`
                ]),
                `即使處於在吵雜的環境中，只要聽眾能理解講者的說話內容，就能恢復具有缺損的語音訊號。`,
            ])
        ),
    ]
})()