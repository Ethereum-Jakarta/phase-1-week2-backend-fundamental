let Patient = require('./patient');
let Employee = require('./employee');
let HospitalView = require('./view');

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.registerView(objArr);
            }
        })
    }
    // lanjutkan command lain
    static login(username, password) {
        Employee.login(username, password, (err, employee) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.loginView(employee);
            }
        })
    }

    static logout() {
        Employee.logout((err, employee) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.logoutView(employee);
            }
        })
    }

    static addPatient(args) {
        const name = args[0];
        const disease = args.slice(1);
        
        Employee.getLoggedIn((err, user) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            if (!user) {
                return HospitalView.ErrorView('You must login first!');
            }

            if (user.position !== 'dokter') {
                return HospitalView.ErrorView('You are not a doctor!');
            }

            Patient.add(name, disease, (err, patient) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.addPatientView(patient);
                }
            })
        })

        
    }

    static updatePatient(id, name, disease) {
        Employee.getLoggedIn((err, user) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            if (!user) {
                return HospitalView.ErrorView('You must login first!');
            }

            if (user.position !== 'dokter'){
                return HospitalView.ErrorView('You are not a doctor!');
            }

            Patient.update(id, name, disease, (err, patient) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.updatePatientView(patient);
                }
            })
        })
    }

    static deletePatient(id) {
        Employee.getLoggedIn((err, user) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            if (!user) {
                return HospitalView.ErrorView('You must login first!');
            }

            if (user.position !== 'dokter'){
                return HospitalView.ErrorView('You are not a doctor!');
            }

            Patient.delete(id, (err, patient) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.deletePatientView(patient);
                }
            })
        }) 
    }

    static show(type) {
        Employee.getLoggedIn((err, user) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            if (!user) {
                return HospitalView.ErrorView('You must login first!');
            }

            if (type === 'employee') {
                if (user.position !== 'admin'){
                    return HospitalView.ErrorView('Only admin can see an employee!');
                }

                Employee.findAll((err, data) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.showEmployeeView(data);
                    }
                })
            } else if (type === 'patient') {
                if (user.position !== 'dokter') {
                    HospitalView.ErrorView('Only doctor can see patients!');
                }

                Patient.findAll((err, data) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.showPatientView(data);
                    }
                })
            } else {
                HospitalView.ErrorView('Invalid command');
            }
        })
    }

    static findPatientBy(type, value) {
        Employee.getLoggedIn((err, user) => {
            if (err) {
                return HospitalView.ErrorView(err);
            }

            if (!user) {
                return HospitalView.ErrorView('You must login first!');
            }

            if (user.position !== 'dokter') {
                return HospitalView.ErrorView('Only doctor can find patient');
            }

            Patient.findAll((err, data) => {
                if (err) {
                    return HospitalView.ErrorView(err);
                }

                let result;
                if (type === 'name') {
                    result = data.filter(p => p.name === value);
                } else if (type === 'id') {
                    result = data.filter(p => p.id === Number(value));
                } else {
                    console.log('Invalid type command');
                }

                HospitalView.findPatientView(result);
            })
        })
    }

}

module.exports = HospitalController;
