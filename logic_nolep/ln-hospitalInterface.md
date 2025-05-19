# Logic Nolep (Hospital Interface)

Bungkus isi dari tugas ini jadi folder hospital. disini kita menyimpan data menggunakan .json

*Hospital Interface: Aplikasi CRUD Sederhana*

**Deskripsi**:
Kalian akan membuat aplikasi backend sederhana menggunakan terminal interface. kita akan mengatur input command dengan process.argv, dan menyesuaikan command tersebut di function function controller.
disini gua bakal jelasin part part yang kalian harus kerjakan di setiap file, karena kita menggunakan konsep MVC.

kita akan memakai penyimpanan data temporary berupa json file :

- employee.json = penyimpanan untuk data employee
- patient.json = penyimpanan untuk data pasien

kita mempunya 2 role karyawan:
- dokter = yang punya akses buat ngatur pasien data
- admin = yang bisa mengatur semua akses, dia bisa get semua data karyawan

**index.js**
File ini yang akan kita eksekusi di command , dan menangkap semua process argv dari comman yang ada, disini kita bakal handling condition setiap command. jadi ketika kita ketik:
```
node index.js
```
maka akan keluar command list (ini wajib lewat controller dan view) tidak boleh hard code dari index.js
```
==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>
```
sesuai dari command list , jadi kalian akan eksekusi command lagi untuk menjalankan fitur ini.
setiap command hanya boleh melakukan logic di dalam file class controller, dan method method di controller ini static, jadi bisa di akses di index.js tanpa constructor.

Template `index.js` 
```js
let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

// HOSPITAL INTERFACE COMMAND
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>

NOTE :

1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
2. TIDAK BISA LOGIN BERSAMAAN.
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.

*/

switch (command) {
    case "register":
        HospitalController.register(argument[0], argument[1], argument[2]);
        break;
    
    // buatlah semua command
    default:
        HospitalController.help();
        break;
}
```
<br/>

**controller.js**

file controller inilah yang akan kalian handle logic logic dari command yang di berikan, jika command register maka kalian akan melakukan logic insert data ke model. model ini wajib beruba class instance jadi seakan akan data ini mempunya schema. kalian tidak boleh mengubah JSON langsung di dalam controller. wajib lewat model.

```js
let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        });
    }

    // lanjutkan command yang lain
}


module.exports = HospitalController;
```

**patient.js dan employee.js**

ini file yang akan kalian pakai sebagai model, file model ini berfungsi untuk melakukan perubahan pada data json kita, jadi disini kalian akan sering read/write file json yang akan kita jadikan sebagai penyimpanan. setiap command WAJIB memakai asynchronous jadi bole pake callback, promise , atau async/await. disini gua contohin pake callback.

**employee.js**
```js
let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Employee(name, password, role)
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        })
      }
    });
  }

  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }
 

}



module.exports = Employee;
```
<br/>

**view.js**

File ini berfungsi untuk memberikan visualisasi dari hasil logic controller kalian, apapun output yang ada di terminal wajib di handle sama file ini. kalian tidak boleh log di controller/model/index.js

```js
class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    
    // lanjutkan method lain
}


module.exports = HospitalView;
```
