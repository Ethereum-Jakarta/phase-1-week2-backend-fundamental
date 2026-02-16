const moment = require('moment');

function scheduleTask() {
  //code
  const schedule = moment().add(3, 'd').format('YYYY-MM-DD HH:mm:ss');

  console.log("Scheduled task for:", schedule);
}

module.exports = { scheduleTask };