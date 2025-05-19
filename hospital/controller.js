let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role)
        .then(objArr => {
            HospitalView.registerView(objArr);          
        })
        .catch(err => {
            HospitalView.ErrorView(err);
        })      
    }

    // lanjutkan command yang lain

    static login(name, password) {
        Employee.getCurrentLogin()
            .then(()=> {
                Employee.login(name, password)
                    .then(data => {
                        HospitalView.loginView(data)
                    })
                    .catch(err => {
                        HospitalView.ErrorView(err)
                    })
            })
            .catch(()=> {
                HospitalView.ErrorView("Please log out first")
            })
    }

    static logout(){
        Employee.logout()
            .then(data => {
                HospitalView.LogoutView(data)
            })
            .catch(err => {
                HospitalView.ErrorView(err)
            })
    }

    static addPatient(id, name, diseases) {
        Employee.getCurrentLogin()
            .then(() => {
                HospitalView.ErrorView("You must login first")
            })
            .catch(data => {
                if(data.position === "doctor") {
                    Patient.addPatient(id, name, diseases)
                        .then(objArr => {
                            HospitalView.addPatientView(objArr)
                        })
                        .catch(err => {
                            HospitalView.ErrorView(err)
                        })
                }else {
                    HospitalView.ErrorView("Your role not have access to this command")
                }
            })
    }

    static updatePatient(name, diseases){
        Employee.getCurrentLogin()
            .then(() => {
                HospitalView.ErrorView("You must login first")
            })
            .catch(data => {
                if(data.position === "doctor") {
                    Patient.updatePatient(name, diseases)
                        .then(patient => {
                            HospitalView.updatePatientView(patient)
                        })
                        .catch(err => {
                            HospitalView.ErrorView(err)
                        })
                }else {
                    HospitalView.ErrorView("Your role not have access to this command")
                }
            })
    }

    static deletePatient(id) {
        Employee.getCurrentLogin()
            .then(() => {
                HospitalView.ErrorView("You must login first")
            })
            .catch(data => {
                if(data.position === "doctor") {
                    Patient.deletePatient(id)
                        .then(patient => {
                            HospitalView.deletePatientView(patient)
                        })
                        .catch(err => {
                            HospitalView.ErrorView(err)
                        })
                } else {
                    HospitalView.ErrorView("Your role not have access to this command")
                }
            })
    }

    static show(option){
        if(option === "employee") {
            Employee.getCurrentLogin()
                .then(() => {
                    HospitalView.ErrorView("You must login first")
                })
                .catch(data => {
                    if(data.position === "admin") {
                        Employee.show()
                            .then(data => {
                                HospitalView.showEmployeeView(data)
                            })
                            .catch(err => {
                                HospitalView.ErrorView(err)
                            })
                    }else {
                        HospitalView.ErrorView("Your role not have access to this command")
                    }
                })
        }else{
            Employee.getCurrentLogin()
                .then(() => {
                    HospitalView.ErrorView("You must login first")
                })
                .catch(() => {
                    Patient.show()
                        .then(data => {
                            HospitalView.showPatientView(data)
                        })
                        .catch(err => {
                            HospitalView.ErrorView(err)
                        })
                })
        }
    }

    static findPatientBy(option, input) {
        Employee.getCurrentLogin()
            .then(() => {
                HospitalView.ErrorView("You must login first")
            })
            .catch(() => {
                Patient.findPatientBy(option, input)
                    .then(data => {
                        HospitalView.findPatientView(data, option)
                    })
                    .catch(err => {
                        HospitalView.ErrorView(err)
                    })
            })
    }

    static help() {
        HospitalView.CommandListView();
    }

}


module.exports = HospitalController;