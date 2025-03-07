// Soal:
// 1. Callback:
// Buatlah fungsi getUserData yang mengambil data pengguna dari server dengan menggunakan pendekatan callback. Fungsi ini akan menerima sebuah callback sebagai argumen dan akan mengembalikan data pengguna setelah simulasi pengambilan data selesai.

// 2. Promise:
// Ubahlah fungsi getUserData menjadi pendekatan Promise. Kembalikan data pengguna menggunakan resolve ketika simulasi pengambilan data selesai dan menggunakan reject jika terjadi kesalahan.

// 3. Async/Await:
// Ubahlah kode fungsi getUserData menjadi pendekatan async/await.

// Test Case:
// Panggil fungsi getUserData dengan pendekatan callback, Promise, dan async/await. Setelah masing-masing tugas selesai, tampilkan hasilnya.

const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

// let indexResult;
// users.forEach((element, index) => {
//   if (element.id == userId) {
//     indexResult = index;
//   }
// });
// const hasil = users[indexResult];
// callback(hasil);

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //code
  setTimeout(() => {
    const user = users.find((element) => element.id === userId);
    user ? callback(user) : callback("User not found");
  }, 2000);
}

// Implementasi Promise
function getUserDataPromise(userId) {
  //code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((element) => element.id === userId);
      user ? resolve(user) : reject("User not found");
    }, 2000);
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  //code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((element) => element.id === userId);
      user ? resolve(user) : reject("User not found");
    }, 2000);
  });
}

// Test Case Callback
// console.log("processing callback result...");
// getUserDataCallback(1, (user) => {
//   console.log("Callback Result:", user);
//   // Output: Callback Result: { id: 1, username: 'john_doe' }
// });

// Test Case Promise
// console.log("processing promise result...");
// getUserDataPromise(2)
//   .then((user) => {
//     console.log('Promise Result:', user);
//     // Output: Promise Result: { id: 2, username: 'jane_smith' }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// Test Case Async/Await
(async () => {
  try {
    const user = await getUserDataAsync(4);
    console.log("Async/Await Result:", user);
    // Output: Async/Await Result: { id: 3, username: 'alice' }
  } catch (error) {
    console.log(error)
  }
})();