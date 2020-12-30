export const runQ2 = () => {
    {
        let img = new Image()
        img.style.width = "600px"
        document.body.appendChild(img)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Q2-1"
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        let idx = 0
        button.onclick = () => {
            fetch(`http://localhost:5000/q2/corner_${idx + 1}.bmp`)
                .then((response) => response.url)
                .then((url) => {
                    img.src = url
                    if (idx == 14) idx = 0
                    else idx += 1
                })
        }
    }
    {
        let textarea = document.createElement("textarea")
        textarea.style.width = "100%"
        document.body.appendChild(textarea)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Q2-2"
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        let idx = 0
        button.onclick = () => {
            fetch(`http://localhost:5000/q2-intrinsic`)
                .then((response) => response.json())
                .then((json) => {
                    textarea.value = JSON.stringify(json["out"])
                })
        }
    }
    {
        let textarea = document.createElement("textarea")
        textarea.style.width = "100%"
        document.body.appendChild(textarea)
        document.body.appendChild(document.createElement("br"))
        let input = document.createElement("input")
        input.type = "number"
        input.min = "1"
        input.max = "15"
        input.value = "1"
        document.body.appendChild(input)
        document.body.appendChild(document.createElement("br"))
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Q2-3"
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        button.onclick = () => {
            fetch(`http://localhost:5000/q2-extrinsic`, {
                body: JSON.stringify({ idx: Number(input.value) - 1 }), // must match 'Content-Type' header
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "user-agent": "Mozilla/4.0 MDN Example",
                    "content-type": "application/json",
                },
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // *client, no-referrer
            })
                .then((response) => response.json())
                .then((json) => {
                    textarea.value = JSON.stringify(json["out"])
                })
        }
    }
    {
        let textarea = document.createElement("textarea")
        textarea.style.width = "100%"
        document.body.appendChild(textarea)
        document.body.appendChild(document.createElement("br"))
        let button = document.createElement("button")
        button.innerText = "Q2-4"
        document.body.appendChild(button)
        document.body.appendChild(document.createElement("br"))
        let idx = 0
        button.onclick = () => {
            fetch(`http://localhost:5000/q2-distortion`)
                .then((response) => response.json())
                .then((json) => {
                    textarea.value = JSON.stringify(json["out"])
                })
        }
    }
}
