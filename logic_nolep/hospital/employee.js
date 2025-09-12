let fs = require("fs");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static register(username, password, role, cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);

      let obj = new Employee(username, password, role);
      data.push(obj);

      fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return cb(err);
        cb(null, [obj, data.length]);
      })
    })
  }

  static login(username, password, cb) {
    this.findAll((err, data) => {
        if (err) return cb(err);

        let user = data.find(e => e.username === username && e.password === password);
        if (!user) return cb('Username/Password salah');

        data.forEach(e => e.login = false);
        user.login = true;

        fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
            if (err) return cb(err);
            cb(null, user);
        });
    });
  } 

  static logout(cb) {
    this.findAll((err, data) => {
        if (err) return cb(err);
        
        let user = data.find(e => e.login === true);
        if (!user) return cb('Tidak ada yang login');

        user.login = false;

        fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
  }

  static getLoggedInUser(cb) {
    this.findAll((err, data) => {
      if (err) return cb(err);
      let user = data.find(e => e.login === true);
      cb(null, user || null);
    })
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        return cb(err)
      } else {
        cb(null, JSON.parse(data));
      }
    })
  }
 

}



module.exports = Employee;