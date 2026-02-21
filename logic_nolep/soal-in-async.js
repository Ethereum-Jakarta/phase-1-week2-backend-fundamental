const users = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
    { id: 3, username: 'alice' }
  ];
  
  // Implementasi Callback
  function getUserDataCallback(userId, callback) {
    //code
    let cariObj = users.find((users) => users.id === userId)

    callback(cariObj);
  }
  
  // Implementasi Promise
  function getUserDataPromise(userId) {
    //code
    return new Promise((resolve, reject) => {
        // Simulasi pengambilan data dengan setTimeout
        setTimeout(() => {
          const user = users.find(user => user.id === userId);
          
          if (user) {
            resolve(user); // Mengembalikan data pengguna jika ditemukan
          } else {
            reject(new Error('User not found')); // Menolak Promise jika pengguna tidak ditemukan
          }
        }, 1000); // Simulasi delay 1 detik
    });
  }
  
  // Implementasi Async/Await
  async function getUserDataAsync(userId) {
    //code
    let async = users.find((users) => users.id === userId)
    return async;
  }
  
  // Test Case Callback
  getUserDataCallback(1, (user) => {
    console.log('Callback Result:', user);
    // Output: Callback Result: { id: 1, username: 'john_doe' }
  });
  
  // Test Case Promise
  getUserDataPromise(2)
    .then((user) => {
      console.log('Promise Result:', user);
      // Output: Promise Result: { id: 2, username: 'jane_smith' }
    })
    .catch((error) => {
      console.error(error);
    });
  
  // Test Case Async/Await
  (async () => {
    const user = await getUserDataAsync(3);
    console.log('Async/Await Result:', user);
    // Output: Async/Await Result: { id: 3, username: 'alice' }
  })();
