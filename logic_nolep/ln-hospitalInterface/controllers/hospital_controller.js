let Employee = require("../models/employee");
let Patient = require("../models/patient");
let HospitalView = require("../views/hospital_view");

class HospitalController {
    static register(username, password, role) {
        Employee.register(username, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        });
    }

    static login(username, password) {
        Employee.login(username, password, (err, user) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(user);
            }
        });
    }

    static addPatient(data) {
        Patient.addPatient(data, (err, patient) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.addPatientView(patient);
            }
        });
    }

    static updatePatient(id, data) {
        Patient.updatePatient(id, data, (err, patient) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.updatePatientView(patient);
            }
        });
    }

    static deletePatient(id) {
        Patient.deletePatient(id, (err, result) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.deletePatientView(result);
            }
        });
    }

    static logout() {
        HospitalView.logoutView();
    }

    static show(dataType) {
        if (dataType === 'employee') {
            Employee.findAll((err, employees) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showEmployees(employees);
                }
            });
        } else if (dataType === 'patient') {
            Patient.findAll((err, patients) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showPatients(patients);
                }
            });
        } else {
            HospitalView.ErrorView("Invalid data type");
        }
    }

    static findPatientBy(type, value) {
        Patient.findPatientBy(type, value, (err, patient) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.showPatientDetails(patient);
            }
        });
    }

    static help() {
        HospitalView.showHelp();
    }
}

module.exports = HospitalController;
