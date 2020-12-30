export const runQ3 = () => {
    let img = new Image()
    img.style.width = "600px"
    document.body.appendChild(img)
    document.body.appendChild(document.createElement("br"))
    let button = document.createElement("button")
    button.innerText = "Q3"
    document.body.appendChild(button)
    document.body.appendChild(document.createElement("br"))
    let idx = 0
    button.onclick = () => {
        fetch(`http://localhost:5000/q3/${idx + 1}.bmp`)
            .then((response) => response.url)
            .then((url) => {
                img.src = url
                if (idx == 4) idx = 0
                else idx += 1
            })
    }
}
