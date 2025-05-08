let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases;
  }

  static addPatient(id, name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let newData = data;
          let obj = new Patient(id, name, diseases);
          newData.push(obj);

          let objArr = [];
          objArr.push(obj);
          objArr.push(newData.length);

          fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
            if (err) {
              console.log(err);
            } else {
              resolve(objArr);
            }
          });
        }
      });
    });
  }

  static updatePatient(id, name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let patient = null;
          let index = -1;
          for (const person of data) {
            if (person.id == id && person.name === name) {
              index++;
              patient = person;
              break;
            }
          }
          patient.disease = diseases;

          if (!patient) {
            reject();
          } else {
            data.splice(index, 1, patient);
            fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
              if (err) {
                console.log(err);
              } else {
                resolve(patient);
              }
            });
          }
        }
      });
    });
  }

  static deletePatient(id, name, penyakit) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let person = null;
          let index = -1;
          for (const patient of data) {
            index++;
            if (patient.id === id && patient.name === name) {
              person = patient;
              break;
            }
          }

          if (!person) {
            reject();
          } else {
            data.splice(index, 1);

            fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
              if (err) {
                console.log(err);
              } else {
                resolve(data);
              }
            });
          }
        }
      });
    });
  }

  static show() {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          if (!data) {
            reject();
          } else {
            resolve(data);
          }
        }
      });
    });
  }

  static findPatientBy(idOrName, idPatientOrNamaPasien,cb) {
    this.findAll((err, data) => {
      if(err) {
        console.log(err);
      } else {
        let person = null;
        for(const patient of data) {
          if((patient.id === idOrName || patient.name == idOrName) && (patient.id == idPatientOrNamaPasien || patient.name === idPatientOrNamaPasien) ) {
            person = patient;
          }
        }

        if(!person) {
          cb(err, 'Data tidak ditemukan')
        } else {
          cb(null, person);
        }
      }
    })
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
