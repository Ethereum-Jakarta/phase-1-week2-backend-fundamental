const moment = require('moment')


function scheduleTask() {
    const schedule = moment().add(3, 'day').format('DD MMMM YYYY')
    console.log('Scheduled task for : ' +  schedule)
}


module.exports = { scheduleTask }