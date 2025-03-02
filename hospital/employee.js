let fs = require("fs");
const { json } = require("stream/consumers");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      //implementasi cb func findAll di bawah. cb(data)
      if (err) {
        cb(err);
        console.log(err);
      } else {
        // cek apakah username sudah digunakan
        const isUsernameTaken = data.find((user) => user.username === name);

        if (isUsernameTaken || name === undefined || password === undefined || role === undefined) {
          // kalau udh digunakan atau ada yg kosong, minta ganti
          cb("harap isi dengan lengkap, atau mungkin username sudah digunakan");
        } else if (!(role === "admin" || role === "dokter")) {
          // harus isi role dengan tepat
          cb("isi role admin / dokter");
        } else {
          // bikin object employee baru
          let obj = new Employee(name, password, role);
          // bikin newData (replika dari data)
          let newData = data; // data dari cb findAll
          newData.push(obj); // di newData, push obj baru
          let objArr = []; // ini untuk yg ditampilkan di index

          objArr.push(obj); // masukkan object employee baru ke objArr
          objArr.push(newData.length); // tambahkan length nya

          // replace data di employee.json dengan newData
          fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
            if (err) {
              console.log(err);
              cb(err);
            } else {
              cb(err, objArr);
            }
          });
        }
      }
    });
  }

  static islogin(cb) {
    // tampilkan data di findAll
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        // cek apakah ada data[i].login === true
        let loggedInEmployee = data.find((e) => e.login === true);
        // dijalankan kalau ada yg login
        if (loggedInEmployee) {
          cb("ada akun yg sedang login, harap logout dulu", true);
        } else {
          cb(err, false);
        }
      }
    });
  }

  static whoIsLoggedIn(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        const employeeWhoLoggedIn = data.find((e) => e.login === true);
        const employeePosition = employeeWhoLoggedIn.position;
        cb(err, employeePosition);
      }
    });
  }

  static login(name, pw, cb) {
    // ambil data
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        // pastikan nama dan password ditulis
        if (name === undefined || pw === undefined) {
          cb("username atau password kosong! harap isi");
        } else {
          // employee adalah data[i], index jika user dan pass benar
          let employee = data.find((e) => e.username === name && e.password === pw);
          // cek apakah username dan pass yg ditulis ada di data
          if (employee === undefined) {
            cb("username atau pass salah");
          } else {
            // ubah employee[i].login
            employee.login = true;
            // replace dengan data yg telah diubah (login = true)
            fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
              if (err) {
                cb(err);
              } else {
                // callback employee
                cb(err, employee);
              }
            });
          }
        }
      }
    });
  }

  static showEmployee(cb) {
    this.isAdminLoggedIn((err, adminEmployee, data) => {
      if (err) {
        cb(err);
      } else {
        if (!adminEmployee) {
          cb("Hanya admin yg bisa akses!");
        } else {
          cb(err, data);
        }
      }
    });
  }

  static logout(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        const employee = data.find((e) => e.login === true);
        if (employee === undefined) {
          cb("belum ada yg login");
        } else {
          employee.login = false;
          fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
            if (err) {
              cb(err);
            } else {
              cb(err, employee, data);
            }
          });
        }
      }
    });
  }

  // lanjutkan method lain

  static isAdminLoggedIn(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        const employeeLoggedIn = data.find((e) => e.login === true);
        if (employeeLoggedIn.position === "dokter") {
          cb(err, false);
        } else {
          cb(err, true, data);
        }
      }
    });
  }

  static isDokterLoggedIn(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        const employeeLoggedIn = data.find((e) => e.login === true);
        if (employeeLoggedIn.position === "admin") {
          cb(err, false);
        } else {
          cb(err, true);
        }
      }
    });
  }

  // findAll untuk read file JSON dan parse to object
  static findAll(cb) {
    fs.readFile("employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Employee;
