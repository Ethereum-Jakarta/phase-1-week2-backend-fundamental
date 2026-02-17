const moment = require('moment');

function scheduleTask() {
  //code
    const now = moment();
    const scheduledTime = now.add(3, 'days').format('YYYY-MM-DD HH:mm:ss');
    console.log(`Scheduled task for: ${scheduledTime}`);
}

module.exports = { scheduleTask };