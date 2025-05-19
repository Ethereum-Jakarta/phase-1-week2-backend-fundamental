const fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static register(name, password, role) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          const duplicate = data.find(e => e.username === name)

          if(duplicate){
            return reject("Register failed : Username has been used")
          }

          let obj = new Employee(name, password, role)
          let newData = data;
          newData.push(obj);
          let objArr = [];

          objArr.push(obj);
          objArr.push(newData.length);

          fs.writeFile("./employee.json", JSON.stringify(newData, null, 2), (err) => {
            if (err) {
              console.log(err);
            } else {
              resolve(objArr);
            }
          })
        }
      });
    })
  }

  // lanjutkan method lain

  static login(name, password) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err)
        } else {
          if (data.length < 1) return reject("Data not found : Please register first")

          const dataFound = data.find(e => e.username === name && e.password === password) 
          if (!dataFound) {
            return reject("Login Failed : Invalid username or password")
          }

          data.forEach(e => e.login = false)
          dataFound.login = true

          fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
              console.log(err);
            } else {
              resolve(dataFound);
            }
          })
        }
      })
    })
  }

  static getCurrentLogin() {
    return new Promise((resolve, reject) => {
      this.findAll((err,data) => {
        if (err) {
          console.log(err)  
        } else {
          const loggedIn = data.find(e => e.login === true)
          if(!loggedIn){
            return resolve(loggedIn)
          }
          reject(loggedIn)
        }
      })
    })
  }

  static logout(){
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if(err){
          console.log(err)
        } else {
          const checkLogin = data.find(e => e.login === true)
          if(!checkLogin){
            return reject("No one has logged in before")
          }

          checkLogin.login = false

          fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
              console.log(err);
            } else {
              resolve(checkLogin);
            }
          })
        }
      })
    }) 
  }

  static show() {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          reject(err)
        }else {
          resolve(data)
        }
      }) 
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