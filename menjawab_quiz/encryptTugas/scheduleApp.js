const moment = require('moment');

function scheduleTask() {
    // console.log("Task Start at:");
    const currentDate = moment().format("DD-MMMM-YYYY");
    const dayPlusThree = moment(currentDate, 'DD-MMMM-YYYY').add(3, 'day').format('hh:mm:ss a : DD MMMM YYYY');

    console.log(dayPlusThree)
    return dayPlusThree;
}

module.exports = { scheduleTask };