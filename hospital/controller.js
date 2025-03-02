let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  // register logic
  static register(name, password, role) {
    // jalankan method di file employee
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.errorView(err);
      } else {
        // lanjut, callback
        HospitalView.registerView(objArr);
      }
    });
  }

  // login logic
  static login(name, password) {
    // cek apakah ada yg statusnya login
    Employee.islogin((err, isLoggedin) => {
      if (err) {
        HospitalView.errorView(err);
      } else {
        if (isLoggedin) {
          HospitalView.errorView(err);
        } else {
          // jalankan method login di file employee
          Employee.login(name, password, (err, employee) => {
            if (err) {
              HospitalView.errorView(err);
            } else {
              // callback employee
              HospitalView.loginView(employee);
            }
          });
        }
      }
    });
  }

  static logout() {
    Employee.logout((err, employee) => {
      if (err) {
        HospitalView.errorView(err);
      } else {
        HospitalView.logout(employee);
      }
    });
  }

  static addPatient(id, name, diseases) {
    Employee.islogin((err, isLoggedIn) => {
      if (!isLoggedIn) {
        HospitalView.noLoginView();
      } else {
        Patient.addPatient(id, name, diseases, (err, data) => {
          if (err) {
            HospitalView.errorView(err);
          } else {
            HospitalView.addPatientView(data);
          }
        });
      }
    });
  }

  static updatePatient(id, name, diseases) {
    Employee.islogin((err, isLoggedIn) => {
      if (!isLoggedIn) {
        HospitalView.noLoginView();
      } else {
        Patient.updatePatient(id, name, diseases, (err, data) => {
          if (err) {
            HospitalView.errorView(err);
          } else {
            HospitalView.updatePatient(data);
          }
        });
      }
    });
  }

  static deletePatient(id) {
    Employee.islogin((err, isLoggedIn) => {
      if (!isLoggedIn) {
        HospitalView.noLoginView();
      } else {
        Patient.deletePatient(id, (err, deletedPatient) => {
          if (err) {
            HospitalView.errorView(err);
          } else {
            HospitalView.deletePatient(deletedPatient);
          }
        });
      }
    });
  }

  static show(dataShowing) {
    Employee.islogin((err, isLoggedIn) => {
      if (!isLoggedIn) {
        HospitalView.noLoginView(err);
      } else {
        if (dataShowing === undefined) {
          HospitalView.errorView("mau showing apa bos?");
        } else if (dataShowing.toLowerCase() !== "patient" && dataShowing.toLowerCase() !== "employee") {
          HospitalView.errorView("hanya bisa show patient atau employee!");
        } else {
          if (dataShowing.toLowerCase() === "employee") {
            Employee.showEmployee((err, data) => {
              if (err) {
                HospitalView.errorView(err);
              } else {
                HospitalView.showEmployee(data);
              }
            });
          } else {
            Patient.showPatient((err, data) => {
              if (err) {
                HospitalView.errorView(err);
              } else {
                HospitalView.showPatient(data);
              }
            });
          }
        }
      }
    });
  }

  // lanjutkan command yang lain
  static help() {
    HospitalView.help();
  }
}

module.exports = HospitalController;
