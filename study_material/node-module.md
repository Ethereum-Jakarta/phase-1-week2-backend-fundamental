# Node Js Module 

Mari kita bahas secara terpisah apa itu Node.js module, library, dan NPM, serta bagaimana cara pemakaiannya beserta contoh implementasi nyata.

## Node.js Module:
Node.js modul adalah unit mandiri kode yang dapat dipisahkan dari kode lain dan digunakan kembali dalam berbagai bagian aplikasi. Ini membantu dalam mengorganisir dan membagi kode menjadi bagian yang lebih kecil dan dikelompokkan berdasarkan fungsionalitas.

Contoh penggunaan modul di Node.js:

```js
// File: math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
```

```js
// File: app.js
const math = require('./math.js');

console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(10, 4)); // Output: 6
```

`require` dan `module.exports` adalah mekanisme inti dalam Node.js yang digunakan untuk membagi kode ke dalam modul yang dapat digunakan kembali. Dalam ES6 (ECMAScript 2015) dan versi JavaScript yang lebih baru, ada juga sintaks `import` dan `export` yang memiliki fungsi serupa tetapi digunakan dalam konteks yang sedikit berbeda. Berikut adalah penjelasan tentang keduanya:

### **require dan module.exports**:
- **require**: Ini adalah fungsi yang digunakan di Node.js untuk mengimpor modul atau file lain. Dengan menggunakan require, Kalian dapat mengakses dan menggunakan kode yang diekspor dari file lain di dalam proyek Kalian.
- **module.exports**: Ini adalah objek di dalam Node.js yang digunakan untuk mengekspor kode dari sebuah modul. Kode yang diekspor dapat diakses dan digunakan oleh modul lain yang mengimpornya menggunakan require.

Contoh penggunaan require dan module.exports:

```js
// File: math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = { add, subtract };
```

```js
// File: app.js
const math = require('./math.js');

console.log(math.add(5, 3)); // Output: 8
console.log(math.subtract(10, 4)); // Output: 6
```

### **Import dan export (ES6+)**:
- **import**: Ini adalah pernyataan yang diperkenalkan dalam ES6 untuk mengimpor kode dari modul lain. Ini sering digunakan dalam lingkungan yang mendukung JavaScript modern (bukan hanya di Node.js).
- **export**: Ini adalah pernyataan yang digunakan dalam ES6 untuk mengeskpor kode agar dapat diimpor oleh modul lain. Ini memungkinkan Kalian untuk mengimpor fungsi, variabel, atau kelas dari modul lain.

Contoh penggunaan `import` dan `export`:

```js
// File: math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

```js
// File: app.js
import { add, subtract } from './math.js';

console.log(add(5, 3)); // Output: 8
console.log(subtract(10, 4)); // Output: 6
```

<br/>

## Library:
Library adalah kumpulan kode yang telah ditulis oleh pengembang lain dan disediakan dalam bentuk paket yang dapat digunakan untuk tujuan tertentu, seperti memecahkan masalah umum atau menyediakan fungsionalitas yang berguna. library (library) memungkinkan pengembang untuk menggunakan kode yang sudah ada tanpa harus menulisnya dari awal.

Contoh penggunaan library di Node.js dengan NPM:
Misalnya, Kalian ingin menggunakan library Moment.js untuk memanipulasi tanggal dan waktu:
```
npm install moment
```
```js
const moment = require('moment');

const currentDate = moment().format('YYYY-MM-DD');
console.log(currentDate); // Output: 2023-08-28
```

NPM (Node Package Manager):
NPM adalah manajer paket yang digunakan untuk mengelola library dan alat di lingkungan Node.js. NPM memungkinkan pengembang untuk mencari, menginstal, dan mengelola library-library yang diperlukan dalam proyek mereka.

Contoh penggunaan NPM:
```js
npm install package-name
```
```js
const package = require('package-name');
```

Dalam pengembangan nyata, Kalian mungkin ingin membuat proyek Node.js dan menggunakan library pihak ketiga. Misalnya, Kalian dapat membuat proyek sederhana yang menggunakan Express.js sebagai kerangka kerja web:

Instalasi Express melalui NPM:
```
npm install express
```

Implementasi Express di dalam kode:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```


Dalam contoh di atas, Express.js adalah library yang digunakan untuk mengembangkan server web dengan mudah dan efisien. 
`package.json` adalah sebuah file yang berisi informasi tentang proyek Node.js Kalian, termasuk dependensi (library atau alat yang diperlukan oleh proyek Kalian), konfigurasi proyek, dan skrip yang dapat dijalankan. Ini adalah bagian penting dari setiap proyek Node.js karena membantu mengatur proyek Kalian dan memastikan bahwa pengembang lain dapat menggKaliankan lingkungan yang sama dengan mudah.

Di bawah ini adalah penjelasan tentang beberapa informasi yang biasanya ada dalam file package.json:

![image](https://github.com/user-attachments/assets/2f53d3b0-0d60-4d43-849c-398e02c62780)

![image](https://github.com/user-attachments/assets/a61f1ff0-fcdd-4bbc-b304-41d25321753d)


- **name**: Nama proyek Kalian.
- **version**: Versi proyek.
- **description**: Deskripsi singkat tentang proyek.
- **dependencies**: Daftar dependensi yang diperlukan oleh proyek. Ini adalah library yang Kalian install untuk mengembangkan atau menjalankan aplikasi.
- **devDependencies**: Daftar dependensi pengembangan yang diperlukan selama pengembangan proyek, tetapi tidak diperlukan di produksi.
- **scripts**: Berisi skrip yang dapat dijalankan dengan perintah npm run. Misalnya, Kalian dapat membuat skrip untuk menjalankan server atau menguji proyek.
- **author**: Nama pengembang atau tim yang membuat proyek.
- **license**: Lisensi yang digunakan untuk proyek (misalnya, MIT, Apache, dsb).

Cara mudah untuk membuat package.json adalah dengan menggunakan perintah `npm init .` Berikut langkah-langkahnya:

1. Buka terminal atau command prompt.
2. Navigasikan ke direktori proyek Kalian menggunakan perintah cd path/to/your/project.
3. Jalankan perintah npm init dan ikuti petunjuk yang diberikan.
4. Kalian akan diminta untuk memberikan informasi seperti nama proyek, versi, deskripsi, penulis, lisensi, dll.
5. Setelah selesai, Kalian akan memiliki file package.json yang dihasilkan dalam direktori proyek Kalian.

Contoh penggunaan npm init:
```
npm init
```

Kalian dapat menggunakan opsi -y untuk membuat package.json dengan pengaturan default tanpa harus mengisi formulir interaktif:
```
npm init -y
```


Setelah Kalian memiliki package.json, Kalian dapat menggunakan perintah npm install untuk menginstal dependensi yang dinyatakan di dalamnya. Misalnya:
```
npm install crypto-js
```

Ini akan menginstal crypto-js dan menambahkannya sebagai dependensi dalam package.json Kalian.

crypto-js ini hanyalah contoh buat penggunaan library saja, untuk development backend yang sebenarnya kalian akan banyak melakukan instalasi pada library library yang dibutuhkan. Dan kalian bisa melakukan instalasi multiple library dengan cara seperti ini :

![image](https://github.com/user-attachments/assets/8ec6fede-2eef-470a-9087-b0eb276090ee)


Dengan package.json, Kalian dapat mengelola dependensi, mengatur script, dan memberikan informasi penting tentang proyek Kalian dengan mudah.

## Node Modules

node_modules adalah folder yang dibuat oleh npm (Node Package Manager) saat Kalian menginstal library-library dari NPM. Folder ini berisi semua library yang diperlukan oleh project Kalian, serta library lain yang diperlukan oleh library tersebut (dependensi).

Ketika Kalian menjalankan perintah npm install, npm akan membaca file package.json dalam proyek Kalian. Di dalam package.json, terdapat daftar library yang diperlukan oleh proyek. Npm kemudian akan mengunduh dan menginstal semua library tersebut serta dependensinya dari repositori npm.

Folder node_modules memiliki struktur yang mencerminkan hierarki dependensi proyek Kalian. Ini memungkinkan Kalian untuk dengan mudah melacak dan mengelola library-library yang digunakan oleh proyek. Selain itu, struktur folder ini memastikan bahwa library-library yang Kalian gunakan memiliki lingkungan yang terisolasi dan tidak saling bercampur dengan library-library dari proyek lain.

Pentingnya folder node_modules:

Isolasi Dependensi: Folder ini memisahkan library-library dan dependensinya untuk setiap proyek, menghindari konflik antara library versi yang berbeda.
Mudah Dikendalikan: Kalian dapat melihat dan mengelola library-library yang digunakan oleh proyek dengan melihat struktur folder node_modules.
Reproducible Builds: Kalian dapat mereplikasi lingkungan proyek dengan mudah di berbagai lingkungan dengan hanya menggunakan package.json dan menjalankan npm install.
Sebagai catatan, folder node_modules tidak perlu di-commit ke dalam repositori Git karena Kalian dapat selalu menghasilkan kembali folder ini dengan menjalankan npm install di lingkungan baru. Oleh karena itu, folder ini biasanya diabaikan dalam file .gitignore. 
`Ignore Node Modules`

Untuk mengabaikan folder node_modules saat menggunakan Git, Kalian perlu menambahkan entri ke dalam file .gitignore. Langkah-langkahnya adalah sebagai berikut:

1. Buka proyek Kalian di editor teks favorit Kalian.

2. Jika belum ada, buatlah atau buka file bernama .gitignore di direktori proyek Kalian.

3. Tambahkan baris berikut ke dalam file .gitignore:
```
node_modules/
```

Baris ini akan memberi tahu Git untuk mengabaikan folder `node_modules` beserta isinya.

4. Simpan perubahan pada file .gitignore.

5. Jalankan perintah git add .gitignore untuk menambahkan file .gitignore ke dalam staged changes.

6. Lakukan commit dengan pesan yang sesuai, misalnya:
```
git commit -m "Add .gitignore to ignore node_modules"
```

7. Selanjutnya, ketika Kalian melakukan perubahan di proyek dan menjalankan perintah git status, Kalian akan melihat bahwa folder node_modules diabaikan dan tidak masuk dalam daftar "Changes to be committed".

Mengabaikan folder `node_modules` sangat berguna karena folder ini biasanya berisi semua library (libraries) yang diunduh melalui npm, yang dapat cukup besar. Oleh karena itu, tidak ada kebutuhan untuk menyimpannya dalam repositori Git, karena Kalian dapat dengan mudah menginstal ulang library-library tersebut dengan menjalankan `npm install` berdasarkan informasi yang ada dalam file `package.json`.

Jadi kalau kalian ingin memakai modules atau library kalian perlu lakukan yang namanya init package.json terlebih dahulu dengan step step diatas.

Kedepannya setiap kalian mengerjakan tugas kalian diwajibkan set up folder yang didalamnya ada init package.json agar bisa menginstall library/modules yang dibutuhkan.
