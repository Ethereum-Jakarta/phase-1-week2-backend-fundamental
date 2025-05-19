# Node Js Internal Modules

Modul bawaan Node.js adalah "senjata utama" backend developer untuk membangun aplikasi server yang efisien. Mari eksplorasi dengan pendekatan praktis dan konteks dunia nyata.

---

## 1. **fs (File System) - Sang Manajer File**
**Apa itu?**  
Modul untuk berinteraksi dengan sistem file (baca/tulis/hapus file).

**Mengapa penting?**  
- Membuat log sistem
- Penyimpanan lokal sederhana
- Membaca konfigurasi server
- Backup data

**Analogi:** Seperti asisten kantor yang mengatur arsip dokumen perusahaan.

### Use Case & Contoh Kode:
```javascript
const fs = require('fs');
const path = require('path');

// Sync: Hanya untuk inisialisasi awal
try {
  const config = fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8');
  console.log('Konfigurasi server:', JSON.parse(config));
} catch (error) {
  console.error('Gagal baca config:', error);
}

// Async: Untuk operasi runtime
fs.promises.writeFile('server.log', `${new Date()} - Server started\n`, { flag: 'a' })
  .then(() => console.log('Log berhasil ditambahkan'))
  .catch(err => console.error('Error logging:', err));
```

**Best Practice:**  
- Gunakan sync hanya saat startup (e.g., baca config)
- Selalu prefer async + promise untuk operasi runtime
- Handle error dengan try-catch (sync) atau .catch() (async)

---

## 2. **path - Navigator File System**
**Apa itu?**  
Tools untuk memanipulasi path file/direktori.

**Mengapa penting?**  
- Menghindari bug cross-platform (Windows vs Linux)
- Membuat path yang dinamis dan aman
- Memisahkan nama file dari ekstensi

**Analogi:** Seperti GPS yang selalu tahu rute terbaik di OS manapun.

### Use Case & Contoh Kode:
```javascript
const path = require('path');

// Membuat path dinamis untuk multi-environment
const dataPath = path.join(__dirname, 'database', process.env.NODE_ENV, 'data.db');
console.log('Database path:', dataPath); // /app/database/production/data.db

// Ekstrak komponen path
const uploadedFile = '/users/john/uploads/profile.jpg';
console.log('File name:', path.basename(uploadedFile)); // profile.jpg
console.log('Ekstensi:', path.extname(uploadedFile)); // .jpg
```

**Real World Scenario:**  
Membangun path untuk upload file user yang aman di semua sistem operasi.

---

## 3. **http - Jantung Node.js Backend**
**Apa itu?**  
Modul untuk membuat web server dan handle HTTP request.

**Mengapa penting?**  
- Membuat REST API
- Web server custom
- Proxy server
- Integrasi dengan microservices

**Analogi:** Seperti resepsionis hotel yang menerima tamu dan mengarahkan ke kamar yang tepat.

### Use Case & Contoh Kode:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Routing sederhana
  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  } else {
    res.writeHead(404);
    res.end('Route not found');
  }
});

server.listen(3000, () => {
  console.log('API server running on port 3000');
});
```

**Level Up:**  
Ini adalah dasar dari framework seperti Express.js. Semua web framework Node.js menggunakan modul http di belakang layar.
Jadi kalau kalian mau buat server REST API native menggunakan module bawaaan http adalah toolsnya.

Pemahaman kalian tentang http ini bisa jadi penghubung baik buat nantinya belajar di week3 tentang express.js

---

## 4. **os - Dokter Sistem**
**Apa itu?**  
Modul untuk memonitor dan berinteraksi dengan sistem operasi.

**Mengapa penting?**  
- Monitoring kesehatan server
- Load balancing
- Optimasi resource
- Debugging performance

**Analogi:** Seperti dashboard kontrol pesawat yang menampilkan status mesin.

### Use Case & Contoh Kode:
```javascript
const os = require('os');

setInterval(() => {
  const stats = {
    cpuUsage: os.loadavg(), // Load average 1, 5, 15 menit
    freeMem: os.freemem(), // Memory tersedia dalam bytes
    uptime: os.uptime() // Dalam detik
  };
  
  if (stats.freeMem < 100 * 1024 * 1024) { // < 100MB
    console.warn('Memory kritis!');
    // Trigger cleanup process
  }
}, 5000); // Check setiap 5 detik
```

**Real Application:**  
Membuat health check endpoint untuk monitoring server.

---

## 5. **util - Kotak Peralatan Serbaguna**
**Apa itu?**  
Koleksi utility function untuk membantu development.

**Mengapa penting?**  
- Konversi callback ke promise
- Debugging object complex
- Formatting text

**Contoh Power Use:**
```javascript
const util = require('util');
const fs = require('fs');

// Convert callback function to promise
const readFileAsync = util.promisify(fs.readFile);

// Modern async/await pattern
async function processFile() {
  try {
    const data = await readFileAsync('data.txt', 'utf8');
    console.log(util.inspect(data, { depth: null })); // Debug object dalam
  } catch (error) {
    console.error(util.format('Error: %s', error.message));
  }
}
```

**Why Matters?**  
Memungkinkan pola coding modern async/await untuk kode yang lebih bersih.

---

## **Sync vs Async: Memilih Senjata Tepat**
**Analog Perang:**  
- Sync: Seperti pasukan yang bergerak formasi rapat (teratur tapi lambat)
- Async: Seperti gerilyawan yang bergerak cepat dan independen

**Gunakan Sync ketika:**  
- Startup configuration
- CLI scripts
- Situasi dimana blocking tidak masalah

**Gunakan Async ketika:**  
- Handling request HTTP
- Operasi I/O intensif
- Aplikasi real-time

**Contoh Keputusan:**  
```javascript
// ❌ Buruk di web server
app.get('/data', (req, res) => {
  const data = fs.readFileSync('large-file.json'); // Blocking!
  res.send(data);
});

// ✅ Baik
app.get('/data', async (req, res) => {
  try {
    const data = await fs.promises.readFile('large-file.json');
    res.send(data);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
```

---

## **Kenapa Belajar Modul Bawaan?**
1. **Fundamental Skills**  
Framework seperti Express.js dibangun di atas modul ini. Memahami dasar akan membuat debug lebih mudah.

2. **Performance Optimization**  
Dengan memahami operasi file system atau memory management, Kalian bisa menulis kode lebih efisien.

3. **Custom Solution**  
Terkadang framework terlalu berat, untuk microservices sederhana cukup modul bawaan.

4. **Interview Favorite**  
Banyak pertanyaan teknis Node.js berfokus pada modul inti ini.

---

# **Studi Kasus: Membangun Logger Server & Monitoring System**

## **Challenge 1: HTTP Server dengan Request Logging**

### **Objective:**
Membuat server web yang mencatat semua aktivitas request ke dalam file log, dengan kemampuan:
- Mencatat timestamp, method HTTP, URL, dan IP client
- Menyimpan log ke file tanpa mengganggu respons server
- Handle routing dasar

### **Step Development:**

#### **1. Inisialisasi Project**
```bash
mkdir logger-server
cd logger-server
npm init -y
touch server.js
```

Ini command untuk set up folder project, kalian bisa melakukan manual seperti diatas atau set up langsung di direktori vscode.

#### **2. Import Module Required**
```javascript
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
```

**Penjelasan:**
- `http` untuk membuat server
- `fs.promises` untuk operasi file async/await
- `path` untuk konstruksi path yang aman

#### **3. Buat HTTP Server Dasar**
```javascript
const server = http.createServer(async (req, res) => {
  // Logic akan ditambahkan disini
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

#### **4. Bangun Fungsi Logging**
```javascript
async function logRequest(req) {
  const timestamp = new Date().toISOString();
  const logData = `[${timestamp}] ${req.method} ${req.url} FROM ${req.socket.remoteAddress}\n`;
  
  const logPath = path.join(__dirname, 'requests.log');
  
  try {
    await fs.appendFile(logPath, logData);
  } catch (error) {
    console.error('Logging error:', error);
  }
}
```

**Best Practice:**
- Gunakan `path.join` untuk kompatibilitas cross-platform
- `appendFile` dengan flag 'a' untuk menambahkan log tanpa overwrite

#### **5. Implementasi di Request Handler**
```javascript
server.on('request', async (req, res) => {
  // Jalankan logging tanpa menunggu
  logRequest(req);

  // Handle response
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page');
  } else {
    res.writeHead(404);
    res.end('Page Not Found');
  }
});
```

**Poin Penting:**
- Tidak perlu `await` untuk logRequest agar response tetap cepat
- Error handling sudah ada di dalam fungsi logRequest

#### **6. Testing**
1. Jalankan server: `node server.js`
2. Akses di browser:
   - http://localhost:3000
   - http://localhost:3000/about
3. Cek file `requests.log` yang terbuat

**Contoh Output Log:**

![image](https://github.com/user-attachments/assets/0d63a225-03d2-4361-a9c0-1d8f713d9b91)

```
[2025-02-24T10:43:12.777Z] GET / FROM ::1
```

---

## **Challenge 2: Memory Monitoring System**

### **Objective:**
Membuat sistem monitoring yang:
- Mengecek memory usage tiap 10 detik
- Menampilkan dalam format mudah dibaca
- Menampilkan uptime server

### **Step Development:**

#### **1. Buat File Baru (di folder yang sama)**
```bash
touch monitor.js
```

#### **2. Import Module Required**
```javascript
const os = require('os');
let isMonitoring = false;
```

#### **3. Buat Formatting Utilities**
```javascript
function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  return `${days}d ${hours}h`;
}
```

**Penjelasan:**
- Konversi bytes ke megabyte untuk pembacaan mudah
- Uptime dalam format hari-jam

#### **4. Bangun Fungsi Monitoring**
```javascript
function startMonitoring(interval = 10000) {
  if (isMonitoring) return;
  
  isMonitoring = true;
  
  const timer = setInterval(() => {
    const stats = {
      uptime: formatUptime(os.uptime()),
      totalMem: formatBytes(os.totalmem()),
      usedMem: formatBytes(os.totalmem() - os.freemem()),
      freeMem: formatBytes(os.freemem()),
      loadAvg: os.loadavg().map(n => n.toFixed(2)) // CPU load averages
    };
    
    console.log(`
=== System Monitor ===
Uptime: ${stats.uptime}
Memory Usage:
  Total : ${stats.totalMem}
  Used  : ${stats.usedMem}
  Free  : ${stats.freeMem}
CPU Load (1, 5, 15m): [${stats.loadAvg.join(', ')}]
    `);
    
    // Auto-shutdown jika memory < 100MB
    if (os.freemem() < 100 * 1024 * 1024) {
      console.warn('Memory critical! Shutting down...');
      clearInterval(timer);
      process.exit(1);
    }
  }, interval);

  return timer;
}
```

#### **5. Implementasi & Error Handling**
```javascript
try {
  const monitor = startMonitoring();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    clearInterval(monitor);
    console.log('Monitoring stopped');
    process.exit();
  });
} catch (error) {
  console.error('Monitoring failed:', error);
}
```

#### **6. Eksekusi**
```bash
node monitor.js
```

**Sample Output:**
```
=== System Monitor ===
Uptime: 0d 5h
Memory Usage:
  Total : 16384.00 MB
  Used  : 4523.45 MB
  Free  : 11860.55 MB
CPU Load (1, 5, 15m): [1.23, 1.45, 1.12]
```

![image](https://github.com/user-attachments/assets/0a45e7a2-e021-45f1-bca1-8213433c01f4)

wwkkww ini mac gua , 75 hari ga pernah mati.

---

## **Integrasi Kedua Sistem (Bonus)**

1. Tambahkan endpoint monitoring di server:
```javascript
// Di dalam request handler
if (req.url === '/health') {
  const memory = {
    total: formatBytes(os.totalmem()),
    used: formatBytes(os.totalmem() - os.freemem()),
    free: formatBytes(os.freemem())
  };
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(memory));
}
```

2. Modifikasi monitor.js untuk baca dari endpoint:
```javascript
const axios = require('axios');

async function checkServerHealth() {
  try {
    const response = await axios.get('http://localhost:3000/health');
    console.log('Server Health:', response.data);
  } catch (error) {
    console.error('Server unreachable');
  }
}

// Tambahkan ke interval
setInterval(checkServerHealth, 15000);
```

---

## **Learning Outcomes**

1. **Konsep I/O Non-blocking:**
   - Bagaimana logging tidak menghambat response server
   - Implementasi async/await dengan fs.promises

2. **Resource Management:**
   - Teknik monitoring resource server
   - Konversi satuan bytes ke format manusiawi

3. **Error Handling:**
   - Try/catch untuk operasi file
   - Graceful shutdown dengan SIGINT handler

4. **Real-world Pattern:**
   - Log rotation (bisa dikembangkan dengan rename file tiap hari)
   - Alert system untuk kondisi kritis

---

**Latihan Lanjutan (optional):**
1. Tambahkan warna pada console output menggunakan library `chalk`
2. Implementasi log rotation dengan batas 10MB/file
3. Tambahkan monitoring disk space

Dengan menyelesaikan studi kasus ini, kalian telah mempraktikkan konsep fundamental backend development menggunakan modul inti Node.js dalam skenario nyata.

Kalian telah membangun fondasi kuat untuk menjelajahi ekosistem Node.js lebih dalam! 🚀
