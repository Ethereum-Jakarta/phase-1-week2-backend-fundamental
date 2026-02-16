let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");
// console.log(Employee)

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

    static login(name, password) {
        Employee.login(name, password, (err, result) => {
            if (err) {
                HospitalView.loginError(err);
            } else {
                switch (result.status) {
                    case "already-login":
                        HospitalView.alreadyLogin(result.user);
                        break;
                    case "invalid-credentials":
                        HospitalView.invalidLogin();
                        break;
                    case "success":
                        HospitalView.loginSuccess(result.user);
                        break;
                }
            }
        });
    }

    static logout() {
        Employee.logout((err, result) => {
            if (err) {
                HospitalView.logoutError();
            } else {
                if (result.status === "no-user-logged-in") {
                    HospitalView.noUserLoggedIn();
                } else {
                    HospitalView.logoutSuccess(result.user);
                }
            }
        })
    }

    static addPatient(id, nama, penyakit1, penyakit2) {
        Patient.addPatient(id, nama, penyakit1, penyakit2, (err, result) => {
            if (err) {
                HospitalView.addPatientError()
            } else {
                if (result.status === "please-login") {
                    HospitalView.addPatientBeforeLogin();
                } else if (result.status === "not-a-doctor") {
                    HospitalView.addPatientNotDoctor();
                } else if (result.status === "duplicate-id") {
                    HospitalView.addPatientDuplicate();
                } else {
                    HospitalView.addPatientSuccess(result.patient)
                }
            }
        })
    }

    static updatePatient(id, nama, penyakit1, penyakit2) {
        Patient.updatePatient(id, nama, penyakit1, penyakit2, (err, result) => {
            if (err) {
                HospitalView.updatePatientError();
            } else {
                if (result.status === "please-login") {
                    HospitalView.addPatientBeforeLogin();
                } else if (result.status === "not-a-doctor") {
                    HospitalView.addPatientNotDoctor();
                } else if (result.status === "no-data") {
                    HospitalView.updateNoData();
                } else {
                    HospitalView.updatePatientSuccess(result);
                }
            }
        })
    }

    static deletePatient(id, nama, penyakit1, penyakit2) {
        Patient.deletePatient(id, nama, penyakit1, penyakit2, (err, result) => {
            if (err) {
                HospitalView.deletePatientError();
            } else {
                if (result.status === "please-login") {
                    HospitalView.addPatientBeforeLogin();
                } else if (result.status === "not-a-doctor") {
                    HospitalView.addPatientNotDoctor();
                } else if (result.status === "no-data") {
                    HospitalView.deleteNoData();
                } else if (result.status === "not-found") {
                    HospitalView.deleteNotFound(result.id);
                } else {
                    HospitalView.deletePatientSuccess(result);
                }
            }
        })
    }

    static show(type) {
        Employee.show(type, (err, result) => {
            if (err) {
                HospitalView.showError();
            } else {
                if (result.status === "please-login") {
                    HospitalView.showBeforeLogin();
                } else if (result.status === "not-a-admin") {
                    HospitalView.showNotAdmin();
                } else if (result.status === "wrong-type") {
                    HospitalView.showWrongType();
                } else if (result.status === "showAdmin") {
                    HospitalView.showEmployeeSucces(result.dataEmployee);
                } else if (result.status === "showDokter") {
                    HospitalView.showPatientSuccess(result.dataPatient);
                }
            }
        })
    }

    static findPatientBy(name, id) {
        Patient.findPatient(name, id, (err, result) => {
            if (err) {
                HospitalView.findPatientError(err)
            } else {
                if (result.status === "not-found") {
                    HospitalView.findPatientNotFound()
                } else {
                    HospitalView.findPatientSuccess(result.data)
                }
            }
        })
    }
    // lanjutkan command yang lain
}


module.exports = HospitalController;