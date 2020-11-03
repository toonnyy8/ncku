// import * as tf from "@tensorflow/tfjs"
// tf.setBackend("cpu")

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
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
{
    /**
     * @type {HTMLInputElement}
     */
    const q1 = document.getElementById("Q1-1-idx")
    q1.onchange = () => {
        console.log(q1.value)
        fetch(`${window.origin}/Q1/1`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include', // include, same-origin, *omit
            body: `{"idx":${q1.value}}`, // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: new Headers({
                'content-type': 'application/json'
            }),
        })
            .then(response => response.json())
            .then(val => tf.tidy(() => {
                // let img = new Image();
                // img.src = "data:image/png;base64," + val["img"];
                // document.body.append(img)

                console.log(val)
                let c = document.getElementById("c")
                imgt = tf.tensor(val["img"], [512, 512, 3], "int32")
                tf.browser.toPixels(imgt, c)
                // document.body.append(c)
            }))
    }
}