export function loadImage(url) {
    return new Promise((resolve: (value: HTMLImageElement) => void, reject) => {
        let img = new Image()
        img.addEventListener("load", (e) => resolve(img))
        img.addEventListener("error", () => {
            reject(new Error(`Failed to load image's URL: ${url}`))
        })
        img.src = url
    })
}
