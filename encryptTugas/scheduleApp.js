const moment = require("moment");

function scheduleTask() {
  const next3Day = moment().add(3, "d");
  console.log(`Scheduled task for:${next3Day}`);
}

module.exports = { scheduleTask };
