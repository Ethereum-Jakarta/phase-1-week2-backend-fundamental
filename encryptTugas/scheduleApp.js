const moment = require('moment')

function scheduleTask(){
    console.log("Scheduled task for: " +  moment().add(3,'days').format('DD/MM/YYYY')); 
}

module.exports = { scheduleTask }