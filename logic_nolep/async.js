const users = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
    { id: 3, username: 'alice' }
  ];
  
  // Implementasi Callback
  function getUserDataCallback(userId, callback) {
    setTimeout(() => {
      const user = users.find(u => u.id === userId);
      if (user) {
        callback(null, user);
      } else {
        callback(new Error('User not found'), null);
      }
    }, 1000);
  }
  
  // Implementasi Promise
  function getUserDataPromise(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      }, 1000);
    });
  }
  
  // Implementasi Async/Await
  async function getUserDataAsync(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.id === userId);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      }, 1000);
    });
  }
  
  // Test Case Callback
  getUserDataCallback(1, (error, user) => {
    if (error) {
      console.error(error.message);
    } else {
      console.log('Callback Result:', user);
    }
  });
  
  // Test Case Promise
  getUserDataPromise(2)
    .then(user => console.log('Promise Result:', user))
    .catch(error => console.error(error.message));
  
  // Test Case Async/Await
  (async () => {
    try {
      const user = await getUserDataAsync(3);
      console.log('Async/Await Result:', user);
    } catch (error) {
      console.error(error.message);
    }
  })();
  
  