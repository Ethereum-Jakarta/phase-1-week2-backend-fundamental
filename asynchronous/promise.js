const users = require('./users.js');

const getUserDataPromise = (userId) => {
  return new Promise ((resolve, reject) => {
		setTimeout(() => {
			const data = users[userId - 1];
			resolve(data);
		}, 1000);
 });
}

module.exports = getUserDataPromise;
