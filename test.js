const fs = require('fs')

fs.readFile('./hi.csv', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    let arr = data.split(": ").slice(1)
    arr = arr.map(s => s.match(/[-]?[0-9]+[.][0-9]+/)[0])
    csv = arr.reduce((prev, cur, idx) => {
        if (idx % 3 == 0) {
            prev += '\n'
        }
        prev += cur
        if (idx % 3 != 2) {
            prev += ','
        }
        return prev
    }, "Train SISNR,Test SISNR,Train CL Loss")
    console.log(csv)
    fs.writeFile("./history.csv", csv, () => { })
    // console.log(data)
});

