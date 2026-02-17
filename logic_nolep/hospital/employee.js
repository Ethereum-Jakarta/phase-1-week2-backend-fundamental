let fs = require("fs");

class Employee {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role; // role: 'dokter' atau 'admin'
    this.login = false;
  }

  static register(name, password, role, cb) {
    // Validasi role hanya boleh 'dokter' atau 'admin'
    if (role !== 'dokter' && role !== 'admin') {
      cb('Role harus dokter atau admin');
      return;
    }
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        // Cek apakah username sudah ada
        const isExist = data.some(emp => emp.username === name);
        if (isExist) {
          cb('Username already exists');
          return;
        }
        let obj = new Employee(name, password, role);
        let newData = data;
        newData.push(obj);
        let objArr = [];
        objArr.push(obj);
        objArr.push(newData.length);
        fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
            cb(err, objArr);
        })
      }
    });
  }

  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          cb(null, []); // file belum ada, anggap data kosong
        } else {
          cb(err);
        }
      } else {
        cb(null, JSON.parse(data));
      }
    })
  }
 

}



module.exports = Employee;