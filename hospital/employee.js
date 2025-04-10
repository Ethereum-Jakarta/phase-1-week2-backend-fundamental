let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (!["dokter", "admin"].includes(role.toLowerCase())) {
          cb("hanya ada role dokter dan admin");
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
      }
    });
  }

  static login(username, password, callback) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      }

      let dataEmployee = data;

      const checkLogin = dataEmployee.find((user) => user.login === true);
      if (checkLogin) {
        callback("sudah ada user yang login");
        return;
      } else {
        const userUpdate = dataEmployee.find(
          (user) => user.username === username && user.password === password
        );
        let user = [];

        if (userUpdate) {
          userUpdate.login = true;
          user.push(userUpdate);
          fs.writeFile(
            "./employee.json",
            JSON.stringify(dataEmployee),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                callback(err, user);
              }
            }
          );
        } else {
          callback("username atau password salah");
        }
      }
    });
  }

  

  static logOut(callback) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      }

      let dataLogin = data;
      let currentLogin = dataLogin.find((user) => user.login === true);

      if (!currentLogin) {
        callback("tidak ada user yang sedang login");
      } else {
        currentLogin.login = false;
        let user = [];
        user.push(currentLogin);

        fs.writeFile("./employee.json", JSON.stringify(dataLogin), (err) => {
          if (err) {
            console.log(err);
          } else {
            callback(err, user);
          }
        });
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
