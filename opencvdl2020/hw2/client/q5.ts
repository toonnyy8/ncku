// @ts-ignore
import recordSrc from "../tensorboard/record.png"
// @ts-ignore
import RERecordSrc from "../tensorboard/random_resize.png"
import * as g2 from "@antv/g2"

export const runQ5 = () => {
    {
        let trainAccTxt = document.createElement("p")
        trainAccTxt.innerText = `
        train
100%|██████████| 78/78 [01:21<00:00,  1.05s/it]
100%|██████████| 78/78 [01:21<00:00,  1.05s/it]
100%|██████████| 78/78 [01:22<00:00,  1.06s/it]
100%|██████████| 78/78 [01:22<00:00,  1.06s/it]
train loss : 0.5328055468000312
train acc : 0.7650882601737976
test
100%|██████████| 78/78 [00:20<00:00,  3.79it/s]
test loss : 0.553736661274115
test acc : 0.748349666595459
train
100%|██████████| 78/78 [01:22<00:00,  1.06s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.46651674558731415
train acc : 0.8401920199394226
test
100%|██████████| 78/78 [00:21<00:00,  3.71it/s]
test loss : 0.5236516400357918
test acc : 0.778755784034729
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
train loss : 0.4255401241081322
train acc : 0.8833441734313965
test
100%|██████████| 78/78 [00:21<00:00,  3.69it/s]
test loss : 0.5233440323099181
test acc : 0.7799559831619263
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.40562253395726283
train acc : 0.9048952460289001
test
100%|██████████| 78/78 [00:21<00:00,  3.64it/s]
test loss : 0.541094995923318
test acc : 0.7627525925636292
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.39616140868969096
train acc : 0.9151957631111145
test
100%|██████████| 78/78 [00:21<00:00,  3.70it/s]
test loss : 0.5368264801479812
test acc : 0.767953634262085
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
train loss : 0.38323715021147825
train acc : 0.9276964068412781
test
100%|██████████| 78/78 [00:21<00:00,  3.70it/s]
test loss : 0.5286156367924147
test acc : 0.7763552665710449
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.37524637834591484
train acc : 0.9355468153953552
test
100%|██████████| 78/78 [00:21<00:00,  3.63it/s]
test loss : 0.5259327371851591
test acc : 0.7783557176589966
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.36942348866362806
train acc : 0.9420971274375916
test
100%|██████████| 78/78 [00:21<00:00,  3.70it/s]
test loss : 0.5240995361879364
test acc : 0.7809562087059021
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.09s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.36091143581156576
train acc : 0.9507975578308105
test
100%|██████████| 78/78 [00:21<00:00,  3.69it/s]
test loss : 0.5119828601304616
test acc : 0.7955591082572937
train
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
100%|██████████| 78/78 [01:24<00:00,  1.08s/it]
train loss : 0.3545462254870146
train acc : 0.9570478796958923
test
100%|██████████| 78/78 [00:21<00:00,  3.70it/s]test loss : 0.5145867317825538
test acc : 0.7929586172103882
`
        trainAccTxt.style.display = "none"
        document.body.appendChild(trainAccTxt)
        document.body.appendChild(document.createElement("br"))

        let button = document.createElement("button")
        button.innerText = "show train acc"
        button.classList.add("lg")
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            trainAccTxt.style.display = ""
        }
    }
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
