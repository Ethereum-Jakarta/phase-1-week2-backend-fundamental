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

  static login(name, password) {
    Employee.login(name, password, (err, user) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.loginView(user);
      }
    });
  }

  static addPatient(id, name, diseases) {
    Patient.addPatient(id, name, diseases, (err, patient) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.addPatientView(patient);
      }
    });
  }

  static updatePatient(id, name, diseases) {
    Patient.updatePatient(id, name, diseases, (err, patient) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.updatePatientView(patient);
      }
    });
  }

  static deletePatient(id, name) {
    Patient.deletePatient(id, name, (err, patient) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.deletePatientView(patient);
      }
    });
  }

  static logout() {
    HospitalView.logout();
  }

  static show(dataType) {
    if (dataType === "employee") {
      Employee.findAll((err, data) => {
        if (err) {
          HospitalView.ErrorView(err);
        } else {
          HospitalView.showEmployeesView(data);
        }
      });
    } else if (dataType === "patient") {
      Patient.findAll((err, data) => {
        if (err) {
          HospitalView.ErrorView(err);
        } else {
          HospitalView.showPatientsView(data);
        }
      });
    } else {
      HospitalView.ErrorView("data type not found");
    }
  }

  static findPatientBy(type, value) {
    Patient.findPatientBy(type, value, (err, patient) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.findPatientByView(patient);
      }
    });
  }

  static help() {
    HospitalView.helpView();
  }
}

module.exports = HospitalController;
