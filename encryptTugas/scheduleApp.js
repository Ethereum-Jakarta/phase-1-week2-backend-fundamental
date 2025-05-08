const moment = require("moment");


function scheduleTask() {
  //code
  const schedule = moment().add(3, "days").calendar();
  console.log("Scheduled task for: " + schedule);
}
module.exports = { scheduleTask };
