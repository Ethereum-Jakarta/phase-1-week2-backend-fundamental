/* Asynchronous JavaScript

JavaScript adalah bahasa pemrograman yang berjalan di lingkungan satu utas (single-threaded), yang berarti ia hanya dapat melakukan satu tugas pada suatu waktu. Namun, JavaScript memiliki dukungan untuk operasi asynchronous yang memungkinkan eksekusi tugas lain tanpa menghentikan jalannya program utama. Operasi asynchronous sangat penting dalam pengembangan web modern, terutama ketika berhadapan dengan operasi jaringan, I/O, dan tugas yang membutuhkan waktu lama.

Synchronous vs. Asynchronous:


Synchronous (Blocking):
Dalam operasi synchronous, setiap tugas dieksekusi satu per satu secara berurutan. Ketika suatu tugas sedang berjalan, program akan terhenti dan tidak dapat melanjutkan ke tugas berikutnya hingga tugas saat ini selesai.

Contoh: */ 
console.log('Synchronous');
console.log('1');
console.log('2');
console.log('3');

// Output: 1, 2, 3 (dieksekusi berurutan)


/* Asynchronous (Non-Blocking):
Dalam operasi asynchronous, tugas-tugas yang membutuhkan waktu lama atau bergantung pada eksternal seperti jaringan atau berkas, dieksekusi secara terpisah. Program utama tetap berjalan tanpa harus menunggu tugas tersebut selesai.

Contoh: */
console.log('Asynchronous (Non-Blocking)');

console.log('1');
setTimeout(() => {
  console.log('2');
}, 1000);
console.log('3');

// Output: 1, 3, 2 (2 ditunda selama 1 detik)


/* Callbacks:


Callback adalah sebuah fungsi yang dilewatkan sebagai argumen ke dalam fungsi lain dan dijalankan setelah fungsi tersebut selesai. Ini adalah salah satu cara umum untuk mengelola operasi asynchronous.

Contoh: */
console.log('Callbacks');

function fetchData(callback) {
  setTimeout(() => {
    const data = 'Some data';
    callback(data);
  }, 1000);
}

fetchData((result) => {
  console.log(result);
});



/* Promises:


Promises adalah pola yang lebih modern untuk mengelola operasi asynchronous. Sebuah Promise merepresentasikan nilai yang mungkin tersedia sekarang, nanti, atau tidak sama sekali. Promise memiliki tiga status: pending, fulfilled, atau rejected.

Contoh: */
console.log('Promises');

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = 'Some data';
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });


/* Async/Await:

Async/Await adalah pendekatan modern yang memungkinkan penulisan kode asynchronous dengan gaya yang mirip dengan kode synchronous. Ini berdasarkan Promise.

Contoh:
 */
console.log('Async/Await');

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = 'Some data';
      resolve(data);
    }, 1000);
  });
}

async function main() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

main();

/* Operasi asynchronous sangat penting dalam lingkungan JavaScript, terutama dalam pengembangan aplikasi web yang cenderung berkomunikasi dengan server, melakukan I/O, dan menjalankan tugas yang memakan waktu. Penggunaan pendekatan asynchronous memastikan bahwa aplikasi tetap responsif dan tidak terjebak dalam blok yang menghambat jalannya program. */
