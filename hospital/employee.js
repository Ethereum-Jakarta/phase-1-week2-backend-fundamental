let fs = require("fs");

class Employee {
// login = this.login
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
  }

  static register(name, password, role, cb) {
    // this.login = false
    // console.log(login)
    // throw new Error('This is not an error. This is just to abort javascript');
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
  static login(name, password,cb){
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        let info = ''
        for(let d=0;d<data.length;d++){
          // console.log(data[d])
          if(data[d].username==name){
            if(data[d].password==password){
              info = data[d]
              info.login = true
              break
            } else {
              info = false
            }
          }  else {
            info = false
          }
        }
        // console.log(info)
        let dataUser = []
        dataUser.push(info)
        // console.log(dataUser)

        fs.writeFile("./login.json", JSON.stringify(dataUser), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, dataUser);
          }
        })
      }
    })
  }
  static logout(cb){
    let logout = [{"login":false}]
    fs.writeFile("./login.json", JSON.stringify(logout), (err) => {
      if (err) {
        console.log(err);
      } else {
        cb(err, logout);
      }
    })
  }
  static isLogin(cb){
    fs.readFile("./login.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        let info = JSON.parse(data)[0];
        // console.log(info)
        cb(err,info)
      }
    })
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