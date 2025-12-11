// membuat memory monitoring system

/* objektif:
- cek memori usage tiap 10 detik
- readable format
- menampilan uptime server
*/

const os = require('os');
const chalk = require('chalk');
let isMonitoring = false;

// membuat format utilities

function formatBytes(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatUpTime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);

    return `${days}d ${hours}h`;
}

/* penjelasan:
- konversi bytes ke megabytes untuk pembacaan mudah
- uptime dalam format hari-jam 
*/

// membangun fungsi monitoring

function startMonitoring(interval = 10000){
    if (isMonitoring) return;

    isMonitoring = true;

    const timer = setInterval(() => {
        const stats = {
            uptime: formatUpTime(os.uptime()),
            totalMem: formatBytes(os.totalmem()),
            usedMem: formatBytes(os.totalmem() - os.freemem()),
            freeMem: formatBytes(os.freemem()),
            loadAvg: os.loadavg().map(n => n.toFixed(2)) // cpu load averages
        };

        console.log(chalk.blueBright(`
            === System Monitor ===
            Uptime: ${stats.uptime}
            Memory Usage:
                Total : ${stats.totalMem}
                Used  : ${stats.usedMem}
                Free  : ${stats.freeMem}
            CPU Load (1, 5, 15m): [${stats.loadAvg.join(', ')}]
        `));

        // auto shutdown jika memory < 100MB
        if (os.freemem() < 100 * 1024 * 1024) {
            console.warn('Memory critical! Shutting down...');
            clearInterval(timer);
            process.exit(1);
        }

    }, interval);

    return timer;
}

// implementasi error handling

try {
    const monitor = startMonitoring();

    // handle graceful shutdown
    process.on('SIGINT', () => {
        clearInterval(monitor);
        console.log(chalk.green('Monitoring Stopped'));
        process.exit();
    });
} catch (error) {
    console.log('Monitoring failed:', error);
}

// endpoint server
const axios = require('axios');

async function checkServerHEalth() {
    try {
        const response = await axios.get('http://localhost:3000/health');
        console.log('Server Health:', response.data);
    } catch (error){
        console.log(chalk.bold.red('Server unreachable'));
    }
}

// tambah ke interval
setInterval(checkServerHEalth, 15000);