const fs = require("fs");
const HospitalView = require("./view");
const Employee = require("./employee");
const Patient = require("./patient");

class HospitalController {
    static session = null; 

    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.errorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        });
    }

    static login(name, password) {
        Employee.login(name, password, (err, employee) => {
            if (err) {
                HospitalView.errorView(err);
            } else {
                this.session = employee; 
                HospitalView.loginView(employee);
            }
        });
    }

    static checkSession() {
        if (!this.session) {
            HospitalView.errorView("Anda harus login terlebih dahulu!");
            return false;
        }
        return true;
    }

    static addPatient(name, penyakit) {
        if (!this.checkSession()) return;
        Patient.add(name, penyakit, (err, patient) => {
            if (err) {
                HospitalView.errorView(err);
            } else {
                HospitalView.addPatientView(patient);
            }
        });
    }

    static updatePatient(id, penyakit) {
        if (!this.checkSession()) return;
        Patient.update(id, penyakit, (err, patient) => {
            if (err) {
                HospitalView.errorView(err);
            } else {
                HospitalView.updatePatientView(patient);
            }
        });
    }

    static deletePatient(id) {
        if (!this.checkSession()) return;
        Patient.delete(id, (err, message) => {
            if (err) {
                HospitalView.errorView(err);
            } else {
                HospitalView.deletePatientView(message);
            }
        });
    }

    static logout() {
        if (!this.checkSession()) return;
        this.session = null; 
        HospitalView.logoutView("Logout berhasil!");
    }

    static show(type) {
        if (!this.checkSession()) return;
        if (type === "employee") {
            Employee.findAll((err, employees) => {
                if (err) {
                    HospitalView.errorView(err);
                } else {
                    HospitalView.showEmployeesView(employees);
                }
            });
        } else if (type === "patient") {
            Patient.findAll((err, patients) => {
                if (err) {
                    HospitalView.errorView(err);
                } else {
                    HospitalView.showPatientsView(patients);
                }
            });
        } else {
            HospitalView.errorView("Invalid type! Use 'employee' or 'patient'.");
        }
    }

    static findPatientBy(type, value) {
        if (!this.checkSession()) return;
        Patient.findBy(type, value, (err, patient) => {
            if (err) {
                HospitalView.errorView(err);
            } else {
                HospitalView.findPatientView(patient);
            }
        });
    }
 
    static help() {
        HospitalView.helpView();
    }
}

module.exports = HospitalController;
