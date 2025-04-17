import {getUserDataCallback, getUserDataPromise, getUserDataAsync} from '../src/Async'

import {expect, test} from "@jest/globals";

test('Async', function (done) {


    let successCounter = 0

// Test Case Callback
    getUserDataCallback(1, (user) => {
        console.log('Callback Result:', user);
        successCounter++
        // Output: Callback Result: { id: 1, username: 'john_doe' }
    });


// Test Case Promise
    getUserDataPromise(2)
        .then((user) => {
            console.log('Promise Result:', user);
            successCounter++

            // Output: Promise Result: { id: 2, username: 'jane_smith' }
        })
        .catch((error) => {
            console.error(error);
        });

// Test Case Async/Await
    (async () => {
        const user = await getUserDataAsync(3);
        console.log('Async/Await Result:', user);
        successCounter++


        // Output: Async/Await Result: { id: 3, username: 'alice' }
    })();

    setTimeout(() => {
        expect(successCounter).toStrictEqual(3)
        done()
    }, 3000)

});