import Employee from "./employee.js";
import Patient from "./patient.js";
import HospitalView from "./view.js";

class HospitalController {
    static help() {
        HospitalView.helpView()
    }

    static async register(name, password, role) {
        try {
            const result = await Employee.register(name, password, role)
            HospitalView.registerView(result)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }

    // lanjutkan command yang lain
    static async login(username, password) {
        try {
            const user = await Employee.login(username, password)
            HospitalView.loginView(user)                 
        } catch (error) {   
            HospitalView.ErrorView(error)
        }
    }

    static async logout() {
        try {
            const user = await Employee.logout()
            HospitalView.logoutView(user)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }

    static async addPatient(name, disease) {
        try {
            const user = await Employee.isUserLoggedIn()
            if (!user) throw new Error(`Tidak sedang login di akun manapun, Login Dahulu!`)

            const role = user.position
            if (role !== 'dokter') {
                throw new Error(`Anda bukan dokter, tidak bisa menambah data pasien!`)
            }

            const patient = await Patient.addPatient(name, disease)

            HospitalView.addPatientView(patient)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }

    static async updatePatient(id, newName, newDisease) {
        try {
            const user = await Employee.isUserLoggedIn()
            if (!user)  throw new Error(`Tidak sedang login di akun manapun, Login Dahulu!`)

            const role = user.position
            if (role !== 'dokter') {
                throw new Error(`Anda bukan dokter, tidak bisa mengubah data pasien!`)
            }

            const patient = await Patient.updatePatient(id, newName, newDisease)

            HospitalView.updatePatientView(patient)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }

    static async deletePatient(id) {
        try {
            const user = await Employee.isUserLoggedIn()
            if (!user) throw new Error(`Tidak sedang login di akun manapun, Login Dahulu!`)

            const role = user.position
            if (role !== 'dokter') {
                throw new Error(`Anda bukan dokter, tidak bisa menghapus data pasien!`)
            }

            const patient = await Patient.deletePatient(id)

            HospitalView.deletePatientView(patient)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }

    static async show(type) {
        try {
            if (type !== 'employee' && type !== 'patient') {
                throw new Error(`Masukkan argument yang benar! <employee> atau <patient>`)
            }

            const user = await Employee.isUserLoggedIn()

            if (type === 'patient' && user.position !== 'dokter') {
                throw new Error('Anda bukan dokter!')   
            }
            if (type === 'employee' && user.position !== 'admin') {
                throw new Error('Anda bukan admin!')
            }

            const data = type === 'employee' ? await Employee.show() : await Patient.show()

            HospitalView.showView(data)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }

    static async findPatientBy(input) {
        try {
            const user = await Employee.isUserLoggedIn()
            if (!user) throw new Error(`Tidak sedang login di akun manapun, Login Dahulu!`)

            const role = user.position
            if (role !== 'dokter') {
                throw new Error(`Anda bukan dokter, tidak bisa mendapatkan data pasien!`)
            }

            const patient = await Patient.findPatientBy(input)

            HospitalView.findPatientByView(patient)
        } catch (error) {
            HospitalView.ErrorView(error)
        }
    }
}


export default HospitalController