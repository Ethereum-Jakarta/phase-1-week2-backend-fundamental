const moment = require('moment');

function scheduleTask() {
    let a = moment([2025, 0, 5]);
    let b = moment([2025, 0, 8]);
    const day = a.to(b);

    return console.log(`Scheduled task for: ${day}`);
}

module.exports = {scheduleTask};