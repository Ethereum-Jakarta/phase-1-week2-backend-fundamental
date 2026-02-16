const users = [
    { id: 1, username: 'john_doe' },
    { id: 2, username: 'jane_smith' },
    { id: 3, username: 'alice' }
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
    console.log("processing get data 1....");
    for (let i = 0; i < users.length; i++) {
        // console.log(users[i])
        if (users[i].id === userId) {
            // console.log(users[i])
            setTimeout(() => {
                callback(users[i])
            }, 1000)
            return;
        }
    }
}

// Implementasi Promise
function getUserDataPromise(userId) {
    console.log("processing get data 2...");
    return new Promise((success, failed) => {
        if (!userId) failed("Sorry, no user id. Cannot Acces");
        // if (userId > users.length) failed("Sorry, user id is greater than data. Cannot Access")
        let found = false
        if (userId) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    found = true;
                    setTimeout(() => {
                        success(users[i])
                    }, 2000)
                    return;
                }
            }

            if (!found) {
                failed("user not found!")
            }
        }
    })
}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
    console.log("processing get data 3...");
    return new Promise((success, failed) => {
        if (!userId) failed("Sorry, no user id. Cannot Acces");
        if (userId > users.length) failed("Sorry, user id is greater than data. Cannot Access")
        if (userId) {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === userId) {
                    setTimeout(() => {
                        success(users[i])
                    }, 3000)
                    return;
                }
            }
        }
    })
}

// Test Case Callback
getUserDataCallback(1, (user) => {
    console.log('Callback Result:', user);
    // Output: Callback Result: { id: 1, username: 'john_doe' }
});

// Test Case Promise
getUserDataPromise(4)
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
