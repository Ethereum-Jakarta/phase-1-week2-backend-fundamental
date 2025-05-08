const { error } = require("console");
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

  // lanjutkan method lain
  static login(username, password,cb){
    this.findAll((err, data) => {
      let hasil = null
      if(err){
        console.log(err);
      }
      else{
        for(let i = 0; i < data.length; i++){
          if(data[i].username === username && data[i].password === password){
              data[i].login = true;
              hasil = data[i]
          }
      }
      fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
        if (err) {
          console.log(err);
        } else {
          cb(err, hasil);
        }
      })

      }
    })  
  }

  static show(cb){
    this.findAll((err, data) => {
      if(err){
        console.log(err);
      }
      else{
        let receipt = {};
        let datas = {};
        for(let i = 0; i < data.length; i++){
          if(receipt[data[i].position] == undefined){
            receipt[data[i].position] = [];
            datas = {
              nama: data[i].username,
              password: data[i].password,
              login: data[i].login
            }
            receipt[data[i].position].push(datas)
          }
          else{
            datas = {
              nama: data[i].username,
              password: data[i].password,
              login: data[i].login
            }
            receipt[data[i].position].push(datas)
          }
        }
        cb(receipt)
      }
    })
  }

  static validate(cb){
    this.findAll((err, data) => {
      if(err){
        console.log(err)
      }
      else{
        let position = null
        for(let i = 0; i < data.length; i++){
          if(data[i].login == true){
            position = data[i].position;
            break;
          }
        }
        cb(position)
      }
    })
  }

  static logout(cb){
    this.findAll((err, data) => {
      if(err){
        console.log(err)
      }
      else{
        let logoutData = null
        for(let i = 0; i < data.length; i++){
          if(data[i].login == true){
            data[i].login = false;
            logoutData = data[i];
            break;
          }
        }
        fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, logoutData);
          }
        })
      }
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