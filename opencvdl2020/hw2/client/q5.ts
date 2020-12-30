// @ts-ignore
import recordSrc from "../tensorboard/record.png"
// @ts-ignore
import RERecordSrc from "../tensorboard/random_resize.png"
import * as g2 from "@antv/g2"

export const runQ5 = () => {
    {
        let img = document.createElement("img")
        img.src = recordSrc
        img.style.width = "100%"
        img.style.display = "none"
        document.body.appendChild(img)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "TensorBoard"
        button.classList.add("lg")
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            img.style.display = ""
            button.onclick = null
        }
    }
    let imgClass = Math.random() > 0.5 ? "Cat" : "Dog"
    let imgIdx = Math.floor(Math.random() * 12500)
    {
        let testImg = document.createElement("img")
        testImg.style.width = "100%"
        document.body.appendChild(testImg)
        document.body.appendChild(document.createElement("br"))
        let textarea = document.createElement("textarea")
        textarea.readOnly = true
        document.body.appendChild(textarea)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Randomly"
        button.classList.add("lg")
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            imgClass = Math.random() > 0.5 ? "Cat" : "Dog"
            imgIdx = Math.floor(Math.random() * 12500)
            fetch("http://localhost:5000/q5-img", {
                body: JSON.stringify({ class: imgClass, idx: imgIdx }),
                method: "POST",
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "user-agent": "Mozilla/4.0 MDN Example",
                    "content-type": "application/json",
                },
                mode: "cors", // no-cors, cors, *same-origin
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // *client, no-referrer
            })
                .then((response) => response.blob())
                .then((blob) => {
                    testImg.src = URL.createObjectURL(blob)
                    textarea.value = imgClass
                })
        }
    }
    {
        let img = document.createElement("img")
        img.style.width = "100%"
        document.body.appendChild(img)
        document.body.appendChild(document.createElement("br"))
        let textarea = document.createElement("textarea")
        textarea.readOnly = true
        document.body.appendChild(textarea)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Test"
        button.classList.add("lg")
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            fetch("http://localhost:5000/q5-test", {
                body: JSON.stringify({ class: imgClass, idx: imgIdx }),
                method: "POST",
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "user-agent": "Mozilla/4.0 MDN Example",
                    "content-type": "application/json",
                },
                mode: "cors", // no-cors, cors, *same-origin
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // *client, no-referrer
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if (json["pred"][0] > json["pred"][1]) {
                        textarea.value = "Cat"
                    } else {
                        textarea.value = "Dog"
                    }
                })
        }
    }
    {
        let img = document.createElement("img")
        img.style.width = "100%"
        document.body.appendChild(img)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Random Resize"
        button.classList.add("lg")
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            fetch("http://localhost:5000/q5-rs", {
                body: JSON.stringify({ class: imgClass, idx: imgIdx }),
                method: "POST",
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "user-agent": "Mozilla/4.0 MDN Example",
                    "content-type": "application/json",
                },
                mode: "cors", // no-cors, cors, *same-origin
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // *client, no-referrer
            })
                .then((response) => response.blob())
                .then((blob) => {
                    img.src = URL.createObjectURL(blob)
                })
        }
    }
    {
        const data = [
            { class: "Before Random-Erasing", acc: 0.7929586172103882 },
            { class: "After Random-Erasing", acc: 0.8527705669403076 },
        ]
        const chart = new g2.Chart({
            container: document.body,
            autoFit: false,
            width: 400,
            height: 300,
        })
        document.body.appendChild(document.createElement("br"))

        chart.data(data)

        chart.interval().position("class*acc")

        let img = document.createElement("img")
        img.src = RERecordSrc
        img.style.width = "100%"
        img.style.display = "none"
        document.body.appendChild(img)
        document.body.appendChild(document.createElement("br"))

        let button = document.createElement("button")
        button.innerText = "vs RE Acc"
        button.classList.add("lg")
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            chart.render()
            img.style.display = ""
            button.onclick = null
        }
    }
}
