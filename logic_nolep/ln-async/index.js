const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

// Callback Implementation
function getUserDataCallback(userId, callback) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    callback(null, user);
  } else {
    callback("User not found", null);
  }
}

// Promise Implementation
function getUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      resolve(user);
    } else {
      reject("User not found");
    }
  });
}

// Async/Await Implementation
async function getUserDataAsync(userId) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    return user;
  } else {
    throw "User not found";
  }
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