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
    tf.loadLayersModel("./vgg16/model.json")
        .then(model => {
            let labelName = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]
            console.log(model)
        })
}