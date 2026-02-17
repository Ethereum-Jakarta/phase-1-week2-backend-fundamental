let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");
let Session = require("./session");

class HospitalController {

    static register(name, password, role) {
        // Role hanya boleh 'dokter' atau 'admin' untuk employee
        if (role === 'dokter' || role === 'admin') {
            Employee.register(name, password, role, (err, objArr) => {
                if (err) {
                    HospitalView.ErrorView(err);
                } else {
                    HospitalView.registerView(objArr);
                }
            });
        } else {
            HospitalView.ErrorView('Role tidak valid. Pilih dokter atau admin.');
        }
    }

    static login(username, password) {
        const currentSession = Session.getSession();
        if (currentSession) {
            HospitalView.ErrorView(`Anda sudah login sebagai ${currentSession.role} (${currentSession.username}). Silakan logout terlebih dahulu untuk login akun lain.`);
            return;
        }
        Employee.findAll((err, data) => {
            if (err) return HospitalView.ErrorView(err);
            const user = data.find(emp => emp.username === username && emp.password === password);
            if (!user) return HospitalView.ErrorView("Username atau password salah.");
            Session.saveSession(user);
            HospitalView.loginView(user);
        });
    }

    static logout() {
        const currentSession = Session.getSession();
        if (!currentSession) {
            HospitalView.ErrorView('Anda belum login.');
            return;
        }
        Session.clearSession();
        HospitalView.logoutView();
    }

    static addPatient(id, name, ...diseases) {
        const user = Session.getSession();
        if (!user || (user.role !== 'dokter' && user.role !== 'admin')) {
            HospitalView.ErrorView('Hanya dokter atau admin yang bisa menambah pasien. Silakan login sebagai dokter atau admin.');
            return;
        }
        Patient.register(id, name, ...diseases, (err, objArr) => {
            if (err) HospitalView.ErrorView(err);
            else HospitalView.registerPatientView(objArr);
        });
    }

    static updatePatient(id, name, ...diseases) {
        const user = Session.getSession();
        if (!user || (user.role !== 'dokter' && user.role !== 'admin')) {
            HospitalView.ErrorView('Hanya dokter atau admin yang bisa update pasien. Silakan login sebagai dokter atau admin.');
            return;
        }
        Patient.update(id, name, ...diseases, (err, objArr) => {
            if (err) HospitalView.ErrorView(err);
            else HospitalView.updatePatientView(objArr);
        });
    }

    static deletePatient(id) {
        const user = Session.getSession();
        if (!user || (user.role !== 'dokter' && user.role !== 'admin')) {
            HospitalView.ErrorView('Hanya dokter atau admin yang bisa menghapus pasien. Silakan login sebagai dokter atau admin.');
            return;
        }
        Patient.delete(id, (err, objArr) => {
            if (err) HospitalView.ErrorView(err);
            else HospitalView.deletePatientView(objArr);
        });
    }

    static show(role) {
        const user = Session.getSession();
        if (!user) {
            HospitalView.ErrorView('Silakan login terlebih dahulu.');
            return;
        }
        if (role === 'employee') {
            if (user.role !== 'admin') {
                HospitalView.ErrorView('Hanya admin yang bisa melihat data employee.');
                return;
            }
            Employee.findAll((err, data) => {
                if (err) HospitalView.ErrorView(err);
                else HospitalView.showListView('employee', data);
            });
        } else if (role === 'patient') {
            Patient.findAll((err, data) => {
                if (err) HospitalView.ErrorView(err);
                else HospitalView.showListView('patient', data);
            });
        } else {
            HospitalView.ErrorView('Role tidak valid. Pilih employee atau patient.');
        }
    }

    static findPatientBy(type, value) {
        const user = Session.getSession();
        if (!user) {
            HospitalView.ErrorView('Silakan login terlebih dahulu.');
            return;
        }
        Patient.findPatientBy(type, value, (err, data) => {
            if (err) HospitalView.ErrorView(err);
            else HospitalView.showPatientSearchResult(data);
        });
    }

    // lanjutkan command yang lain

    static help(){
        HospitalView.helpView();
    }
}


module.exports = HospitalController;