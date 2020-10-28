import * as g2 from "@antv/g2"
import * as tf from "@tensorflow/tfjs"
import record from "../../model/record.json";

let test_batch: HTMLCanvasElement = document.createElement("canvas")
let model: tf.LayersModel
let labelName = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

document.getElementById('show-record').onclick = () => tf.tidy(() => {
    document.getElementById("record").innerHTML = ""

    {
        let title = document.createElement("h3")
        title.innerText = "Accuracy"
        document.getElementById("record").append(title)
        const chart = new g2.Chart({
            container: document.getElementById("record"),
            autoFit: false,
            width: 600,
            height: 300,
        });
        const view1 = chart.createView();
        const view2 = chart.createView();
        const accData = record.trainAcc.map((trainAcc, epoch) => ({ epoch, trainAcc, testAcc: record.testAcc[epoch] }))
        view1.data(accData)
            .line()
            .position('epoch*trainAcc')
            .style({
                stroke: '#5555ff'
            })
        view2.data(accData)
            .line()
            .position('epoch*testAcc')
            .style({
                stroke: '#ff5555'
            })
        chart.scale({
            trainAcc: {
                sync: 'value',
            },
            testAcc: {
                sync: 'value',
            },
        });
        chart.render()
    }

    document.getElementById("record").append(document.createElement("br"))

    {
        let title = document.createElement("h3")
        title.innerText = "Loss"
        document.getElementById("record").append(title)
        const chart = new g2.Chart({
            container: document.getElementById("record"),
            autoFit: false,
            width: 600,
            height: 300,
        });
        const view1 = chart.createView();
        const view2 = chart.createView();
        const lossData = record.trainLoss.map((trainLoss, epoch) => ({ epoch, trainLoss, testLoss: record.testLoss[epoch] }))
        view1.data(lossData)
            .line()
            .position('epoch*trainLoss')
            .style({
                stroke: '#5555ff'
            })
        view2.data(lossData)
            .line()
            .position('epoch*testLoss')
            .style({
                stroke: '#ff5555'
            })
        chart.scale({
            trainLoss: {
                sync: 'value',
            },
            testLoss: {
                sync: 'value',
            },
        });
        chart.render()
    }
})


document.getElementById('vgg16').onclick = () => {
    let loadModel = document.createElement("input")
    loadModel.type = "file"
    loadModel.multiple = true
    loadModel.accept = "application/json,.bin"

    loadModel.onchange = () => {
        Array.from(loadModel.files)
        const files = Array.from(loadModel.files)
        const modelJson = files.find(file => file.name.split(".").pop() == "json")
        const modelWeights = files.filter(file => file.name.split(".").pop() == "bin")

        tf.loadLayersModel(tf.io.browserFiles(
            [modelJson, ...modelWeights]))
            .then((_model) => {
                if (model != null) {
                    model.dispose()
                }
                model = _model
                model.summary(undefined, undefined, (m: string) => {
                    document.getElementById("model-summary")
                        .append(
                            ...m.split("\n")
                                .reduce((prev, curr) =>
                                    [...prev, curr, document.createElement("br")],
                                    [])
                        )
                })

            })
    }
    loadModel.click()
}

document.getElementById('load-train').onclick = () => {
    let loadLabels = document.createElement("input")
    loadLabels.type = "file"
    loadLabels.accept = "application/json"

    loadLabels.onchange = () => {
        const files = loadLabels.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {
            let labels = JSON.parse(<string>reader.result)

            let load = document.createElement("input")
            load.type = "file"
            load.accept = "image/png,image/jpeg,image/bmp"

            load.onchange = () => {
                const files = load.files
                var reader = new FileReader()
                reader.addEventListener("loadend", () => {
                    var img = new Image;
                    img.onload = () => tf.tidy(() => {
                        let indices = new Array<number>(10).fill(0).map(() => Math.floor(Math.random() * 10000))
                        let canvas = document.createElement("canvas")
                        canvas.width = img.width
                        canvas.height = img.height
                        let ctx = canvas.getContext("2d")
                        ctx.drawImage(img, 0, 0)
                        tf.browser.toPixels(
                            <tf.Tensor3D>tf.concat(
                                indices.map((labelIdx) => {
                                    return tf.browser
                                        .fromPixels(ctx.getImageData(0, labelIdx, canvas.width, 1))
                                        .reshape([32, 32, 3])
                                }),
                                1
                            ),
                            <HTMLCanvasElement>document.getElementById("train-set")
                        )
                        indices.forEach((labelIdx, idx) => {
                            document.getElementById(`img-${idx}`).innerText = labelName[labels[labelIdx]]
                        })
                    })
                    img.src = <string>reader.result;
                })

                reader.readAsDataURL(files[0])
            }
            load.click()
        })

        reader.readAsText(files[0])
    }
    loadLabels.click()
}

document.getElementById('show-hyperparameter').onclick = () => {
    let ul = document.createElement("ul")
    let bz = document.createElement("li")
    let lr = document.createElement("li")
    let op = document.createElement("li")
    bz.innerText = "batch size : 64"
    lr.innerText = "learning rate : 0.001"
    op.innerText = "optimizer : Adamax"

    ul.append(bz, lr, op)
    document.getElementById('hyperparameter').innerHTML = ""
    document.getElementById('hyperparameter').append(ul)
}


document.getElementById('load-test').onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {
            var img = new Image;
            img.onload = () => {
                test_batch.width = img.width
                test_batch.height = img.height
                let ctx = test_batch.getContext("2d")
                ctx.drawImage(img, 0, 0)
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

document.getElementById('test').onclick = () => tf.tidy(() => {
    if (model != null && test_batch != null) {
        let ctx = test_batch.getContext("2d")
        let test: tf.Tensor3D = tf.browser
            .fromPixels(ctx.getImageData(
                0,
                Number((<HTMLInputElement>document.getElementById("test-idx")).value),
                test_batch.width,
                1
            ))
            .reshape([32, 32, 3]);
        let prediction = (<tf.Tensor>model.predict(test.expandDims(0))).squeeze().arraySync()
        tf.browser.toPixels(test, <HTMLCanvasElement>document.getElementById("test-img"))
        document.getElementById("prediction").innerHTML = ""
        const chart = new g2.Chart({
            container: document.getElementById("prediction"),
            autoFit: false,
            width: 600,
            height: 300,
        });

        chart
            .data(
                labelName.map((label, idx) => ({ label, value: prediction[idx] }))
            )
            .interval()
            .position('label*value')
        chart.render()
    }
})
