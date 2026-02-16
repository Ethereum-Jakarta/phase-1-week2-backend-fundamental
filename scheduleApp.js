const moment = require('moment');

function scheduleTask() {
  //code
  const future = moment().add(3, 'day')
  console.log(`Scheduled task for: ${future.format('dddd MMMM DD')}`)
}

module.exports = { scheduleTask };