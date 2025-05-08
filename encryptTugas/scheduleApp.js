// moment
const moment = require("moment");

function scheduleTask() {
  //code
  const nowDate = moment().format("YYYY-MM-DD / HH:mm:ss");
  console.log(`Scheduled task for: ${nowDate}`);
}

module.exports = { scheduleTask };
