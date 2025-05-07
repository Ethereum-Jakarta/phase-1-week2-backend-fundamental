const moment = require("moment");

function scheduleTask() {
    const date = new Date();
    const current_time = `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`;
    const new_date = moment(current_time, "YYYY-MM-DD").add(3, "days");

    return `Scheduled task for: ... ${new_date.format("YYYY-MM-DD")}`;
}

module.exports = { scheduleTask };
