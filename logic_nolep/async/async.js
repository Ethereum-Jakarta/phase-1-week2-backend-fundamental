const users = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //code
  setTimeout(() => {
    const result = users.find(user => user.id === userId);
    callback(result);
  }, 1000)

  // alternatif
  /* setTimeout(() => {
      let result = null;
      for (let i = 0; i < users.length; i++){
        if (users[i].id === userId){
          result = users[i];
          break;
        }
      }
      callback(result);
    }, 1000); */
}

// Implementasi Promise
function getUserDataPromise(userId) {
  //code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = users.find(user => user.id === userId);
      if (!result){
        reject('error');
      } else {
        resolve(result);
      }
    }, 1000);    
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  //code
  // bisa seperti ini:
  // return await getUserDataPromise(userId);

  const result = await new Promise((resolve) => {
    setTimeout(() => {
        const user = users.find(user => user.id === userId);
        resolve(user);
    }, 1000);
  })
  return result;
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