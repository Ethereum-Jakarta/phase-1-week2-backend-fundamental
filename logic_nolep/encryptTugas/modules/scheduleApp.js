const moment = require("moment");

/**
 * TODO:
 * * Di dalamnya, gunakan library moment untuk membuat aplikasi yang menghitung waktu dan menjadwalkan tugas.
 * * Implementasikan fungsi yang menggunakan moment untuk menghitung waktu tiga hari dari sekarang dan menjadwalkan tugas tertentu.
 */

function scheduleTask() {
  const futureDate = moment()
    .add(3, "days")
    .format("dddd, MMMM Do YYYY, h:mm:ss a");

  console.log(futureDate);
}

module.exports = { scheduleTask };
