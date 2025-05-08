const moment = require('moment');

function scheduleTask() {
  //code
  return "Scheduled task for: " +  moment().add(1,'days').format('DD/MM/YYYY'); 
}



module.exports = { scheduleTask };