let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
    static register(username, password, role) {
        if (!username || !password || !role)
            return HospitalView.ErrorView(
                "username, Password or Role required"
            );

        Employee.register(username, password, role, (err, employee, objArr) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.registerView(employee, objArr);
        });
    }

    static login(username, password) {
        if (!username || !password)
            return HospitalView.ErrorView("Username or Password required");

        Employee.login(username, password, (err, employee) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.loginView(employee);
        });
    }

    static logout() {
        Employee.logout((err, msg) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.logoutView(msg);
        });
    }

    static show(type) {
        if (!type) return HospitalView.ErrorView("Type Required");
        if (type !== "employee" && type !== "patient") HospitalView.ErrorView("Invalid Request");

        Employee.show(type, (err, list) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.showView(list);
        });
    }

    static addPatient(id, name, penyakit1, penyakit2) {
        if (!id || !name || !penyakit1)
            return HospitalView.ErrorView("Id, Name or Desease 1 required");

        Patient.addPatient(id, name, penyakit1, penyakit2, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.addPatientView(patient);
        });
    }

    static updatePatient(id, name, penyakit1, penyakit2) {
        if (!id || !name || !penyakit1)
            return HospitalView.ErrorView("Id, Name or Desease 1 required");

        Patient.updatePatient(
            id,
            name,
            penyakit1,
            penyakit2,
            (err, patient) => {
                if (err) return HospitalView.ErrorView(err);

                HospitalView.updatePatientView(patient);
            }
        );
    }

    static deletePatient(id, name) {
        if (!id || !name) return HospitalView.ErrorView("Id and Name required");

        Patient.deletePatient(id, name, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.deletePatientView(patient);
        });
    }

    static findPatientBy(type, field) {
        if (!type || !field) return HospitalView.ErrorView("Type and Field required");
        if (type !== "id" && type !== "name") return HospitalView.ErrorView("Invalid Request");

        Patient.findPatientBy(type, field, (err, patient) => {
            if (err) return HospitalView.ErrorView(err);

            HospitalView.findPatientByView(patient);
        });
    }
}

module.exports = HospitalController;
