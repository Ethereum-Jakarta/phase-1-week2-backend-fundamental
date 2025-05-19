# JSON

JSON (JavaScript Object Notation) adalah sebuah format yang digunakan untuk pertukaran dan penyimpanan data. Ini merupakan format teks yang mudah dibaca oleh manusia dan mudah dipahami oleh mesin. JSON umum digunakan dalam komunikasi data antara server dan klien, penyimpanan konfigurasi, serta pertukaran data di berbagai aplikasi.

JSON terdiri dari pasangan `"nama-nilai"` atau `"key-value pairs"`. Ini serupa dengan objek dalam JavaScript, sehingga mudah untuk digunakan dalam lingkungan bahasa pemrograman tersebut.

Contoh JSON sederhana:
```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

Dalam Node.js, Kalian dapat dengan mudah memanipulasi data dalam format JSON menggunakan objek JavaScript. Berikut adalah beberapa cara penggunaan JSON di Node.js:


1. **Parsing JSON**:

Kalian dapat mengonversi string JSON menjadi objek JavaScript menggunakan metode JSON.parse().

```json
const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
const jsonObject = JSON.parse(jsonString);

console.log(jsonObject.name); // Output: John
```
<br/>

2. **Membuat JSON**:

Kalian dapat membuat objek JavaScript dan mengubahnya menjadi format JSON menggunakan metode JSON.stringify().

```js
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

const jsonString = JSON.stringify(person);
console.log(jsonString);
// Output: {"name":"John","age":30,"city":"New York"}
```
<br/>

3. **Membaca dan Menulis File JSON**:

Kalian dapat membaca dan menulis file dalam format JSON di Node.js menggunakan pustaka fs (file system). 

Contoh membaca file JSON:
```js
const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  const jsonObject = JSON.parse(data);
  console.log(jsonObject);
});
```
<br/>

Contoh menulis file JSON:
```js
const fs = require('fs');

const person = {
  name: "John",
  age: 30,
  city: "New York"
};

fs.writeFile('person.json', JSON.stringify(person), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Data has been written to person.json');
});
```

JSON adalah format yang penting dalam pengembangan web dan aplikasi, dan Node.js menyediakan dukungan yang kuat untuk manipulasi data JSON. Dengan penggunaan JSON, Kalian dapat dengan mudah berkomunikasi dengan server, menyimpan konfigurasi, serta memanipulasi dan menyimpan data secara efisien.
