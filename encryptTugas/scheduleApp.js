const moment = require('moment');

const scheduleTask = () => {
	let startDate = moment();
	let scheduledDate = moment(startDate, 'YYYY-MM-DD HH:mm').add(3, 'days');
	let day = scheduledDate.format('DD');
	let month = scheduledDate.format('MM');
	let year = scheduledDate.format('YYYY');
	let hour = scheduledDate.format('HH');
	let minute = scheduledDate.format('mm');
	console.log(`Scheduled task for: ${year}-${month}-${day} ${hour}:${minute}`);
}

module.exports = { scheduleTask };
