const os = require('os');
const axios = require('axios')

let isMonitoring = false;

//formatting utilities
function formatBytes(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
    //konversi bytes ke megabyte untuk pembacaan mudah
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    return `${days}d ${hours}h`
    //uptime dalam format hari-jam
}

//bangun fungsi monitoring
function startMonitorinng(interval = 10000) {
    if (isMonitoring) return; //cegah agar setInterval tidak dijalankan 2x

    isMonitoring = true; //tandai bahwa monitoring sudah aktif

    const timer = setInterval(() => {
        const stats = {
            uptime: formatUptime(os.uptime()),
            totalMem: formatBytes(os.totalmem()),
            usedMem: formatBytes(os.totalmem() - os.freemem()),
            freeMem: formatBytes(os.freemem()),
            loadAvg: os.loadavg().map(n => n.toFixed(2)) // cpu load
        };

        console.log(`
        === System Monitor ===
        Uptime: ${stats.uptime}
        Memory Usage:
            Total   : ${stats.totalMem}
            Used    : ${stats.usedMem}
            Free    : ${stats.freeMem}
        CPU Load (1, 5, 15m) : [${stats.loadAvg.join(", ")}]
            `);

        //auto shutdown jika memory < 100mb
        if (os.freemem() < 100 * 1024 * 1024) {
            console.warn('Memory critical! Shutting down...');
            clearInterval(timer);
            process.exit(1)
        }
    }, interval)
    return timer
}

//implementasi & error handling
try {
    const monitor = startMonitorinng();
    //menjalankan monitoring secara otomatis dan berulang, karena didalamnya ada setInterval(...) yang mengatur timer loop

    //handle graceful shutdown
    process.on('SIGINT', () => { //menangkap saat user tekan Ctrl + C di terminal
        clearInterval(monitor); //menghentikan interval agar monitoring berhenti
        console.log('Monitoring stopped');
        process.exit(); //keluar dari aplikasi dengan bersih
    });
} catch (error) {
    console.error('Monitoring failed:', error)
}

async function checkServerHealth() {
    try {
        const response = await axios.get('http://localhost:3000/health');
        console.log('Server Health:', response.data)
    } catch (error) {
        console.error('Server unreachable')
    }
}

// Tambahkan ke interval
setInterval(checkServerHealth, 15000);

module.exports = { formatBytes }
