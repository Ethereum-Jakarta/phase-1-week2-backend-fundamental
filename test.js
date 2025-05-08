const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  setTimeout(() => {
    if (userId <= users.length) {
      callback(users[userId - 1]);
    } else {
      callback("there is no user ");
    }
  }, 1000);
}

// Implementasi Promise
function getUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= users.length) {
        resolve(users[userId - 1]);
      } else {
        reject("there is no user ");
      }
    }, 1000);
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  try {
    let result = await getUserDataPromise(userId);
    return result;
  } catch (e) {
    console.error(e);
  }
}

// Test Case Callback
getUserDataCallback(1, (user) => {
  console.log("Callback Result:", user);
  // Output: Callback Result: { id: 1, username: 'john_doe' }
});

// Test Case Promise
getUserDataPromise(2)
  .then((user) => {
    console.log("Promise Result:", user);
    // Output: Promise Result: { id: 2, username: 'jane_smith' }
  })
  .catch((error) => {
    console.error(error);
  });

// Test Case Async/Await
(async () => {
  const user = await getUserDataAsync(3);
  console.log("Async/Await Result:", user);
  // Output: Async/Await Result: { id: 3, username: 'alice' }
})();
