let fs = require("fs");
const HospitalView = require("./view");

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

  static login = (username, password, cb) => {
    this.findAll((err, data) => {
      if(err) {
        console.log(err)
      }else{
        let status = null;
        
        for(let i = 0; i <= data.length -1; i++){
          if(data[i].username === username && data[i].password === password){
            data[i].login = true;
            status = data[i]
          }
        }

          fs.writeFile("./employee.json", JSON.stringify(data) ,(err) =>{
            if(err){
              console.log(err)
            } else {
              cb(err, status)
            }
          }) 
          
      }
    })
  }

  static roleLogin = (cb) => {
    this.findAll((err, data) => {
      if(err){
        console.log(err)
      }else{
        let role = null

        for(let i = 0 ; i < data.length ; i++){
          if(data[i].login == true){
            role = data[i].position
            break;
          }
        }
        cb(role)
      }
    })
  }

  static logout =  (cb) => {
    this.findAll((err, data) => {
      if(err) {
        console.log(err)
      }else{
        let status = null;
        
        for(let i = 0; i <= data.length -1; i++){
          if(data[i].login == true){
            data[i].login = false;
            status = data[i]
          }
        }

        if(!status){
          console.log('Anda belum login, Silahkan login terlebih dahulu')
        }else{
          fs.writeFile("./employee.json", JSON.stringify(data) ,(err) =>{
            if(err){
              console.log(err)
            } else {
              cb(err, status)
            }
          })
        }
      }
    })
  }

  static showEmployee(cb){
    this.findAll((err,data) => {
      if(err) {
        console.log(err)
      }else{
        cb(data)
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