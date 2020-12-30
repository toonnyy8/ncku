export const runQ3 = () => {
    let q3_video = document.createElement("video")
    q3_video.style.width = "100%"
    document.body.appendChild(q3_video)
    q3_video.loop = true

    let button = document.createElement("button")
    button.innerText = "Q3"
    document.body.appendChild(button)
    return fetch("http://localhost:5000/q3-video")
        .then((response) => {
            return response.blob()
        })
        .then((video_blob) => {
            console.log(video_blob)
            q3_video.src = URL.createObjectURL(video_blob)
            let play = false
            button.onclick = () => {
                play = !play
                if (play) {
                    q3_video.play()
                } else {
                    q3_video.pause()
                }
            }
        })
}
