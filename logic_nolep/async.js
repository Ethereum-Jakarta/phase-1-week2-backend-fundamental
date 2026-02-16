const users = [
  { id: 1, username: "john_doe" },
  { id: 2, username: "jane_smith" },
  { id: 3, username: "alice" },
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
  //code
  setTimeout(() => {
    let user;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) user = users[i];
    }
    callback(user);
  }, 2000);
}

// Implementasi Promise
function getUserDataPromise(userId) {
  //code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user;
      for (const currentUser of users) {
        if (currentUser.id === userId) user = currentUser;
      }

      if (user) {
        resolve(user);
      } else {
        reject("user does not exist");
      }
    }, 2000);
  });
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
  //code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.id === userId);
      if (user) {
        resolve(user);
      } else {
        reject("user does not exist");
      }
    }, 2000);
  });
}

// Test Case Callback
getUserDataCallback(1, (user) => {
  console.log("Callback Result:", user);
  // Output: Callback Result: { id: 1, username: 'john_doe' }
});

// // Test Case Promise
getUserDataPromise(2)
  .then((user) => {
    console.log("Promise Result:", user);
    // Output: Promise Result: { id: 2, username: 'jane_smith' }
  })
  .catch((error) => {
    console.error(error);
  });

// // Test Case Async/Await
(async () => {
  try {
    const user = await getUserDataAsync(3);
    console.log("Async/Await Result:", user);
    // Output: Async/Await Result: { id: 3, username: 'alice' }
  } catch (error) {
    console.log(error);
  }
})();
