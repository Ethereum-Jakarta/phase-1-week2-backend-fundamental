const moment = require('moment');

function scheduleTask() {
  const futureDate = moment().add(3, 'days');
  console.log('Scheduled task for:', futureDate.format('YYYY-MM-DD HH:mm:ss'));
}

module.exports = { scheduleTask };
