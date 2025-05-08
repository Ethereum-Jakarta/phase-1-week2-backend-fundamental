const moment = require('moment');

function scheduleTask() {
   let result = moment().add(3,'days').format("MM/DD/YYYY"); 
  console.info(`Scheduled task for: ... ${result}`)
}

module.exports = { scheduleTask };