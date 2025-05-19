# Linux Ubuntu (WSL2 Windows)

## Apa itu Unbuntu

Ubuntu adalah sistem operasi (OS) yang dikembangkan dari program inti (kernel) Linux. Itulah kenapa Ubuntu juga sering disebut Linux Ubuntu.
Ubuntu pertama kali dirilis pada tahun 2004 oleh perusahaan bernama Canonical. Perusahan tersebut didirikan oleh Mark Shuttleworth beserta tim yang awalnya adalah developer OS Debian.
Mark dan timnya ingin membuat OS berbasis Linux yang mudah dan gratis. Maka, lahirlah sistem operasi Ubuntu yang bersifat open source. Siapapun boleh menggunakan Ubuntu secara gratis dan bebas mengembangkannya.

## Subsistem (WSL)

Subsistem Windows untuk Linux (WSL) adalah fitur Windows yang memungkinkan Anda menjalankan lingkungan Linux di komputer Windows Anda, tanpa perlu komputer virtual terpisah atau booting ganda. WSL dirancang untuk memberikan pengalaman yang mulus dan produktif bagi pengembang yang ingin menggunakan Windows dan Linux secara bersamaan.

## WSL2

WSL 2 adalah jenis distro default saat menginstal distribusi Linux. WSL 2 menggunakan teknologi virtualisasi untuk menjalankan kernel Linux di dalam komputer virtual (VM) utilitas ringan. Distribusi Linux berjalan sebagai kontainer terisolasi di dalam VM terkelola WSL 2. 
Distribusi Linux yang berjalan melalui WSL 2 akan berbagi namespace jaringan yang sama, pohon perangkat (selain /dev/pts), CPU/Kernel/Memory/Swap, /init biner, tetapi memiliki namespace PID mereka sendiri, Namespace mount, Namespace pengguna, namespace layanan Cgroup, dan init proses.

WSL 2 meningkatkan performa sistem file dan menambahkan kompatibilitas panggilan sistem penuh dibandingkan dengan arsitektur WSL 1. Pelajari selengkapnya tentang bagaimana WSL 1 dan WSL 2 dibandingkan.

## Cara install

***INI DIKUSUSKAN UNTUK PARA PENGGUNA WINDOWS KARNA KITA AKAN BANYAK BERMAIN DI KERNEL***

Pertama - tama kita perlu setting windows kita terlebi dahulu sebelum menginstallnya :

1. buka control `panel -> Programs -> Program and Features -> Turn Windows features on or off`
![image](https://github.com/user-attachments/assets/f593c19f-4cde-44dc-9184-879219fa76b1)

2. Setelah terbuka Windows Features, Cari ***Windows Subsystem for Linux*** dan centang , lalu klik OK. 
![image](https://github.com/user-attachments/assets/69b383d8-a9b9-429e-98d0-ee5330ec0794)
Setelah itu kalian akan di minta merestart komputer kalian dan silahkan restart now

3. Setelah Restart dan pc kalian menyala buka cmd dan tulis `bash` untuk mengecek setingannya, jika berhasil akan memberikan message seperti di bawah ini
![image](https://github.com/user-attachments/assets/3cab12df-79eb-439b-adff-d59bf32fe050)

4. Setelah di cek kita akan menginstall WSL2 di Microsoft Store  dan download Ubuntu (**untuk versi kalian bebas milih disarankan menggunakan versi yang sudah LTS**)

5. Setelah download silahkan buka Ubuntu launchernya, bisa di cari di search pada windows ( atau `⊞ Win` + `S` ) lalu ketik Ubuntu maka nanti akan muncul
![image](https://github.com/user-attachments/assets/2509fe9a-c29a-4a06-bc43-1e20eba65592)

6. Jika kalian sudah masuk terminal dan ada error `Error: 0x800701bc` itu berarti kalian masih menggunakan wsl 1, maka kalian perlu install wsl2 di link yang di tunjukan pada terminal atau kalian bisa klik disisni `https://aka.ms/wsl2kernel`
   lalu kalian bisa ikuti `Step 4` pada web tersebut. lalu download file insaller wsl dan jalankan instaler tersebut. dan jalankan ubuntu terminal kemabil

7. Jika sudah di jalankan dan tidak ada error maka kalian akan masukkan UNIX username dan password untuk terminal kalian
   ![image](https://github.com/user-attachments/assets/bc981c9c-2768-482b-8295-2dca22ce895c)
   jika sudah maka ada install sebentar dan selesai Ubuntu Wsl kalian bisa di gunakan

# Setup Node js in Ubuntu

1. Buka terminal ubuntu
2. jalankan perintah di bawah
   ```
   sudo apt install nodejs
   ```
3. jalankan peritah berikut untuk mengecek instalasi berhasil atau tidak
   ```
   node -v or node --version
   ```
   maka nanti akan menunjukan versi node js kalian

# Menjalankan Code Node js

1. buat folder baru kalian untuk menaruh code
   ```
   mkdir 'nama folder'
   ```

2. masuk ke folder tersebut dengan menggunakan perintah
   ```
   cd 'nama folder'
   ```

3. buat file js kalian.
   ```
   touch 'namaFile'.js
   ```

4. periksa file kalian terbuat atau tidak menggunakan perintah `ls`
   ![image](https://github.com/user-attachments/assets/e929e1b6-55c9-43df-a063-d1d445ca0adc)

5. jika ada maka kalian berhasil membuat file js kalian

***Jika Ining menggunakan VScode di linux***
```
code .
```

Konfigurasi WSL ini ditujukan untuk murid yang menggunakan Windows saja, karena phase 1 ini dianjurkan kalian memakai ekosistem terminal linux agar mengerti dan memakai command command dari linux. Linux ini penting sekali untuk pembelajaran backend, karenan nantinya kalian akan menggunakan OS linux untuk kebutuhan deploying server backend ke VPS, Local Server ataupun Cloud Server.

## Pengguna selain windows (boleh skip materi ini)
Ya, jika kalian pengguna OS linux dari awal atau kalian memakai MAC OS kalian bisa skip materi ini. 


