const moment = require('moment');

function scheduleTask() {
  const day3 = moment(new Date()).add(3, 'days')
  const format = day3.format('DD-MM-YYYY HH:mm:ss')
  return `Scheduled task for: ${format}`
}

module.exports = { scheduleTask };