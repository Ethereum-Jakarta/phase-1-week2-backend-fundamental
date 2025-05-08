let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases;
  }

  static show(cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(true, null);
      } else {
        let result = data;
        cb(false, data);
      }
    });
  }

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(true, null);
      } else {
        cb(false, JSON.parse(data));
      }
    });
  }

  static addPatient(id, name, diseases, cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(true, null);
      } else {
        let newPatient = new Patient(id, name, diseases);
        let result = data;

        result.push(newPatient);
        fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, newPatient);
          }
        });
      }
    });
  }

  static updatePatient(id, name, diseases, cb) {
    this.findAll((err, data) => {
      if (err) {
        cb("error occured", null);
      } else {
        let result = data;
        let flag = false;
        let newPatient;
        for (let i = 0; i < result.length; i++) {
          if (result[i].id == id) {
            result[i].name = name;
            result[i].diseases = diseases;
            flag = true;
            newPatient = result[i];
            break;
          }
        }
        if (flag) {
          result.push(newPatient);
          fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
            if (err) {
              console.log(err);
            } else {
              cb(undefined, newPatient);
            }
          });
        } else {
          cb("data not found", null);
        }
      }
    });
  }

  static deletePatient(id, name, diseases, cb) {
    this.findAll((err, data) => {
      if (err) {
        cb("error occured", null);
      } else {
        let result = data;
        let flag = false;
        let deletePatient;
        for (let i = 0; i < result.length; i++) {
          if (result[i].id == id) {
            flag = true;
            deletePatient = result.splice(i, 1);
            break;
          }
        }
        if (flag) {
          fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
            if (err) {
              console.log(err);
            } else {
              cb(undefined, deletePatient);
            }
          });
        } else {
          cb("data not found", null);
        }
      }
    });
  }
  static findPatient(id = null, name = null, cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(true, null);
      } else {
        let filter;
        if (id != null) {
          filter = id;
        } else if (name != null) {
          filter = name;
        }
        let find;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == filter || data[i].name == filter) {
            find = data[i];
            break;
          }
        }
        if (find != undefined) {
          cb(false, find);
        } else {
          cb(true, null);
        }
      }
    });
  }
}
module.exports = Patient;
