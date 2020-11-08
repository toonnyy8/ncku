const histogram_mapping = (img: Int32Array, width: number, height: number, channel: number) => {
    let frequency = new Array(256).fill(0)
    let cutoff = width * height / 256
    for (let i = 0; i < width * height; i++) {
        frequency[img[i * 4 + channel]] += 1
    }
    let accumulation = 0
    let j = 0
    let mapping = new Array(256).fill(0)
    for (let i = 0; i < 256; i++) {
        mapping[i] = j
        accumulation += frequency[i]
        while (accumulation > cutoff * (j + 1)) j += 1
    }
    return mapping
}

export const histogram = (img: Int32Array, width: number, height: number) => {
    let mapping_red = histogram_mapping(img, width, height, 0)
    let mapping_green = histogram_mapping(img, width, height, 1)
    let mapping_blue = histogram_mapping(img, width, height, 2)

    let result_img = new Int32Array(width * height * 4)
    for (let i = 0; i < width * height; i++) {
        result_img[i * 4] = mapping_red[img[i * 4]]
        result_img[i * 4 + 1] = mapping_green[img[i * 4 + 1]]
        result_img[i * 4 + 2] = mapping_blue[img[i * 4 + 2]]
        result_img[i * 4 + 3] = 255
    }
    return result_img
}