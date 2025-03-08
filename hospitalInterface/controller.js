let Patient = require("./patient");
let Employee = require("./employee")
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
      Employee.login(username, password, (err, user) => {
        if(err) {
          HospitalView.ErrorView(err)
        } else {
          HospitalView.loginView(user)
        }
      })
    }

    static addPatient(data) {
      Employee.addPatient(data, (err, patient) => {
        if(err) {
          HospitalView.ErrorView(err)
        } else {
          HospitalView.addPatientView(patient)
        }
      })
    }

    static updatePatient(id, data) {
      Employee.updatePatient(id, data, (err, patient) => {
        if(err) {
          HospitalView.ErrorView(err)
        } else {
          HospitalView.updatePatientView(patient)
        }
      }) 
    }

    static deletePatient(id) {
      Employee.deletePatient(id, (err, patient) => {
        if(err) {
          HospitalView.ErrorView(err)
        } else {
          HospitalView.deletePatientView(patient)
        }
      })
    }

    static logout() {
      HospitalView.logoutView()
    }

    static show(showData) {
      if(showData === "patient") {
        Patient.findAll((err, patient) => {
          if(err) {
            HospitalView.ErrorView(err)
          } else {
            HospitalView.showView(patient)
          }
        })
      } else if(showData === "employee") {
        Employee.findAll((err, employee) => {
          if(err) {
            HospitalView.ErrorView(err)
          } else {
            HospitalView.employeeView(employee)
          }
        })
      } else {
        HospitalView.ErrorView("The data is not correct")
      }
    }

    static findPatientBy(type, value) {
      Patient.findPatientBy(type, value, (err, patient) => {
        if(err) {
          HospitalView.ErrorView(err)
        } else {
          HospitalView.patientDatas(patient)
        }
      })
    }

    static help() {
      HospitalView.showHelp()
    }
    // lanjutkan command yang lain
}


module.exports = HospitalController;