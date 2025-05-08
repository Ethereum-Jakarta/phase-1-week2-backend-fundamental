const users = require('./users.js'); 

// Implementasi Callback
const getUserDataCallback = (userId, callback) => {
 setTimeout(() => {
	 value = users[userId - 1];
	 callback(value);
 }, 1000);
}

module.exports = getUserDataCallback;
