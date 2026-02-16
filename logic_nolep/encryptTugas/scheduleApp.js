const moment = require("moment");

function scheduleTask() {
  //code
  const getDay3 = moment().add(3, "d").format("DD-MM-YYYY HH:mm:ss");
  console.log(`Scheduled task for: ${getDay3}`);
}

module.exports = { scheduleTask };
