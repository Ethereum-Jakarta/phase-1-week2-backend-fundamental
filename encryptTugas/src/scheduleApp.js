// Penjadwalan Tugas dengan Moment:
// Buatlah file scheduleApp.js.
// Di dalamnya, gunakan library moment untuk membuat aplikasi yang menghitung waktu dan menjadwalkan tugas.
// Implementasikan fungsi yang menggunakan moment untuk menghitung waktu tiga hari dari sekarang dan menjadwalkan tugas tertentu.


const moment = require("moment");

const scheduleTask = () => {
    let duration = moment().add(3, 'days')
    let task = 'Tugas phase 1'
    console.log(`Schedule task for : ${task} (${duration.format('YYYY-MM-DD HH:mm:ss')})`)
};

module.exports = { scheduleTask };
