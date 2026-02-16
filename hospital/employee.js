let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static roleLogin() {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err)
        } else {
          let role = null;
          data.forEach(employee => {
            if (employee.login) {
              role = employee.position
              return
            }
          })
          if (!role) {
            reject(role)
          } else {
            resolve(role);
          }
        }
      })
    })
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let find = data.find((employee) => employee.username === name);
        if (find) {
          cb('has found')
          return
        }
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
  static login(username, password) {
    return new Promise((resolve, reject) => {
      this.findAll((err, employees) => {
        if (err) {
          console.log(err);
        } else {
          let data = null;
          let index = -1;
          for (const employee of employees) {
            index++
            if (employee.username === username && employee.password === password) {
              data = employee
              break;
            }
          }
          if (!data) {
            reject('username atau password salah')
          } else {
            data.login = true;
            employees.splice(index,1,data)
            fs.writeFile("./employee.json", JSON.stringify(employees), (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            })
          }
        }
      });
    })
  }

  static logout() {
    return new Promise((resolve, reject) => {
      this.findAll((err, employees) => {
        if (err) {
          console.log(err);
        } else {
          let found = false;
          employees.forEach((employee, i) => {
            if (employee.login) {
              employees[i].login = false;
              found = employee;
              return;
            }
          })
          if (found) {
            fs.writeFile("./employee.json", JSON.stringify(employees), (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(found);
              }
            })
          } else {
            reject(404)
          }
        }
      });
    })
  }

  static show() {
    return new Promise((resolve, reject) => {
      this.findAll((err, employees) => {
        if (err) {
          reject(err);
        } else {
          resolve(employees)
        }
      });
    })
  }

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