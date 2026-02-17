import { Employee, Patient } from '../model/index.js';
import { HospitalView } from "../view/index.js"

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
    static login = (name, password) => {
        Employee.login(name, password, (err, res) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(res);
            }
        })
    }
    static logout = () => {
        Employee.logout((err, res) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.logoutView(res);
            }
        })
    }
    static addPatient = (id, name, disease1, disease2) => {
        Patient.addPatient(id, name, disease1, disease2, (err, res) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.addPatientView(res);
            }
        })
    }
    static updatePatient = (id, name, disease1, disease2) => {
        Patient.updatePatient(id, name, disease1, disease2, (err, res) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.updatePatientView(res);
            }
        })
    }
    static deletePatient = (id, name, disease1, disease2) => {
        Patient.deletePatient(id, name, disease1, disease2, (err, res) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.deletePatientView(res);
            }
        })
    }
    static show = (type) => {
        if (type === "employee") {
            Employee.showEmployee((err, res) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showView(res);
                }
            })
        } else if (type === "patient") {
            Patient.showPatient((err, res) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showView(res);
                }
            })
        }
    }
    static findPatientBy = (type, key) => {
        Patient.findPatientBy(type, key, (err, res) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.findPatientByView(res);
            }
        })
    }
    static help = () => {
        HospitalView.helpView()
    }
}

export { HospitalController }
