let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  static register(name, password, role) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.registerView(objArr);
      }
    });
  }

  static login(username, password) {
    Employee.validasi(posisition => {
      if(posisition == null) {
        Employee.login(username, password, (err, ketemu) => {
          if (err) {
            HospitalView.ErrorView(err);
          } else {
            HospitalView.loginView(ketemu);
          }
        });
      } else {
        console.log("Anda sudah login!")
      }
    })
  }

  static help() {
    HospitalView.help();
  }

  static addPatient(id, username, penyakit) {
    Employee.validasi(posisition => {
      if (posisition) {
        Patient.addPatient(id, username, penyakit, (err, objArr) => {
          if (err) {
            HospitalView.ErrorView(err);
          } else {
            HospitalView.addPatientView(objArr);
          }
        });
      } else {
        console.log("Anda belum login!");
      }
    })
  }

  static updatePatient(id, username, penyakit) {
    Employee.validasi(posisition => {
      if (posisition) {
        Patient.updatePatient(id, username, penyakit, (err, update) => {
          console.log(penyakit);
          if (err) {
            HospitalView.ErrorView(err);
          } else {
            HospitalView.updatePatient(update, username, penyakit);
          }
        });
      } else {
        console.log("Anda Belum login!");
      }
    });
  }

  static deletePatient(id, username, penyakit) {
    Employee.validasi(posisition => {
      if(posisition) {
        Patient.deletePatient(id, username, penyakit, (err, deleted) => {
          if (err) {
            HospitalView.ErrorView(err);
          } else {
            HospitalView.deletePatient(deleted, id, username, penyakit);
          }
        });
      } else {
        console.log("Anda Belum login!")
      }
    })
  }

  static logout() {
        Employee.logout((err, logoutData) => {
          if (err) {
            HospitalView.ErrorView(err);
          } else {
            HospitalView.logoutView(logoutData);
          }
        });
  }

  static show(input) {
    Employee.validasi(posisition => {
      if(posisition == 'admin' || posisition == 'Admin') {
        if(input == 'Employee') {
          Employee.showEmployee((err, dataemploye) => {
            if(err) {
              HospitalView.ErrorView(err)
            } else {
              HospitalView.showView(dataemploye)
            }
          })
        } else {
          Employee.showEmployee((err, datapatient) => {
            if(err) {
              HospitalView.ErrorView(err)
            } else {
              HospitalView.showView(datapatient)
            }
          })
        }
      } else {
        console.log(`Mohon maaf anda tidak memiliki akses!`)
      }
    })
  }

  static findPatient(id, username) {
    Employee.validasi(posisition => {
      if(posisition) {
        Patient.findPatientBy(id, username, (err,patient) => {
          if(err) {
            console.log(err)
          } else {
            HospitalView.patientView(patient)
          }
        })
      } else {
        console.log("Anda Belum login!;")
      }
    })
  }
  // lanjutkan command yang lain
}

// HospitalController.login("username", "password")
//   .then((message) => {
//     console.log(message); // Pesan "Login Berhasil!" atau pesan "Login Gagal!"
//   })
//   .catch((err) => {
//     console.error(err); // Pesan kesalahan jika login gagal
//   });

module.exports = HospitalController;
