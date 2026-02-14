let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static help() {
        HospitalView.showHelp();
    }

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
            if (err) HospitalView.ErrorView(err);
            else HospitalView.loginView(user);
        });
    }

    static logout() {
        Employee.logout((err, user) => {
            if (err) HospitalView.ErrorView(err);
            else HospitalView.logoutView(user);
        });
    }

    static show(type) {
        Employee.getLoggedInUser((err, loggedInUser) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if (type === 'employee') {
                    if (loggedInUser.position === 'admin') {
                        Employee.findAll((err, employees) => {
                            if (err) HospitalView.ErrorView(err);
                            else HospitalView.showEmployees(employees);
                        });
                    } else {
                        HospitalView.ErrorView('Access denied. Only admins can view employee data.');
                    }
                } else if (type === 'patient') {
                    if (loggedInUser.position === 'dokter') {
                        Patient.findAll((err, patients) => {
                            if (err) HospitalView.ErrorView(err);
                            else HospitalView.showPatients(patients);
                        });
                    } else {
                        HospitalView.ErrorView('Access denied. Only doctors can view patient data.');
                    }
                } else {
                    HospitalView.ErrorView(`Invalid type: ${type}. Choose 'employee' or 'patient'.`);
                }
            }
        });
    }

    static addPatient(args) {
        Employee.getLoggedInUser((err, loggedInUser) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (loggedInUser.position !== 'dokter') {
                HospitalView.ErrorView('Access denied. Only doctors can add patient.');
            } else {
                const [name, ...diagnosis] = args;
                Patient.add(name, diagnosis, (err, newPatient) => {
                    if (err) HospitalView.ErrorView(err);
                    else HospitalView.addPatientView(newPatient);
                });
            }
        });
    }

    static updatePatient(args) {
        Employee.getLoggedInUser((err, loggedInUser) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (loggedInUser.position !== 'dokter') {
                HospitalView.ErrorView('Access denied. Only doctors can update patients.');
            } else {
                const [id, name, ...diagnosis] = args;
                Patient.update(+id, name, diagnosis, (err, updatePatient) => {
                    if (err) HospitalView.ErrorView(err);
                    else HospitalView.updatePatientView(updatePatient);
                });
            }
        });
    }

    static deletePatient(id) {
        Employee.getLoggedInUser((err, loggedInUser) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (loggedInUser.position !== 'dokter') {
                HospitalView.ErrorView('Access denied. Only doctors can delete patients');
            } else {
                Patient.delete(+id, (err, deletedPatient) => {
                    if (err) HospitalView.ErrorView(err);
                    else HospitalView.deletePatientView(deletedPatient);
                });
            }
        });
    }

    static findPatient(criteria, value) {
        Employee.getLoggedInUser((err, loggedInUser) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (loggedInUser.position !== 'dokter') {
                HospitalView.ErrorView('Access denied. Only doctors can find patients.');
            } else {
                Patient.findBy(criteria, value, (err, patients) => {
                    if (err) HospitalView.ErrorView(err);
                    else HospitalView.showPatients(patients);
                })
            }
        })
    }
}


module.exports = HospitalController;