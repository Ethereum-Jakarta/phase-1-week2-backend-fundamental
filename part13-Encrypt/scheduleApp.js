const moment = require('moment');
function scheduleTask() {
  return console.log(`Scheduled Task For : ${moment().add(3, 'd')}`);
}
module.exports = { scheduleTask };
