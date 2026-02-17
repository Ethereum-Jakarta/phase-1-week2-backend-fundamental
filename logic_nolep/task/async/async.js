const users = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //code
  const user = users.find(u => u.id === userId)

  return user ? callback(user) : callback('User not found!')
}

// Implementasi Promise
function getUserDataPromise(userId) {
  //code
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.id === userId)

    if (!user) {
      reject('User not found!')
    }
    
    resolve(user) 
  })
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  //code
  const user = users.find(u => u.id === userId)

  return user ? user : 'User not found!'
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