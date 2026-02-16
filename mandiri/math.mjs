//menggunakan require dan module.exports
//cara pertama
// exports.add = (a, b) => a + b;
// exports.substract = (a, b) => a - b;

//cara kedua

// const add = (a, b) => a + b;
// const substract = (a, b) => a - b;

// module.exports = { add, substract }

//===============================================

//menggunakan import dan export
//cara pertama
export const add = (a, b) => a + b;
export const substract = (a, b) => a - b;
