const fs = require("fs");
const employeeJSON = "employee.json";
if (!fs.existsSync(employeeJSON)) {
  fs.writeFileSync(employeeJSON, "[]", { encoding: "utf-8" });
}


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


  static login(username, password, callback) {
    this.findAll((err, data) => {
      if(err) {
        console.log(err)
      } else {
        let employee = data.find(user => user.username === username && user.password === password);

        if(employee) {
          callback(null, user)
        } else {
          callback("There's no user, please try again.")
        }
      }
    })
  }
  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(null, JSON.parse(data));
      }
    })
  }
  

}



module.exports = Employee;