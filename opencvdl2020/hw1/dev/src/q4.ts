

document.getElementById("q4-1b").onclick = () => {
    let load = document.createElement("input")
    load.type = "file"
    load.accept = "image/png,image/jpeg,image/bmp"

    load.onchange = () => {
        const files = load.files
        var reader = new FileReader()
        reader.addEventListener("loadend", () => {

            const canvas = <HTMLCanvasElement>document.getElementById("q4-1c")
            const ctx = canvas.getContext("2d")
            var img = new Image;
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height

                    ; (<HTMLInputElement>document.getElementById("Cx")).max = `${img.height}`
                    ; (<HTMLInputElement>document.getElementById("Cy")).max = `${img.width}`
                const Cx = () => Number((<HTMLInputElement>document.getElementById("Cx")).value)
                const Cy = () => Number((<HTMLInputElement>document.getElementById("Cy")).value)
                const r = () => Number((<HTMLInputElement>document.getElementById("rotation")).value)
                const s = () => Number((<HTMLInputElement>document.getElementById("scaling")).value)
                const Tx = () => Number((<HTMLInputElement>document.getElementById("Tx")).value)
                const Ty = () => Number((<HTMLInputElement>document.getElementById("Ty")).value)
                const clear = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = `#000`
                    ctx.fill()
                }
                const draw = () => {
                    ctx.save()
                    ctx.translate(Cx() + Tx(), Cy() + Ty());
                    ctx.scale(s(), s())
                    ctx.rotate((-r() / 180) * Math.PI);
                    ctx.drawImage(img, -Cx(), -Cy());
                    ctx.restore()
                }
                const update = () => {
                    clear()
                    draw()
                }
                document.getElementById("Cx").onchange = update
                document.getElementById("Cy").onchange = update
                document.getElementById("rotation").onchange = update
                document.getElementById("scaling").onchange = update
                document.getElementById("Tx").onchange = update
                document.getElementById("Ty").onchange = update


                document.getElementById("Cx").oninput = update
                document.getElementById("Cy").oninput = update
                document.getElementById("rotation").oninput = update
                document.getElementById("scaling").oninput = update
                document.getElementById("Tx").oninput = update
                document.getElementById("Ty").oninput = update

                update()
            }
            img.src = <string>reader.result;
        })

        reader.readAsDataURL(files[0])
    }
    load.click()
}

