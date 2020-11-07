export const histogram = (img: Int32Array, width: number, height: number) => {
    let dis = new Array(256).fill(0);
    for (let i = 0; i < width * height; i++) {
        dis[img[i * 4]] += 1
    }
    console.log(dis)
}