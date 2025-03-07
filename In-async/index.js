const users = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  const user = users.find(user => user.id === userId); 
  user 
    ? setTimeout(() => callback(null, user), 100)  
    : callback("User tidak ditemukan!", null);
}


// Implementasi Promise
function getUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === userId); 
    if(!user) reject("User tidak ditemukan")
    setTimeout(() => {
      resolve(user)
    }, 100)
  })
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.id === userId)
    if(!user) reject("User tidak ditemukan")
    setTimeout(() => {
      resolve(user)
    }, 100)  
  })
}




// Test Case Async/Await
(async () => {
  try {
    const user = await getUserDataAsync(3);
    console.log('Async/Await Result:', user);
  } catch (error) {
    console.log('Error:', error);
  }
})();

// Test Case Callback
getUserDataCallback(2, (user) => {
  console.log('Callback Result:', user);
  // Output: Callback Result: { id: 1, username: 'john_doe' }
});

// Test Case Promise
getUserDataPromise(4)
  .then((user) => {
    console.log('Promise Result:', user);
    // Output: Promise Result: { id: 2, username: 'jane_smith' }
  })
  .catch((error) => {
    console.error(error);
  });

