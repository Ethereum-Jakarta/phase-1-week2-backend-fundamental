const moment = require('moment');

function scheduleTask() {
  //code
  let dueDate = moment().add(3, 'days').format('YYYY-MM-DD HH:mm:ss')
  console.log("Scheduled task for:", dueDate);
}

module.exports = { scheduleTask };