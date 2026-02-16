let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static register(name, password, role, cb) {
    if (!name || !password || !role)
      return cb("register <username> <password> <jabatan>");

    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Employee(name, password, role);
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
        });
      }
    });
  }

  // lanjutkan method lain

  static login(name, password, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let user = data.find(
          (employee) =>
            employee.username === name && employee.password === password
        );
        if (user) {
          cb(err, user);
        } else {
          cb("username or password you entered is incorrect");
        }
      }
    });
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Employee;
