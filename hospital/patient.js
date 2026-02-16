let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id
    this.name = name
    this.diseases = diseases
  }

  static addPatient(id, name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let obj = new Patient(id, name, diseases)
          let newData = data;
          newData.push(obj);
          let objArr = [];
  
          objArr.push(obj);
          objArr.push(newData.length);
          fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(objArr);
            }
          })
        }
      });
    })
  }

  static updatePatient(id, name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let newData = data;
          let obj = new Patient(id, name, diseases)
          let found = false;
          data.forEach((patient, i) => {
            if (patient.id === id) {
              newData.splice(i,1,obj)
              found = true;  
              return
            }
          })

          if (found) {
            fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(obj);
              }
            })
          } else {
            reject(404)
          }
        }
      });
    })
  }

  static deletePatient(id) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err);
        } else {
          let newData = data;
          let found = false;
          data.forEach((patient, i) => {
            if (patient.id === id) {
              newData.splice(i,1)
              found = patient;
              return
            }
          })
          if (found) {
            fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(id);
              }
            })
          } else {
            reject(404)
          }
        }
      });
    })
  }

  static show() {
    return new Promise((resolve, reject) => {
      this.findAll((err, patients) => {
        if (err) {
          reject(err);
        } else {
          resolve(patients)
        }
      });
    })
  }

  static findPatient(input) {
    return new Promise((resolve, reject) => {
      this.findAll((err, patients) => {
        if (err) {
          reject(err);
        } else {
          let find = patients.filter(patient => patient.name == input || patient.id == input)
          if (find.length) {
            resolve(find);
          } else {
            reject(404)
          }
        }
      });
    })
  }
  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }
 

}



module.exports = Patient;