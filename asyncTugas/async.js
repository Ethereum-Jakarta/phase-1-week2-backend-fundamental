const users = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
    { id: 3, username: 'alice' }
  ];
  
  // Implementasi Callback
  function getUserDataCallback(userId, callback) {
    //code
    setTimeout(() => {
        if(userId <= users.length && userId > 0){
            callback(users[userId-1],null)
        }
    }, 3000)
  }
  
  // Implementasi Promise
  function getUserDataPromise(userId) {
    //code
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(userId <= users.length && userId > 0){
                resolve(users[userId-1])
            }

        }, 3000);
      });
  }
  
  // Implementasi Async/Await
  async function getUserDataAsync(userId) {
    //code
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(userId <= users.length && userId > 0){
                resolve(users[userId - 1])
            }
            
        }, 3000);
      });
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