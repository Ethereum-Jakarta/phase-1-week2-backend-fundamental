const Patient = require("./patient");
const Employee = require("./employee");
const HospitalView = require("./view");
const Session = require("./session");

class HospitalController {
    static async register(name, password, role) {
        try {
            const objArr = await Employee.register(name, password, role);
            HospitalView.registerView(objArr);
        } catch (err) {
            HospitalView.ErrorView(err.message);
        }
    }

    static async login(username, password) {
        const currentSession = await Session.getSession();
        if (currentSession) {
            HospitalView.ErrorView(`Anda sudah login sebagai ${currentSession.role} (${currentSession.username}). Silakan logout terlebih dahulu untuk login akun lain.`);
            return;
        }
        try {
            const data = await Employee.findAll();
            const user = data.find(emp => emp.username === username && emp.password === password);
            if (!user) return HospitalView.ErrorView("Username atau password salah.");
            await Session.saveSession(user);
            HospitalView.loginView(user);
        } catch (err) {
            HospitalView.ErrorView(err.message);
        }
    }

    static async logout() {
        const currentSession = await Session.getSession();
        if (!currentSession) {
            HospitalView.ErrorView('Anda belum login.');
            return;
        }
        await Session.clearSession();
        HospitalView.logoutView();
    }

    static async addPatient(id, name, ...diseases) {
        const user = await Session.getSession();
        if (!user || (user.role !== 'dokter' && user.role !== 'admin')) {
            HospitalView.ErrorView('Hanya dokter atau admin yang bisa menambah pasien. Silakan login sebagai dokter atau admin.');
            return;
        }
        try {
            const objArr = await Patient.register(id, name, ...diseases);
            HospitalView.registerPatientView(objArr);
        } catch (err) {
            HospitalView.ErrorView(err.message);
        }
    }

    static async updatePatient(id, name, ...diseases) {
        const user = await Session.getSession();
        if (!user || (user.role !== 'dokter' && user.role !== 'admin')) {
            HospitalView.ErrorView('Hanya dokter atau admin yang bisa update pasien. Silakan login sebagai dokter atau admin.');
            return;
        }
        try {
            const objArr = await Patient.update(id, name, ...diseases);
            HospitalView.updatePatientView(objArr);
        } catch (err) {
            HospitalView.ErrorView(err.message);
        }
    }

    static async deletePatient(id) {
        const user = await Session.getSession();
        if (!user || (user.role !== 'dokter' && user.role !== 'admin')) {
            HospitalView.ErrorView('Hanya dokter atau admin yang bisa menghapus pasien. Silakan login sebagai dokter atau admin.');
            return;
        }
        try {
            const objArr = await Patient.delete(id);
            HospitalView.deletePatientView(objArr);
        } catch (err) {
            HospitalView.ErrorView(err.message);
        }
    }

    static async show(role) {
        const user = await Session.getSession();
        if (!user) {
            HospitalView.ErrorView('Silakan login terlebih dahulu.');
            return;
        }
        if (role === 'employee') {
            if (user.role !== 'admin') {
                HospitalView.ErrorView('Hanya admin yang bisa melihat data employee.');
                return;
            }
            try {
                const data = await Employee.findAll();
                HospitalView.showListView('employee', data);
            } catch (err) {
                HospitalView.ErrorView(err.message);
            }
        } else if (role === 'patient') {
            try {
                const data = await Patient.findAll();
                HospitalView.showListView('patient', data);
            } catch (err) {
                HospitalView.ErrorView(err.message);
            }
        } else {
            HospitalView.ErrorView('Role tidak valid. Pilih employee atau patient.');
        }
    }

    static async findPatientBy(type, value) {
        const user = await Session.getSession();
        if (!user) {
            HospitalView.ErrorView('Silakan login terlebih dahulu.');
            return;
        }
        try {
            const data = await Patient.findPatientBy(type, value);
            HospitalView.showPatientSearchResult(data);
        } catch (err) {
            HospitalView.ErrorView(err.message);
        }
    }

    static help() {
        HospitalView.helpView();
    }
}

module.exports = HospitalController;
