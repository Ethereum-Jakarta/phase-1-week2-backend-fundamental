const users = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //code
  users.forEach(user => {
    if (userId === user.id) {
      callback(user);
    }
  })
}

// Implementasi Promise
function getUserDataPromise(userId) {
  //code
  return new Promise((resolve, reject) => {
    let result = null;
    users.forEach(user => {
      if (userId === user.id) {
        result = user;
      }
    })
    if (result) {
      resolve(result)
    } else {
      reject('ga ketemu')
    }
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  //code
  return new Promise((resolve, reject) => {
    let result = null;
    users.forEach(user => {
      if (userId === user.id) {
        result = user;
      }
    })
    if (result) {
      resolve(result)
    } else {
      reject('ga ketemu')
    }
  });
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