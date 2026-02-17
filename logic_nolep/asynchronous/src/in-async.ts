interface User {
  id: number;
  username: string;
}

const users: User[] = [
  { id: 1, username: 'john_doe' },
  { id: 2, username: 'jane_smith' },
  { id: 3, username: 'alice' }
]

type FetchCallback = (error: Error | null, data?: User) => void;

function getUserDataCallback(userId: number, callback: FetchCallback): void {
  const user: User | undefined = users.find(u => u.id === userId);
  if (!user) {
    callback(new Error('User not found!'));
  } else {
    callback(null, user);
  }
}

function getUserDataPromise(userId: number): Promise<User> {
  return new Promise((resolve , reject) => {
    const user: User | undefined = users.find(u => u.id === userId);
    if (user) {
      resolve(user);
    } else {
      reject(new Error('User not found!'));
    }
  })
}

async function getUserDataAsync(userId: number): Promise<User> {
    const user: User | undefined = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found!');
    } else {
      return user;
    }
}
 
// Test Case Callback
getUserDataCallback(1, (err: Error | null, user? : User): void => {
  if (err) {
    console.error(err);
    return;
  }
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
  try {
    const user = await getUserDataAsync(3);
    console.log('Async/Await Result:', user);
    // Output: Async/Await Result: { id: 3, username: 'alice' }
  } catch (err) {
    console.error(err);
  }
})();