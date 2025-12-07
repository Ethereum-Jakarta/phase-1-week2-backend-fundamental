const moment = require('moment');

function scheduleTask() {
    let now = moment();
    let future = now.add(3, 'days').format("YYYY-MM-DD");
    return console.log(`Scheduled task for: ${future}`);
}

module.exports = {scheduleTask};