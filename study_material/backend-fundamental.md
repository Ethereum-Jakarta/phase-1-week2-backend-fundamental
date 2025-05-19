# Backend-Fundamental-MVC 

Welcome to week 2 ges, gimana week 1 nya ? sudah merasa kepala kalian mau meledak ? sayangnya kalian tidak bisa berhenti 😈 . Justru di week 2 ini semua yang kalian pelajarin dari sebelumnya bakal sangat berguna, karna sudah saatnya kita belajar pemrograman yang sesungguhnya. Di week 2 kita mulai belajar konsep backend, dasar dasar yang perlu diketahui tentang backend dan belajar gimana proses logic di belakang di setiap apps. kita bakal kupas lebih dalam lagi tentang Node js dan seberapa powerful Node js dalam handle backend. Jadi week 2 - 4 ini sudah fokus ke backend development menggunakan Node Js. Kalian bakal jarang ketemu soal logic lagi di week ini dan seterusnya, hanya  ada beberapa refresh logic untuk membuat kalian tetep konsisten dengan algo algo yang sudah dipelajarin.

Kita bakal mulai materi pertama kita dengan belajar node js theory

## _**Node Js Theory**_

Node.js adalah sebuah lingkungan runtime yang memungkinkan Kalian menjalankan JavaScript di sisi server atau backend. Biasanya, JavaScript digunakan di sisi klien atau frontend dalam browser untuk membuat interaksi yang dinamis dan responsif di situs web. Namun, dengan Node.js, Kalian dapat menjalankan JavaScript di sisi server juga, memungkinkan Kalian untuk mengembangkan aplikasi web berkinerja tinggi dan skala besar.

Bagaimana Node.js Bekerja:
Node.js dibangun di atas mesin V8 JavaScript yang dikembangkan oleh Google. Mesin V8 ini bertanggung jawab untuk mengeksekusi kode JavaScript dengan cepat. Node.js sendiri memiliki fitur-fitur seperti event loop, non-blocking I/O, dan model asinkron yang memungkinkan aplikasi berjalan efisien dengan menghindari blocking yang dapat menghambat kinerja.

Prinsip utama di balik Node.js adalah pendekatan non-blocking I/O. Ini berarti bahwa operasi yang memerlukan waktu, seperti membaca atau menulis dari berkas atau berkomunikasi dengan database, tidak akan memblokir eksekusi kode lain. Sebaliknya, Node.js akan melanjutkan eksekusi kode lain yang tidak terkait dengan operasi yang sedang berlangsung. Ini memungkinkan Node.js untuk menangani banyak permintaan secara bersamaan tanpa perlu mengalami bottleneck.

Mengapa Harus Belajar Node.js:
Ada beberapa alasan mengapa belajar Node.js sangat bermanfaat:

1. **Konsistensi Bahasa**: Jika Kalian sudah terbiasa dengan JavaScript di sisi klien (frontend), belajar Node.js memungkinkan Kalian menggunakan bahasa yang sama di seluruh stack teknologi Kalian, dari frontend hingga backend.

2. **Efisiensi**: Model asinkron dan non-blocking I/O memungkinkan aplikasi Node.js untuk mengatasi banyak permintaan secara bersamaan dengan penggunaan sumber daya yang lebih sedikit.

3. **Skalabilitas**: Node.js cocok untuk aplikasi berkinerja tinggi dan skala besar karena kemampuannya dalam menangani banyak permintaan secara bersamaan.

4. **Library Modul**: Node.js memiliki repositori library modul yang luas (npm) yang memungkinkan Kalian menggunakan kode yang sudah ada untuk mempercepat pengembangan.

Node.js untuk Apa Saja:
Node.js digunakan dalam berbagai skenario, termasuk:

- **Aplikasi Web**: Node.js dapat digunakan untuk mengembangkan backend aplikasi web, baik itu situs web sederhana hingga platform sosial berukuran besar.

- **Aplikasi Real-Time**: Node.js sangat cocok untuk aplikasi real-time seperti chatting, game online, dan aliran data secara langsung.

- **Microservices**: Dalam arsitektur mikro layanan, Node.js dapat digunakan untuk mengembangkan layanan backend yang independen dan berskala sesuai kebutuhan.

- **Aplikasi IoT**: Node.js dapat digunakan untuk mengendalikan perangkat Internet of Things (IoT) karena kemampuannya dalam menangani banyak koneksi sekaligus.

- **Aplikasi Jaringan**: Node.js dapat digunakan untuk mengembangkan aplikasi jaringan seperti server proxy, server DNS, atau alat-alat jaringan lainnya.

<br/>

## _**Node Js untuk Backend Development**_

Node.js sangat populer digunakan untuk pengembangan backend, terutama karena kemampuannya dalam menangani banyak permintaan secara asinkron dan dalam waktu yang singkat. Berikut adalah penjelasan lebih lanjut tentang penggunaan Node.js untuk pengembangan backend:

1. **Server Development**: Dengan Node.js, Kalian dapat membuat server HTTP untuk menangani permintaan dari klien. Kalian dapat menggunakan library bawaan seperti http atau kerangka kerja (framework) populer seperti Express.js untuk mempermudah pengembangan server.

- **Asynchronous Programming**: Di dunia backend, banyak operasi yang memerlukan waktu, seperti mengakses database atau membaca berkas. Dalam kasus ini, Node.js sangat berguna karena model asinkronnya. Operasi-operasi ini tidak akan memblokir eksekusi kode lain, sehingga memungkinkan server untuk tetap responsif terhadap permintaan lainnya.

- **API Development**: Node.js memungkinkan Kalian untuk mengembangkan API (Application Programming Interface) yang digunakan oleh aplikasi frontend atau klien lainnya. Kalian dapat merancang API yang melayani data dalam format JSON atau XML, serta mengelola permintaan POST, GET, PUT, dan DELETE.

- **Real-Time Applications**: Jika Kalian ingin mengembangkan aplikasi real-time seperti chatting, kolaborasi, atau pembaruan data yang instan, Node.js adalah pilihan yang baik. Kalian dapat menggunakan library seperti Socket.IO untuk memudahkan komunikasi real-time antara server dan klien.

- **Microservices**: Dalam arsitektur mikro layanan, Kalian dapat menggunakan Node.js untuk mengembangkan layanan backend yang independen dan dapat diskalakan secara individual. Hal ini memungkinkan Kalian untuk membangun sistem yang lebih modular dan mudah dikelola.

- **Server-Side Rendering (SSR)**: Dengan Node.js, Kalian dapat merender tampilan halaman di sisi server sebelum mengirimkannya ke klien. Ini sangat berguna dalam meningkatkan kinerja dan SEO pada aplikasi web Kalian.

- **Proxy Server**: Node.js dapat digunakan untuk mengembangkan proxy server yang mengarahkan permintaan dari klien ke berbagai sumber daya, seperti server API eksternal, untuk menghindari masalah kebijakan lintas domain (CORS).

- **Caching**: Node.js memungkinkan Kalian mengimplementasikan sistem caching untuk mempercepat akses ke data yang sering diminta.

- **Authentication and Security**: Kalian dapat mengimplementasikan lapisan keamanan dan autentikasi di server menggunakan Node.js, memastikan bahwa hanya pengguna yang sah yang dapat mengakses sumber daya.

- **Database Connectivity**: Node.js memiliki library untuk terhubung ke berbagai jenis database, seperti MongoDB, MySQL, PostgreSQL, dan lainnya, sehingga memudahkan pengelolaan data backend.

Dalam pengembangan backend menggunakan Node.js, Kalian juga dapat memanfaatkan ekosistem library melalui npm (Node Package Manager) untuk mengakses berbagai alat dan fitur yang mempercepat proses pengembangan.
