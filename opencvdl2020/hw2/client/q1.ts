export const runQ1 = () => {
    let img1 = new Image()
    document.body.appendChild(img1)
    document.body.appendChild(document.createElement("br"))
    let img2 = new Image()
    document.body.appendChild(img2)
    document.body.appendChild(document.createElement("br"))
    let button1 = document.createElement("button")
    button1.innerText = "Q1-1"
    document.body.appendChild(button1)
    document.body.appendChild(document.createElement("br"))
    button1.onclick = () => {
        fetch("http://localhost:5000/q1/edge_coin01.jpg")
            .then((response) => response.url)
            .then((url) => {
                img1.src = url
                return fetch("http://localhost:5000/q1/edge_coin02.jpg")
            })
            .then((response) => response.url)
            .then((url) => {
                img2.src = url
            })
    }

    let texture = document.createElement("textarea")
    texture.style.width = "100%"
    document.body.appendChild(texture)
    document.body.appendChild(document.createElement("br"))
    texture.value = `There are _ coins in coin01.jpg
There are _ coins in coin01.jpg`
    let button2 = document.createElement("button")
    button2.innerText = "Q1-2"
    document.body.appendChild(button2)
    document.body.appendChild(document.createElement("br"))
    button2.onclick = () => {
        fetch("http://localhost:5000/q1-inf")
            .then((response) => response.json())
            .then((json) => {
                texture.value = `There are ${json["coin01"]} coins in coin01.jpg
There are ${json["coin02"]} coins in coin01.jpg`
            })
    }
}
