let Patient = require("./patient");
let Employee = require("./employee")
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

    // lanjutkan command yang lain
    static login(username, password){
        Employee.find(username, password, (err, employee) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (employee) {
                HospitalView.loginView(employee);
            } else {
                HospitalView.ErrorView("Invalid username or password.");
            }
        });
    }

    static tambahPasien(id,namaPasien,penyakit){
        Patient.tambah(id, namaPasien, penyakit, (err, berhasil) => {
            if (err) {
                HospitalView.ErrorView(err)
            }else {
                HospitalView.BerhasilTambahPasien(berhasil)
            }
        })
    }

    static updatePasien(id, namaPasien, penyakit) {
        Patient.update(id, namaPasien, penyakit, (err, berhasil) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.BerhasilUpdatePasien(berhasil);
            }
        });
    }

    static logout() {
        console.log("Logout successful.");
    }

    static hapusPasien(id) {
        id = id[0]
        Patient.delete(id,(err, berhasil) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                HospitalView.BerhasilHapusPasien(berhasil);
            }
        });
    }

    static showData(type) {
        if (type === "employee") {
            Employee.findAll((err, employees) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showEmployees(employees);
                }
            });
        } else if (type === "patient") {
            Patient.findAll((err, patients) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.showPatients(patients);
                }
            });
        } else {
            HospitalView.ErrorView("Invalid type. Please specify 'employee' or 'patient'.");
        }
    }

    static findPatientBy(query) {
        Patient.find(query, (err, patient) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else if (patient) {
                HospitalView.showPatient(patient);
            } else {
                HospitalView.ErrorView("Patient not found.");
            }
        });
    }

    static help() {
        console.log("ada yang bisa saya bantu ?")
    }
}


module.exports = HospitalController;
