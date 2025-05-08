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

        fs.writeFile("./employee.json", JSON.stringify(newData, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        })
      }
    });
  }

  static login(name, password, cb) {
    this.findAll((err, data) => {
      if ( err ) {
        console.log(err)
      } else {
        for ( let login of data ) {
          if ( login.login == true ) {
            throw new Error('Tidak boleh login secara bersamaan')
          } 
        }


        for ( let d of data ) {
          if ( name == d.username && password == parseInt(d.password) ) {
            d.login = true
            break;
          }
        }

        fs.writeFile('./employee.json', JSON.stringify(data, null, 2), (err, obj) => {
          if ( err ) {
            console.log(err)
          } else {
            cb(err, data)
          }
        })
      }
    })
  }

  static logout(cb) {
    this.findAll((err, data) => {
      if ( err ) {
        console.log(err)
      } else {
        for ( let d of data ) {
          d.login = false
        }

        fs.writeFile('./employee.json', JSON.stringify(data, null, 2), (err, obj) => {
          if ( err ) {
            console.log(err)
          } else {
            cb(obj)
          }
        })
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