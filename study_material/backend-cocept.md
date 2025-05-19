# Backend Concept 

`Backend Development` adalah proses pembuatan dan pengelolaan komponen dari sebuah aplikasi yang tidak terlihat oleh pengguna akhir, tetapi sangat penting untuk menjalankan fungsionalitas dan logika di balik layar. Ini melibatkan pengembangan server, pengolahan data, manajemen database, dan semua logika yang diperlukan agar aplikasi berfungsi dengan baik.

Dalam pengembangan backend, beberapa hal yang dilakukan meliputi:

1. **Server Creation**: Membuat server yang menerima dan mengelola permintaan dari klien (seperti browser) adalah langkah penting dalam pengembangan backend. Node.js adalah salah satu teknologi yang populer digunakan untuk tujuan ini.

2. **Routing**: Mengatur rute atau endpoint yang menghubungkan permintaan klien dengan kode yang akan dieksekusi di server. Penggunaan library seperti Express.js mempermudah pengelolaan rute.

3. **Business Logic**: Ini adalah inti dari aplikasi backend. Di sini, Kalian mengimplementasikan logika bisnis, pemrosesan data, pengolahan transaksi, validasi, dan segala hal yang mengatur bagaimana aplikasi berperilaku sesuai dengan kebutuhan fungsionalnya.

4. **Database Management**: Backend development melibatkan interaksi dengan database. Kalian menggunakan library untuk menghubungkan, mengambil, menyimpan, dan memanipulasi data dalam database. Contoh library adalah Mongoose untuk MongoDB dan Sequelize untuk SQL databases.

5. **Authentication and Authorization**: Pengembangan backend juga berfokus pada otentikasi (authentication) dan otorisasi (authorization) pengguna. Ini mencakup implementasi login, pembuatan token, pengelolaan sesi, dan kontrol akses ke sumber daya.

6. **API Development**: Membangun API (Application Programming Interface) adalah bagian penting dari backend development. API memungkinkan klien, seperti aplikasi frontend atau perangkat lain, berkomunikasi dengan server untuk mengakses atau memanipulasi data.

7. **Error Handling**: Menangani dan memberikan respons yang tepat ketika terjadi kesalahan dalam proses backend adalah hal yang penting. Ini termasuk mengirim kode status HTTP yang sesuai dan pesan kesalahan yang informatif.

8. **Security**: Backend development juga berfokus pada keamanan. Ini mencakup perlindungan terhadap serangan seperti SQL injection, cross-site scripting (XSS), dan lainnya.

9. **Caching**: Implementasi mekanisme caching pada backend untuk mempercepat respons dan mengurangi beban pada server.

10. **Deployment**: Setelah pengembangan selesai, Kalian perlu mendeploy aplikasi backend Kalian agar dapat diakses oleh pengguna. Ini melibatkan konfigurasi server, manajemen lingkungan, dan memastikan aplikasi berjalan lancar.

## MVC Fundamental
Kita akan memakai arsitektur MVC untuk pembelajaran kita pada dasar dasar backend.

```
         +-------------------+
         |       Browser     |
         +-------------------+
                  |
                  v
         +-------------------+
         |       View        |    <---- CSS Styling
         +-------------------+
                  |
                  v
         +-------------------+
         |     Controller    |    <---- Application Logic (JavaScript)
         +-------------------+
                  |
                  v
         +-------------------+
         |      Model        |    <---- Data Management
         +-------------------+
                  |
                  v
         +-------------------+
         |     Database      |    <---- Data Storage
         +-------------------+
```

1. **Browser**: Ini adalah tempat di mana pengguna mengakses aplikasi melalui antarmuka web.

2. **View**: View bertanggung jawab untuk tampilan yang dilihat oleh pengguna. Di sinilah HTML dan CSS bekerja. CSS (Cascading Style Sheets) digunakan untuk mengatur tampilan, gaya, dan tata letak elemen-elemen di halaman.

3. **Controller**: Controller mengatur logika aplikasi dan berinteraksi dengan view dan model. Biasanya ditulis dalam bahasa JavaScript. Di dalam kontroller, Kalian mengatur bagaimana tampilan merespons interaksi pengguna dan berkomunikasi dengan model.

4. **Model**: Model adalah representasi struktural dari data. Ini mengelola data dan logika terkait data. Dalam konteks pengembangan web, model dapat berhubungan dengan database dan memanipulasi data.

5. **Database**: Ini adalah tempat di mana data aplikasi disimpan dan diambil. Model berkomunikasi dengan database untuk menyimpan atau mengambil informasi yang diperlukan oleh aplikasi.

Konsep arsitektur MVC memisahkan logika aplikasi menjadi tiga komponen utama: Model, View, dan Controller. Ini memungkinkan pengembang untuk mengelola kode dengan lebih terstruktur dan memungkinkan perubahan dalam satu komponen tanpa mempengaruhi yang lainnya. CSS digunakan untuk mengatur tampilan visual aplikasi, termasuk tata letak, warna, font, dan gaya lainnya, untuk menciptakan pengalaman pengguna yang menarik dan responsif.

Penting untuk diingat bahwa visualisasi ini adalah gambaran umum dan sederhana. Dalam pengembangan nyata, komponen-komponen ini mungkin memiliki lebih banyak detail dan ketergantungan satu sama lain yang lebih kompleks.
