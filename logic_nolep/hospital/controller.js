let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

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

    static addPatient(name, diseases) {
        Employee.getLoggedInUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (!user) return HospitalView.ErrorView('Harus Login dulu!');
            if (user.position !== 'dokter') return HospitalView.ErrorView('Hanya dokter yang bole menambah pasien!');

            Patient.add(name, diseases, (err, patient) => {
                if (err) HospitalView.ErrorView(err);
                else HospitalView.addPatientView(patient);
            });
        });
    }

    static updatePatient(id, data) {
        Employee.getLoggedInUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (!user) return HospitalView.ErrorView('Harus login dulu!');
            if (user.position !== 'dokter') return HospitalView.ErrorView('Hanya dokter yang bole update pasien!');

            Patient.update(id, data, (err, patient) => {
                if (err) HospitalView.ErrorView(err);
                else HospitalView.updatePatientView(patient);
            });
        });
    }

    static deletePatient(id) {
        Employee.getLoggedInUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (!user) return HospitalView.ErrorView('Harus login dulu!');
            if (user.position !== 'dokter') return HospitalView.ErrorView('Hanya dokter yang boleh menghapus pasien!');

            Patient.delete(id, (err, patient) => {
                if (err) HospitalView.ErrorView(err);
                else HospitalView.deletePatientView(patient);
            });
        });
    }

    static show(type) {
        Employee.getLoggedInUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (!user) return HospitalView.ErrorView('Harus login dulu!');

            if (type === 'employee') {
                if (user.position !== 'admin') {
                    return HospitalView.ErrorView('Hanya admin yang bisa melihat semua employee!');
                }
                Employee.findAll((err, data) => {
                    if (err) HospitalView.ErrorView(err);
                    else HospitalView.showEmployee(data);
                });
            } else if (type === 'patient') {
                Patient.findAll((err, data) => {
                    if (err) HospitalView.ErrorView(err);
                    else HospitalView.showPatient(data);
                });
            }
        });
    }

    static findPatient(key, value) {
        Employee.getLoggedInUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (!user) return HospitalView.ErrorView('Harus login dulu!');
            if (user.position !== 'dokter') return HospitalView.ErrorView('Hanya dokter yang boleh mencari pasien!');

            Patient.findBy(key, value, (err, patient) => {
                if (err) HospitalView.ErrorView(err);
                else HospitalView.findPatientView(patient);
            });
        });
    }

    static help() {
        HospitalView.helpView();
    }
}


module.exports = HospitalController;