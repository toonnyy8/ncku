new Array(5).fill(0).forEach((_, idx) => {
    let canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    document.body.append(canvas)
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
    img.src = `./bmp/${idx + 1}.bmp`;
})
