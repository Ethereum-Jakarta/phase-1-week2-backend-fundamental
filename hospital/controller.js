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

  // lanjutkan command yang lain
  static login(username, password) {
    Employee.findLogin()
      .then(() => {
        Employee.login(username, password)
          .then(() => {
            HospitalView.loginView(username);
          })
          .catch(() => {
            HospitalView.loginFailedView();
          });
      })
      .catch((name) => {
        HospitalView.alreadyLogin(name);
      });
  }

  static addPatient(id, name, diseases) {
    Employee.roleLogin()
      .then(() => {
        Patient.addPatient(id, name, diseases)
          .then((data) => {
            HospitalView.addPatientView(data);
          })
          .catch((err) => {
            HospitalView.ErrorView(err);
          });
      })
      .catch(() => {
        HospitalView.notLoginView();
      });
  }

  static updatePatient(id, name, diseases) {
    Employee.roleLogin()
      .then(() => {
        Patient.updatePatient(id, name, diseases)
          .then((data) => {
            HospitalView.updatePatientView(data);
          })
          .catch((err) => {
            HospitalView.ErrorView(err);
          });
      })
      .catch(() => {
        HospitalView.notLoginView();
      });
  }
  static deletePatient(id, name, diseases) {
    Employee.roleLogin()
      .then(() => {
        Patient.deletePatient(id, name, diseases)
          .then((data) => {
            HospitalView.deletePatientView(data);
          })
          .catch((err) => {
            HospitalView.ErrorView(err);
          });
      })
      .catch(() => {
        HospitalView.notLoginView();
      });
  }

  static show(employeeOrPatient) {
    Employee.roleLogin()
      .then((role) => {
        if (employeeOrPatient == "employee") {
          if (role === "admin") {
            Employee.show()
              .then((data) => {
                HospitalView.showView(data);
              })
              .catch(() => {
                HospitalView.errorDataView();
              });
          } else {
            HospitalView.notAdminView();
          }
        } else if (employeeOrPatient == "patient") {
          Patient.show()
            .then((data) => {
              HospitalView.showView(data);
            })
            .catch(() => {
              HospitalView.errorDataView();
            });
        } else {
          HospitalView.help();
        }
      })
      .catch(() => {
        HospitalView.notLoginView();
      });
  }

  static logout() {
    Employee.logout().then(() => {
      HospitalView.logout();
    });
  }

  static findPatientBy(idOrName, idPatientOrNamaPasien) {
    Employee.roleLogin()
      .then(() => {
        Patient.findPatientBy(idOrName, idPatientOrNamaPasien, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            HospitalView.findPatientByView(data);
          }
        });
      })
      .catch(() => {
        HospitalView.notLoginView();
      });
  }

  static help() {
    HospitalView.help();
  }
}

module.exports = HospitalController;
