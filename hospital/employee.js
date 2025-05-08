let fs = require("fs");
const { View } = require("./view");

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static show(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(true, null);
      } else {
        let result = data;
        cb(false, data);
      }
    });
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let flag = true;
        for (let i = 0; i < data.length; i++) {
          if (data[i].username == name) {
            cb("username hase been used please choose another username", null);
            flag = false;
            break;
          }
        }
        if (flag) {
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
  static login(paramUsername, paramPassword, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let result = data;
        let infoUser;
        let flag = false;
        for (let i = 0; i < result.length; i++) {
          if (
            result[i].username == paramUsername &&
            result[i].password == paramPassword
          ) {
            if (result[i].login) {
              cb("You are already Login", null);
              flag = true;
              infoUser = result[i];
              break;
            } else {
              result[i].login = true;
              infoUser = result[i];
              flag = true;
              break;
            }
          }
        }

        if (infoUser == undefined || !flag) {
          cb(
            "Login Failed Username has'nt registered or invalid password",
            null
          );
        } else {
          fs.writeFile(
            "./employee.json",
            JSON.stringify(result, null, result.length),
            (err) => {
              if (err) {
                console.log(err);
              } else {
                cb(err, infoUser);
              }
            }
          );
        }
      }
    });
  }

  static checkRole(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(true, null);
      } else {
        let counter = 0;
        let position;
        for (let i = 0; i < data.length; i++) {
          if (data[i].login) {
            counter++;
            position = data[i].position;
            break;
          }
        }
        if (counter > 0) {
          cb(false, position);
        } else {
          cb(true, null);
        }
      }
    });
  }

  static logout(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(true, null);
      } else {
        let result = data;
        let infoUser = null;
        for (let i = 0; i < result.length; i++) {
          if (result[i].login) {
            result[i].login = false;
            infoUser = result[i];
            break;
          }
        }
        if (infoUser == null) {
          cb(true, null);
        } else {
          fs.writeFile(
            "./employee.json",
            JSON.stringify(result, null, result.length),
            (err) => {
              if (err) {
                cb(err);
              } else {
                cb(err, infoUser);
              }
            }
          );
        }
      }
    });
  }

  // lanjutkan method lain
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
