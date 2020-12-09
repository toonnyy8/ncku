import * as tf from '@tensorflow/tfjs'
console.log(tf)
fetch("http://localhost:3000/test")
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(myJson);
    });
