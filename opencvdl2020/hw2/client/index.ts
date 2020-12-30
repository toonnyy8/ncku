import * as q1 from "./q1"
import * as q2 from "./q2"
import * as q3 from "./q3"
import * as q4 from "./q4"
import * as q5 from "./q5"
new Promise((resolve, reject) => {
    resolve(null)
})
    .then(() => {
        q1.runQ1()
    })
    .then(() => {
        q2.runQ2()
    })
    .then(() => {
        q3.runQ3()
    })
    .then(() => {
        q4.runQ4()
    })
    .then(() => {
        q5.runQ5()
    })
