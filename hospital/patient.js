let fs = require("fs");
const { json } = require("stream/consumers");
const Employee = require("./employee");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases;
  }

  static addPatient(id, name, diseases, cb) {
    this.findAllPatient((err, data) => {
      if (err) {
        cb(err);
      } else {
        Employee.isDokterLoggedIn((err, dokterEmployee) => {
          if (err) {
            cb(err);
          } else {
            if (!dokterEmployee) {
              cb("hanya dokter yg bisa akses!");
            } else {
              if (id === undefined || name === undefined || diseases === undefined) {
                cb("harap lengkapi id, nama, atau daftar penyakit yg diderita pasien");
                return;
              }
              const isNikTaken = data.find((patient) => patient.id === id);
              if (isNikTaken) {
                cb("NIK sudah terdaftar, pilih menu update");
                return "";
              } else {
                let newPatient = new Patient(id, name, [...diseases]);
                let newData = data;
                newData.push(newPatient);
                let dataView = [];
                dataView.push(newPatient);

                fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
                  if (err) {
                    cb(err);
                  } else {
                    cb(err, dataView);
                  }
                });
              }
            }
          }
        });
      }
    });
  }

  static updatePatient(id, name, diseases, cb) {
    this.findAllPatient((err, data) => {
      if (err) {
        cb(err);
      } else {
        Employee.isDokterLoggedIn((err, dokterEmployee) => {
          if (err) {
            cb(err);
          } else {
            if (!dokterEmployee) {
              cb("hanya dokter yg bisa akses!");
            } else {
              const patient = data.find((p) => p.id === id);
              if (patient === undefined) {
                cb("belum ada pasien dengan NIK tersebut");
              } else {
                let newData = data;
                let updatedPatient = patient;
                updatedPatient.name = name;
                updatedPatient.diseases = diseases;
                newData.splice(newData.indexOf(patient), 1, updatedPatient);

                fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
                  if (err) {
                    cb(err);
                  } else {
                    cb(err, updatedPatient);
                  }
                });
              }
            }
          }
        });
      }
    });
  }

  static deletePatient(id, cb) {
    Employee.isDokterLoggedIn((err, dokterEmployee) => {
      if (err) {
        cb(err);
      } else {
        if (!dokterEmployee) {
          cb("hanya dokter yg bisa akses!");
        } else {
          this.findAllPatient((err, data) => {
            if (err) {
              cb(err);
            } else {
              const deletedPatient = data.find((p) => p.id === id);
              if (deletedPatient === undefined) {
                cb("NIK tidak terdaftar");
              } else {
                let newData = data;
                newData.splice(newData.indexOf(deletedPatient), 1);
                fs.writeFile("./patient.json", JSON.stringify(newData), (err, data) => {
                  if (err) {
                    cb(err);
                  } else {
                    cb(err, deletedPatient);
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  static showPatient(cb) {
    Employee.isDokterLoggedIn((err, dokterEmployee) => {
      if (err) {
        cb(err);
      } else {
        if (!dokterEmployee) {
          cb("hanya dokter yg bisa akses!");
        } else {
          this.findAllPatient((err, data) => {
            if (err) {
              cb(err);
            } else {
              cb(data);
            }
          });
        }
      }
    });
  }

  static findAllPatient(cb) {
    fs.readFile("patient.json", "utf-8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Patient;
