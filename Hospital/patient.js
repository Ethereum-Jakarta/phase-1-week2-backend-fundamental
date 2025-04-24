const { error } = require("console");
let fs = require("fs");

class Patient {
  constructor(id, username, penyakit) {
    this.id = id;
    this.username = username;
    this.penyakit = penyakit;
  }

  static addPatient(id, username, penyakit, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Patient(id, username, penyakit);
        let newData = data;
        newData.push(obj);
        let objArr = [];

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

  static updatePatient(id, username, penyakit, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let update = false;

        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            data[i].username = username;
            data[i].penyakit = penyakit;
            update = true;
            break;
          }
        }

        if (update) {
          fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
            if (err) {
              cb(err, false);
            } else {
              cb(null, true);
            }
          });
        } else {
          cb(null, false);
        }
      }
    });
  }

  static deletePatient(id, username, penyakit, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let deleted = false;

        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            data.splice(i, 1);
            deleted = true;
            break;
          }
        }

        if (deleted) {
          fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
            if (err) {
              console.log(err);
              cb(err, false);
            } else {
              cb(null, true); // Panggil callback dengan status update berhasil
            }
          });
        } else {
          cb(null, false);
        }
      }
    });
  }

  static showPatient(cb) {
    fs.readFile("./patient.json", "utf8", (err, patientData) => {
      if (err) {
        console.error(err);
        cb(err, null);
        return;
      }
      const datapatient = JSON.parse(patientData);
      cb(null, datapatient);
    });
  }

  static findPatientBy(id, username, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let patient = null

        for (let i = 0; i < data.length; i++) {
          console.log(data[i])
          if (data[i].username === username && data[i].id === id) {
            patient = data[i];
          } else if (data[i].username === id && data[i].id === username) {
            patient = data[i];
          }
        }
        console.log(patient)
        cb(err, patient)
      }
    });
  }

  // lanjutkan method lain

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
