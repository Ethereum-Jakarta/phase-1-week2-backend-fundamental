const fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases;
  }

  static addPatient(id, name, diseases, cb) {
    if (!id || !name || !diseases)
      return cb("addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....");

    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Patient(id, name, diseases);
        let newData = data;
        let objArr = [];
        newData.push(obj);
        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        });
      }
    });
  }

  static updatePatient(id, name, diseases, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        const patient = data.find(
          (pat) => (pat.id === id) & (pat.name === name)
        );

        if (patient) {
          patient.diseases = diseases;
          fs.writeFile("./patient.json", JSON.stringify(data), (err) =>
            cb(err, patient)
          );
        } else {
          cb("patient not found");
        }
      }
    });
  }

  static deletePatient(id, name, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        const patient = data.find(
          (pat) => (pat.id === id) & (pat.name === name)
        );
        const newData = data.filter(
          (pat) => (pat.id !== id) & (pat.name !== name)
        );

        if (patient) {
          fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
            cb(err, patient);
          });
        } else {
          cb("patient not found");
        }
      }
    });
  }

  static findPatientBy(type, value, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        const patient = data.find((pat) => pat[type] === value);

        if (patient) {
          cb(err, patient);
        } else {
          cb("patient not found");
        }
      }
    });
  }

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Patient;
