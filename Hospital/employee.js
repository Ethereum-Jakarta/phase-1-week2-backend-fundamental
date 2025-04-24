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

  static login(username, password,cb) {
    this.findAll((err, data) => {
        if(err) {
            console.log(err)
        } else {
            let ketemu = null;
          // console.log(typeof data)
          for(let i = 0; i < data.length; i++) {
              if (data[i].username === username && data[i].password === password) {
                data[i].login = true;
                ketemu = data[i];
              }
          }
        //   data.forEach((data) => {
        //   });

          fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
            if (err) {
              console.log(err);
            } else {
              cb(err, ketemu);
            }
          });
        }
    })
  }

  static logout(cb) {
    this.findAll((err, data) => {
        if(err) {
            console.log(err)
        } else {
          // console.log(typeof data)
          let logoutData = null;
          for(let i = 0; i < data.length; i++) {
            if(data[i].login === true)
              data[i].login = false;
              logoutData = data[i]
              break;
          }
        
        //   data.forEach((data) => {
        //   });

          fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
            if (err) {
              console.log(err);
            } else {
              cb(err, logoutData);
            }
          });
        }
    })
  }

  // lanjutkan method lain

  static validasi(cb) {
    this.findAll((err, data) => {
        if(err) {
            console.log(err)
        } else {
          let posisition = null;
            for(let i = 0; i < data.length; i++) {
                if(data[i].login == true) {
                    posisition = data[i];
                    break;
                }
            }
            cb(posisition)
        }
    })
  }

  static showEmployee(cb) {
    fs.readFile('./employee.json', 'utf8', (err, employeeData) => {
      if (err) {
        console.error('Error reading employee.json:', err);
        cb(err, null);
        return;
      }
      const dataemploye = JSON.parse(employeeData)
      cb(null, dataemploye)
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