const moment = require('moment');

function scheduleTask() {
  //code
  let task = moment().add(7,"days")
//   console.log(moment(task-moment()).format("DD"))
  return task.format('ddd, MMM Do YYYY') +" is 7 days again"
}

module.exports = { scheduleTask };