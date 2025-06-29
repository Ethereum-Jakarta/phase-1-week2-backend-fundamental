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
        Employee.login(username, password, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(objArr);
            }
        });
    }

    static logout(username, password) {
        Employee.logout((err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.logoutView(objArr);
            }
        });
    }

    static addPatient(id, namaPasien, penyakit1, penyakit2) {
        Patient.addPatient(id, namaPasien, penyakit1, penyakit2, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.addPatient(objArr);
            }
        });
    }

    static updatePatient(id, namaPasien, penyakit1, penyakit2) {
        Patient.updatePatient(id, namaPasien, penyakit1, penyakit2, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.updatePatient(objArr);
            }
        });
    }

    static deletePatient(id) {
        Patient.deletePatient(id, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.deletePatient(objArr);
            }
        });
    }

    static show(tipe) {
        Patient.show(tipe, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if (tipe === 'patient') {
                    HospitalView.showPatient(objArr);
                } else {
                    HospitalView.showEmployee(objArr);
                }
            }
        });
    }

    static findPatientBy(id, namaPasien) {
        Patient.findPatientBy(id, namaPasien, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.findPatientBy(objArr);
            }
        });
    }

    static help() {
        HospitalView.helpView();
    }
}


module.exports = HospitalController;