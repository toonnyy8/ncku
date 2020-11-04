// import * as tf from "@tensorflow/tfjs"
// tf.setBackend("cpu")

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0;i < len;i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}
// document.getElementById("upload").onclick = () => {
//     let load = document.createElement("input")
//     load.type = "file"
//     load.accept = "image/png, image/jpeg"

//     load.onchange = (event) => {
//         const files = load.files
//         var reader = new FileReader()
//         reader.addEventListener("loadend", () => {

//             fetch(`${window.origin}/json`, {
//                 method: 'POST', // *GET, POST, PUT, DELETE, etc.
//                 credentials: 'include', // include, same-origin, *omit
//                 body: JSON.stringify({ img: reader.result.split(",")[1] }), // must match 'Content-Type' header
//                 cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//                 headers: new Headers({
//                     'content-type': 'application/json'
//                 }),
//             })
//                 .then(response => response.json())
//                 .then(val => {
//                     // let img = new Image();
//                     // img.src = val;
//                     // document.body.append(img)
//                     console.log(val)
//                     let c = document.getElementById("c")
//                     imgt = tf.tensor(new Uint8Array(_base64ToArrayBuffer(val["img"])), [512, 512, 3])
//                     tf.browser.toPixels(imgt, c)
//                     document.body.append(c)
//                 })
//         })

//         reader.readAsDataURL(files[0])
//         // reader.readAsArrayBuffer(files[0])
//     }

//     load.click()
// }

fetch(`${window.origin}/Q1/1`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)

        /**
         * @type {tf.Tensor3D[]}
         */
        const q1_imgs = val["corner_imgs"].map(corner_img => tf.keep(tf.tensor(corner_img, [512, 512, 3], "int32")))


        /**
         * @type {HTMLInputElement}
         */
        const q1_1 = document.getElementById("Q1-1-idx")
        q1_1.onchange = () => {
            let idx = Number(q1_1.value)
            /**
             * @type {HTMLCanvasElement}
             */
            let c = document.getElementById("Q1-1-canvas")
            tf.browser.toPixels(q1_imgs[idx - 1], c)
        }
        q1_1.onchange()
    }))


fetch(`${window.origin}/Q1/2`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)

        /**
         * @type {HTMLInputElement}
         */
        const q1_2 = document.getElementById("Q1-2")
        q1_2.onclick = () => {
            document.getElementById("Q1-2-mtx").innerHTML = ""
            document.getElementById("Q1-2-mtx").append(renderjson(val["mtx"].map(arr => JSON.stringify(arr))))
        }
    }))

fetch(`${window.origin}/Q1/3`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)

        /**
         * @type {HTMLInputElement}
         */
        const q1_3 = document.getElementById("Q1-3-idx")
        q1_3.onchange = () => {
            let idx = Number(q1_3.value)
            document.getElementById("Q1-3-mtx").innerHTML = ""
            document.getElementById("Q1-3-mtx").append(renderjson(val["mtxs"][idx].map(arr => JSON.stringify(arr))))
        }
        q1_3.onchange()
    }))

fetch(`${window.origin}/Q1/4`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)

        /**
         * @type {HTMLInputElement}
         */
        const q1_4 = document.getElementById("Q1-4")
        q1_4.onclick = () => {
            document.getElementById("Q1-4-dist").innerHTML = ""
            document.getElementById("Q1-4-dist").append(renderjson(val["dist"][0]))
        }
    }))

fetch(`${window.origin}/Q2`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)

        /**
         * @type {tf.Tensor3D[]}
         */
        const q2_imgs = val["imgs"].map(img => tf.keep(tf.tensor(img, [512, 512, 3], "int32")))


        /**
         * @type {HTMLInputElement}
         */
        const q2 = document.getElementById("Q2-idx")
        q2.onchange = () => {
            let idx = Number(q2.value)
            /**
             * @type {HTMLCanvasElement}
             */
            let c = document.getElementById("Q2-canvas")
            tf.browser.toPixels(q2_imgs[idx - 1], c)
        }
        q2.onchange()
    }))

fetch(`${window.origin}/Q3`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)
        let t = tf.tensor(val["img"], [225, 300, 1])
        let max = t.max()
        let min = t.min()
        /**
         * @type {tf.Tensor3D[]}
         */
        const q3_img = tf.keep(t.sub(min).div(max.sub(min)))


        /**
         * @type {HTMLInputElement}
         */
        const q3 = document.getElementById("Q3")
        q3.onclick = () => {
            /**
             * @type {HTMLCanvasElement}
             */
            let c = document.getElementById("Q3-canvas")
            tf.browser.toPixels(q3_img, c)
        }
    }))

fetch(`${window.origin}/Q4/1`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)
        /**
         * @type {tf.Tensor3D[]}
         */
        const q4_img1 = tf.keep(tf.tensor(val["img1"], [806, 604, 3], "int32"))
        const q4_img2 = tf.keep(tf.tensor(val["img2"], [806, 604, 3], "int32"))

        /**
         * @type {HTMLInputElement}
         */
        const q4 = document.getElementById("Q4-1")
        q4.onclick = () => {
            /**
             * @type {HTMLCanvasElement}
             */
            let c = document.getElementById("Q4-1-canvas")
            tf.browser.toPixels(tf.concat([q4_img1, q4_img2], 1), c)
        }
    }))



fetch(`${window.origin}/Q4/2`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, same-origin, *omit
    body: ``, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: new Headers({
        'content-type': 'application/json'
    }),
})
    .then(response => response.json())
    .then(val => tf.tidy(() => {
        console.log(val)
        /**
         * @type {tf.Tensor3D[]}
         */
        const q4_matching_img = tf.keep(tf.tensor(val["matching_img"], [806, 604 * 2, 3], "int32"))

        /**
         * @type {HTMLInputElement}
         */
        const q4_2 = document.getElementById("Q4-2")
        q4_2.onclick = () => {
            /**
             * @type {HTMLCanvasElement}
             */
            let c = document.getElementById("Q4-2-canvas")
            tf.browser.toPixels(q4_matching_img, c)
        }
    }))


{
    let labelName = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

    /**
     * @type {HTMLButtonElement}
     */
    const q5_1 = document.getElementById("Q5-1")
    q5_1.onclick = () => {
        let indices = new Array(10).fill(0).map(() => Math.floor(Math.random() * 50000))
        fetch(`${window.origin}/Q5/1`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, same-origin, *omit
            body: `{"indices":${JSON.stringify(indices)}}`, // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: new Headers({
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(val => tf.tidy(() => {
                console.log(val)
                /**
                 * @type {tf.Tensor3D[]}
                 */
                const imgs = val["imgs"].map(img => tf.tensor(img, undefined, "int32").reshape([32, 32, 3]))

                let c = document.getElementById("Q5-1-canvas")
                tf.browser.toPixels(tf.concat(imgs, 1), c)

                val["lables"].map((lable, idx) => document.getElementById(`Q5-1-img-${idx}`).innerText = labelName[lable])
            }))
    }

    /**
     * @type {HTMLButtonElement}
     */
    const q5_2 = document.getElementById("Q5-2")
    q5_2.onclick = () => {
        let ul = document.createElement("ul")
        let bz = document.createElement("li")
        let lr = document.createElement("li")
        let op = document.createElement("li")
        bz.innerText = "batch size : 64"
        lr.innerText = "learning rate : 0.001"
        op.innerText = "optimizer : Adamax"

        ul.append(bz, lr, op)
        document.getElementById('Q5-2-hyperparameter').innerHTML = ""
        document.getElementById('Q5-2-hyperparameter').append(ul)
    }


    tf.loadLayersModel("./vgg16/model.json")
        .then(model => {
            console.log(model)

            /**
             * @type {HTMLButtonElement}
             */
            const q5_3 = document.getElementById("Q5-3")
            q5_3.onclick = () => {
                document.getElementById("Q5-3-model").innerHTML = ""
                model.summary(undefined, undefined, (m) => {

                    document.getElementById("Q5-3-model")
                        .append(
                            ...m.split("\n")
                                .reduce((prev, curr) =>
                                    [...prev, curr, document.createElement("br")],
                                    [])
                        )
                })
            }


            /**
             * @type {HTMLInputElement}
             */
            const q5_5 = document.getElementById("Q5-5")
            q5_5.onchange = () => {

                fetch(`${window.origin}/Q5/5`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    credentials: 'include', // include, same-origin, *omit
                    body: `{"idx":${Number(q5_5.value)}}`, // must match 'Content-Type' header
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    headers: new Headers({
                        'content-type': 'application/json'
                    }),
                })
                    .then(response => response.json())
                    .then(val => {
                        console.log(val)
                        let img = tf.tensor(val["img"], undefined, "int32").reshape([32, 32, 3])

                        let c = document.getElementById("Q5-5-canvas")
                        tf.browser.toPixels(img, c)

                        let prediction = (model.predict(img.expandDims(0))).squeeze().arraySync()
                        document.getElementById("Q5-5-prediction").innerHTML = ""
                        const chart = new G2.Chart({
                            container: document.getElementById("Q5-5-prediction"),
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
                    })
            }
            q5_5.onchange()

        })


    fetch(`${window.origin}/Q5/4`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, same-origin, *omit
        body: ``, // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: new Headers({
            'content-type': 'application/json'
        }),
    })
        .then(response => response.json())
        .then(record => {
            /**
             * @type {HTMLButtonElement}
             */
            const q5_4 = document.getElementById("Q5-4")
            q5_4.onclick = () => {
                document.getElementById("Q5-4-record").innerHTML = ""

                {
                    let title = document.createElement("h3")
                    title.innerText = "Accuracy"
                    document.getElementById("Q5-4-record").append(title)
                    const chart = new G2.Chart({
                        container: document.getElementById("Q5-4-record"),
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

                document.getElementById("Q5-4-record").append(document.createElement("br"))

                {
                    let title = document.createElement("h3")
                    title.innerText = "Loss"
                    document.getElementById("Q5-4-record").append(title)
                    const chart = new G2.Chart({
                        container: document.getElementById("Q5-4-record"),
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
            }

        })
}

// {
//     tf.loadLayersModel("./vgg16/model.json")
//         .then(model => {
//             let labelName = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]
//             console.log(model)
//         })
// }