const moment = require('moment');

function scheduleTask(tugas) {
  //code
  const now  = moment();
  const thereDay = moment().add(3, 'Days');

  console.log(`Tugas ${tugas} di jadwalkan dalam 3 hari`);
  console.log(`Waktu saat ini:`,now.format('YYYY-MM-DD HH:mm:ss'));
  console.log(`Waktu yang di jadwalkan:`,thereDay.format('YYYY-MM-DD HH:mm:ss'));
}
module.exports = { scheduleTask };