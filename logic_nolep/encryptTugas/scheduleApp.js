const moment = require('moment');

function scheduleTask(task) {
    const time = moment().add(3, 'd');
    console.log(`Tiga hari dari sekarang (${time}), anda di tugaskan ${task}`);
}

module.exports = { scheduleTask };