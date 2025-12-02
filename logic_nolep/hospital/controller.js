let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
    
    static register(name, password, role) {
        Employee.register(name, password, role, (err, objArr) => {
            if (err) return HospitalView.ErrorView(err);
            HospitalView.registerView(objArr);
        });
    }

    static login(username, password) {
        Employee.login(username, password, (err, user) => {
            if (err) return HospitalView.ErrorView(err);
            HospitalView.loginView(user);
        });
    }

    static logout() {
        Employee.logout((err) => {
            if (err) return HospitalView.ErrorView(err);
            HospitalView.logoutView();
        });
    }

    static addPatient(args) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (user.position !== "dokter") return HospitalView.ErrorView("Hanya dokter!");

            let [id, nama, ...penyakit] = args;

            Patient.add(id, nama, penyakit, (err, data) => {
                if (err) return HospitalView.ErrorView(err);
                HospitalView.addPatientView(data);
            });
        });
    }

    static updatePatient(args) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (user.position !== "dokter") return HospitalView.ErrorView("Hanya dokter!");

            let [id, nama, ...penyakit] = args;

            Patient.update(id, nama, penyakit, (err, data) => {
                if (err) return HospitalView.ErrorView(err);
                HospitalView.updatePatientView(data);
            });
        });
    }

    static deletePatient(args) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);
            if (user.position !== "dokter") return HospitalView.ErrorView("Hanya dokter!");

            let [id] = args;

            Patient.delete(id, (err, data) => {
                if (err) return HospitalView.ErrorView(err);
                HospitalView.deletePatientView(data);
            });
        });
    }

    static show(type) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.ErrorView(err);

            if (type === "employee") {
                if (user.position !== "admin") {
                    return HospitalView.ErrorView("Hanya admin!");
                }
                Employee.findAll((err, data) => {
                    if (err) return HospitalView.ErrorView(err);
                    HospitalView.showEmployeeView(data);
                });
            }

            if (type === "patient") {
                if (user.position !== 'dokter') {
                    return HospitalView.ErrorView('Hanya dokter!');
                }
                
                Patient.findAll((err, data) => {
                    if (err) return HospitalView.ErrorView(err);
                    HospitalView.showPatientView(data);
                });
            }
        });
    }

    static findPatientBy(key, value) {
        Patient.findAll((err, data) => {
            if (err) return HospitalView.ErrorView(err);

            let found = data.filter(p => p[key] == value);

            HospitalView.findPatientView(found);
        });
    }


    static help() {
        console.log(`
Command:
> register <username> <password> <role>
> login <username> <password>
> logout
> addPatient <id> <name> <penyakit...>
> updatePatient <id> <name> <penyakit...>
> deletePatient <id>
> show <employee/patient>
> findPatientBy: <name/id> <value>
        `);
    }
}

module.exports = HospitalController;
