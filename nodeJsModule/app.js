const math = require('./math.js');
const package = require('package-name');

const moment = require('moment');
const currentDate = moment().format('YYYY-MM-DD');

console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(10, 4)); // Output: 6


console.log(currentDate); // Output: 2023-08-28


const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});