let Employee = require("./employee");
let HospitalView = require("./view");
let Patient = require("./patient");

class HospitalController {
  static register(name, password, role) {
    Employee.checkRole((err, position) => {
      if (err) {
        HospitalView.error("login first");
      } else {
        if (position == "admin") {
          Employee.register(name, password, role, (err, objArr) => {
            if (err != undefined) {
              HospitalView.error(err);
            } else {
              HospitalView.registerView(objArr);
            }
          });
        } else {
          HospitalView.error("only admin that have feature register");
        }
      }
    });
  }

  static Login(username, password) {
    Employee.login(username, password, (err, user) => {
      if (err != undefined) {
        HospitalView.failedLogin(err);
      } else {
        HospitalView.succeslogin(user);
      }
    });
  }

  static addPatient(id, name, diseases) {
    Patient.addPatient(id, name, diseases, (err, data) => {
      if (err) {
        HospitalView.error("error occured");
      } else {
        HospitalView.succes("success add patient");
      }
    });
  }

  static Logout() {
    Employee.logout((err, data) => {
      if (err) {
        HospitalView.error("there is no user has log in ");
      } else {
        HospitalView.succeslogout(data);
      }
    });
  }
  static updatePatient(id, name, diseases) {
    Patient.updatePatient(id, name, diseases, (err, data) => {
      if (err != undefined) {
        HospitalView.error(err);
      } else {
        HospitalView.succes(`succes update patient with id ${data.id}`);
      }
    });
  }

  static deletePatient(id, name, diseases) {
    Patient.deletePatient(id, name, diseases, (err, data) => {
      if (err != undefined) {
        HospitalView.error(err);
      } else {
        HospitalView.succes(`succes delete patient with id ${data[0].id}`);
      }
    });
  }

  static show(param) {
    Employee.checkRole((err, position) => {
      if (err) {
        HospitalView.error("login first");
      } else {
        if (param == "employee") {
          if (position == "admin") {
            Employee.show((err, data) => {
              HospitalView.show(data);
            });
          } else {
            HospitalView.error("only admin that have feature show employee");
          }
        } else {
          Patient.show((err, data) => {
            HospitalView.show(data);
          });
        }
      }
    });
  }
  static findPatient(id = null, name = null) {
    Patient.findPatient(id, name, (err, data) => {
      if (err) {
        HospitalView.error("patient not found");
      } else {
        HospitalView.succes(data);
      }
    });
  }

  static default() {
    HospitalView.showMenu();
  }

  // lanjutkan command yang lain
}

module.exports = HospitalController;
