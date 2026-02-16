const moment = require('moment');

function scheduleTask() {
    moment.locale("id") //ganti ke bahasa indonesia

    console.log("Iso format:", moment().format()); //iso format
    const formatCustom = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log("Tanggal dan Waktu saat ini:", formatCustom);

    //parsing string ke tanggal
    const date = moment("2025-06-13", "YYYY-MM-DD");
    console.log(date.format("DD MMMM YYYY"));

    //manipulasi tanggal
    console.log("7 hari kedepan adalah:", moment().add(7, "days").format("YYYY-MM-DD"));
    console.log("1 bulan ke belakang:", moment().subtract(1, "month").format("YYYY-MM-DD"));

    //hitung selisih waktu
    const a = moment("2025-06-01");
    const b = moment("2025-06-13");

    console.log(b.diff(a, "days"));

    //format waktu relatif
    console.log(moment("2025-06-11").fromNow())
    console.log(moment().add(1, "hour").fromNow())

    //validasi tanggal
    console.log(moment("2025-13-40", "YYYY-MM-DD", true).isValid())
    console.log(moment("2025-12-02", "YYYY-MM-DD", true).isValid())
}

module.exports = { scheduleTask };