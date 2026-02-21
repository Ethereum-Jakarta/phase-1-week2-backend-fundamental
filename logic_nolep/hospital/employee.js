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

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
        if (err) {
            return cb(err);
        }
        // Jika data kosong, kirim array kosong sebagai fallback
        const employees = data ? JSON.parse(data) : [];
        cb(null, employees);
    });
}

 
  static find(username, password, cb) {
    this.findAll((err, employees) => {
        if (err) {
            cb(err);
        } else {
            const employee = employees.find(emp => emp.username === username && emp.password === password);
            cb(null, employee);
        }
    });
}

}



module.exports = Employee;
