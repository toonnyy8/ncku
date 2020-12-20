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

export const initTexture = (gl: WebGL2RenderingContext) => {
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // Because video has to be download over the internet
    // they might take a moment until it's ready so
    // put a single pixel in the texture so we can
    // use it immediately.
    const level = 0
    const internalFormat = gl.RGBA
    const width = 1
    const height = 1
    const border = 0
    const srcFormat = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    const pixel = new Uint8Array([0, 0, 255, 255]) // opaque blue
    gl.texImage2D(
        gl.TEXTURE_2D,
        level,
        internalFormat,
        width,
        height,
        border,
        srcFormat,
        srcType,
        pixel
    )

    // Turn off mips and set  wrapping to clamp to edge so it
    // will work regardless of the dimensions of the video.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

    return texture
}

export const updateTexture = (
    gl: WebGL2RenderingContext,
    texture: WebGLTexture,
    img: HTMLImageElement
) => {
    const level = 0
    const internalFormat = gl.RGBA
    const srcFormat = gl.RGBA
    const srcType = gl.UNSIGNED_BYTE
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, img)
}
