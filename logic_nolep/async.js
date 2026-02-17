const users = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //code
    for (let i = 0; i < users.length; i++) {
        if(users[i].id === userId) callback(users[i]);
        break;
    }
}

// Implementasi Promise
function getUserDataPromise(userId) {
  //code
    return new Promise((resolve, reject) => {
        for (let i = 0; i < users.length; i++) {
            if(users[i].id === userId) {
                resolve(users[i]);
                return;
            }
        }
        reject(new Error('User not found'));
    });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  //code
    for (let i = 0; i < users.length; i++) {
        if(users[i].id === userId) {
            return users[i];
        }
    }
    throw new Error('User not found');
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