const { json } = require("stream/consumers");
const HospitalView = require("./view");

let fs = require("fs").promises;

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll() 
      .then((data) => {
        let newData = JSON.parse(data)
        let obj = new Employee(name, password, role)
        newData.push(obj)

        fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            let objArr = [obj, newData.length];
            HospitalView.registerView(objArr)
            cb(null, objArr);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        cb(err, null);
      });
  }
  // lanjutkan method lain
  static login(username, password) {
    return new Promise((resolve, reject) => {
      this.findAll()
      // console.log(this.findAll)
        .then((data) => {
          data = JSON.parse(data)
          let ketemu = false;
          // console.log(typeof data)
          data.forEach((employee) => {
            if (employee.username === username && employee.password === password) {
              employee.login = true;
              ketemu = true;
            }
          });

          if (ketemu) {
            fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
              if (err) {
                reject(err);
              } else {
                resolve("Login Berhasil!");
              }
            });
          } else {
            resolve("Login Gagal. Username atau password salah.");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static findAll() {
   return fs.readFile("./employee.json", "utf8")
  }
}

module.exports = Employee;
