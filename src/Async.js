const users = [
    {id: 1, username: 'john_doe'},
    {id: 2, username: 'jane_smith'},
    {id: 3, username: 'alice'}
];

// Implementasi Callback
function getUserDataCallback(userId, callback) {
    //code


    setTimeout(() => {
        const userFound = users.filter(user => user.id === userId);
        if (userFound.length === 0) {
            callback('Not Found')
        } else {
            callback(userFound[0].username)
        }
    }, 2000)


}

// Implementasi Promise
function getUserDataPromise(userId) {
    //code

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userFound = users.filter(user => user.id === userId);
            if (userFound.length === 0) {
                reject('Not Found')
            } else {
                resolve(userFound[0].username)
            }
        }, 2000)
    })

}

// Implementasi Async/Await
async function getUserDataAsync(userId) {
    //code
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userFound = users.filter(user => user.id === userId);
            if (userFound.length === 0) {
                reject('Not Found')
            } else {
                resolve(userFound[0].username)
            }
        }, 2000)
    })
}

export {getUserDataCallback, getUserDataPromise, getUserDataAsync}