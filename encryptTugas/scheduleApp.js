const moment = require('moment');

function scheduleTask() {
  //code
  console.log(`Scheduled task for: ${moment().add(3, 'd').format('D MMMM, h:mm a').toString()}`)
}

module.exports = { scheduleTask };