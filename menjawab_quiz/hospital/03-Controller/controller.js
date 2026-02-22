let Patient = require("../01-Model/patient");
let Employee = require("../01-Model/employee");
let HospitalView = require("../02-View/view");

class HospitalController {
    static register(name, password, role) {
        if (name === undefined || password === undefined || role === undefined) {
            HospitalView.wrongCommand(); 
        } else {
            Employee.register(name, password, role, (err, objArr) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.registerView(objArr);
                }
            });
        }
    }
    
    static login(name, password) {
        if (name === undefined || password === undefined) {
            HospitalView.wrongCommand(); 
        } else {
           Employee.login(name, password, (err, logInfo) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(logInfo);
            }
           }, (username) => {
            HospitalView.loginTrue(username);
           } )
        }
    }

    static logout() {
        Employee.logout((err, logInfo) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.logoutView(logInfo);
            } 
        })
    }

    static addPatient(id, patientName, disease) {
        if (id === undefined || patientName === undefined || disease === undefined) {
            HospitalView.wrongCommand(); 
        } else if(isNaN(parseInt(id))) {
            console.log("id tidak valid!")
        } else {
            Patient.addPatient(id, patientName, disease, (err, objArr) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.addPatientView(objArr);
                }
            });
        }
    }

    static updatePatient(id, patientName, disease) {
        if (id === undefined || patientName === undefined || disease === undefined) {
            HospitalView.wrongCommand(); 
        } else if(isNaN(parseInt(id))) {
            console.log("id tidak valid!")
        } else {
            Patient.updatePatient(id, patientName, disease, (err, obj) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.updatePatientView(obj);
                }
            });
        }
    }

    static deletePatient(id, patientName) {
        if (id === undefined ) {
            HospitalView.wrongCommand(); 
        } else if(isNaN(parseInt(id))) {
            console.log("id tidak valid!")
        } else {
            Patient.deletePatient(id, patientName, (err, obj) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.deletePatientView(obj);
                }
            });
        }
    }

    static show(type) {
        if (type.toLowerCase() === "patient") {
            Patient.showPatient((err, obj) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showPatientView(obj);
                }
            });
        } else if ( type.toLowerCase() === "employee") {
            Employee.showEmployee((err, obj) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showEmployeeView(obj);
                }
            });
        } else {
            HospitalView.wrongCommand();
        }
    }

    static findPatient(nameId) {
        if (nameId === undefined) {
            HospitalView.wrongCommand(); 
        } else {
            Patient.findPatient(nameId, (err, obj) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.findPatientView(obj);
                }
            });
        }
    }

    // lanjutkan command yang lain
    static help() {
        HospitalView.helpView();
    }
}


module.exports = HospitalController;