const moment = require('moment');

function scheduleTask() {
  //code
  const futureDate = moment().add(3, 'days').format('MMMM Do YYYY, h:mm:ss a');
  console.log(`Scheduled task for: ${futureDate}`);
}

module.exports = { scheduleTask };
