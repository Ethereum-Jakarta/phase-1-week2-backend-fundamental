const users = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  const user = users.find(u => u.id === userId);
  if (!user) {
    callback('user not found!', null);
  } else {
    callback(null, user);
  }
}

// Implementasi Promise
function getUserDataPromise(userId) {
  const user = users.find(u => u.id === userId);
  return new Promise((resolve, reject) => {
    if (!user) reject('user not found!');
    else resolve(user);
  })
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('user not found!');
  return user;
}

// Test Case Callback
getUserDataCallback(1, (error, user) => {
  if (error) {
    console.error('Callback Error: ', error)
  } else {
    console.log('Callback Result:', user);
    // Output: Callback Result: { id: 1, username: 'john_doe' }
  }
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
  try {
    const user = await getUserDataAsync(3);
    console.log('Async/Await Result:', user);
    // Output: Async/Await Result: { id: 3, username: 'alice' }
  } catch(err) {
    console.error('Async/await Error: ', err.message);
  }
})();