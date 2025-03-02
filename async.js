// sumber data
const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

//! Implementasi function async

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //tambah parameter "callback function"
  setTimeout(() => {
    let user;
    for (const iterator of users) {
      if (iterator.id === userId) {
        user = iterator;
      }
    }
    // callback dengan parameter dimasukkan ke parameter dari function "callback function"
    callback(user);
  }, 1000);
}

// Implementasi Promise
function getUserDataPromise(userId) {
  // pakainya new Promise dengan parameter : anonym func dengan 2 parameter(berhasil,tidak)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user;
      for (const iterator of users) {
        if (iterator.id === userId) {
          user = iterator;
        }
      }
      // ini kalau berhasil
      resolve(user);
    }, 1000);
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user;
      for (const iterator of users) {
        if (iterator.id === userId) {
          user = iterator;
        }
      }
      resolve(user);
    }, 1000);
  });
}

//!TEST CASE

// Test Case Callback
getUserDataCallback(1, (user) => {
  // parameter callback nya adalah function dengan parameter pemanggilan callback di //! implementasi
  // di dalam callback function, jalankan :
  console.log("Callback Result:", user);
  // Output: Callback Result: { id: 1, username: 'john_doe' }
});

// Test Case Promise
getUserDataPromise(2)
  // jalankan function nya dulu, lalu .then dengan argumen nya resolve(user)
  .then((user) => {
    console.log("Promise Result:", user);
    // Output: Promise Result: { id: 2, username: 'jane_smith' }
  })
  .catch((error) => {
    console.error(error);
  });

// Test Case Async/Await
// mirip promise, tapi bikin function async dulu
(async () => {
  // di dalam func async, tambahkan await lalu callback function nya
  const user = await getUserDataAsync(3);
  console.log("Async/Await Result:", user);
  // Output: Async/Await Result: { id: 3, username: 'alice' }
})();
