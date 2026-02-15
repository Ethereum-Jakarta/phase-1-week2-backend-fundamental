interface UserData { id: number, username: string }

const users: UserData[] = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId: number, callback: (data?: UserData, err?: Error) => unknown) {
  const data = users.find(x => x.id === userId);
  let err: Error | undefined;
  if (!data) err = new Error("No data");
  callback.call(this, data, err);
}

// Implementasi Promise
function getUserDataPromise(userId: number) {
  return new Promise((resolve, reject) => getUserDataCallback(userId, (x, e) => e ? reject(e) : resolve(x)));
}

// Implementasi Async/Await
async function getUserDataAsync(userId: number) {
  return await getUserDataPromise(userId);
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
