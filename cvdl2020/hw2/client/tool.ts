export const videoCapture = (video: HTMLVideoElement, fps: number) => {
    let isloaded = false
    const vc = {
        getFrame: (frameIdx: number) => {
            video.currentTime = Math.min(
                Math.max(0, (frameIdx / fps < 0 ? video.duration : 0) + frameIdx / fps),
                video.duration
            )
            return new Promise((resolve: (value: HTMLImageElement) => void) => {
                video.onseeked = () => {
                    const canvas = document.createElement("canvas")
                    canvas.height = video.videoHeight
                    canvas.width = video.videoWidth
                    const ctx = canvas.getContext("2d")
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    const img = new Image()
                    img.src = canvas.toDataURL()
                    resolve(img)
                }
            })
        },
        loaded: () => {
            if (!isloaded)
                return new Promise((resolve: (value?) => void) => {
                    video.onloadedmetadata = () => {
                        isloaded = true
                        resolve()
                    }
                })
            else
                return new Promise((resolve: (value?) => void) => {
                    resolve()
                })
        },
        getFrameNum: () => Math.floor(video.duration * fps),
    }
    return vc
}
