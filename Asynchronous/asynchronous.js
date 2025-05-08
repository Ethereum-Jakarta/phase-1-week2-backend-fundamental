const users = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
    { id: 3, username: 'alice' }
  ];

  
  // Implementasi Callback
  function getUserDataCallback(userId, callback) {
    //code
    const change = userId - 1
    setTimeout(() => {
      if (userId - 1 === change){
        callback(users[change])
      } else {
        console.log('Data is Wrong')
      }
    }, 1000)
  }
  
  // Implementasi Promise
  function getUserDataPromise(userId) {
    //code
    const change = userId - 1
    return new Promise ((succes, failed) => {
      setTimeout(() => {
        if (userId - 1 === change){
          succes(users[change])
        } else {
          failed('Data is wrong')
        }
      }, 2000)
    })
  }
  
  // Implementasi Async/Await
  async function getUserDataAsync(userId) {
    //code
    const change = userId - 1
    return new Promise ((succes, failed) => {
      setTimeout(() => {
        if (userId - 1 === change){
          succes(users[change])
        }else {
          failed('Data is Wrong')
        }
      }, 3000)
    })
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