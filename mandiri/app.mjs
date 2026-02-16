// menggunakan require
// const math = require('./math.js')

// console.log(math.add(5, 1));
// console.log(math.substract(5, 1));


//==================================================

//menggunakan import
import { add, substract } from "./math.mjs";

console.log(add(5, 3));
console.log(substract(5, 3));

//jika menggunakan import dan export extension nya harus diubah menjadi "file.mjs" agar node js tahu itu ES Module.
//jika ada package.json dan ada "type" : "module" -> tidak perlu "file.mjs" cukup "file.js" saja
//bisa juga menggunakan require dan module.exports
