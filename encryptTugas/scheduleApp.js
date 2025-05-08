const moment = require('moment');

function scheduleTask() {
    const startDate = moment().add(3, 'day').format("YYYY-MM-DD (HH:mm)")
    return startDate
  //code
}
console.log(scheduleTask())

module.exports = { scheduleTask };