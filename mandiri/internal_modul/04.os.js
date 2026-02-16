const os = require('os');
const { cpuUsage, uptime } = require('process');

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${days} hari ${hours} jam ${minutes} menit`;
}

setInterval(() => {
    const stats = {
        cpuUsage: os.loadavg(), // Load average 1, 5, 15 menit
        // mengecek beban cpu
        freeMem: (os.freemem() / 1024 / 1024 / 1024).toFixed(2), // Memory tersedia dalam bytes
        // mengecek sisa RAM
        uptime: formatUptime(os.uptime()) // dalam detik
        // mengecek lama uptime
    }

    if (stats.freeMem < 0.1) { // < 100mb
        console.warn("Memory Kritis!");
        //Trigger cleanup process
    }

    for (let data in stats) {
        console.log(stats[data])
    }
}, 5000)