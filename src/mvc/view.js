export class EmployeeView {

    static register(employee = {}) {

        return {
            message: "Success Register",
            data: employee
        }
    }

    static login(employee) {
        return {
            message: "Success Login",
            data: employee
        }
    }

    static logout(employee = "") {
        return {
            message: "Success Logouting employee with username : " + employee
        }
    }

    static addPatient(patient = {}) {
        return {
            message: "Success Add Patient",
            data: patient
        }
    }

    static updatePatient(patientBefore = {}, patientAfter = {}) {
        return {
            message: "Success Update Patient",
            dataBefore: patientBefore,
            dataAfter: patientAfter
        }
    }

    static deletePatient(patient = {}) {
        return {
            message: "Success Delete Patient",
            data: patient
        }
    }

    static found(employee = {}) {

        return {
            message: "Found",
            data: employee
        }
    }

    static showAll(employees = []) {

        return {
            message: "All Employee",
            data: employees
        }

    }

}

export class PatientView {

    static showAll(patients = []) {
        return {
            message: "All Patient",
            data: patients
        }
    }

    static notFound(id = 0) {
        return {
            message: "Patient with id " + id + " Not Found"
        }
    }

}

export class ErrView {

    static hasLogin(employeeUsername) {

        return {
            message: `Employee with username ${employeeUsername} was login, please logout`
        }
    }

    static hasNoLogin() {

        return {
            message: `Nothing Session Available`
        }
    }

    static hasNoAccess() {
        return {
            message: `This Role Are Not Have Access`
        }
    }

    static validateFail() {
        return {
            message: "Cek field ada yang tidak valid"
        }
    }

    static duplicateError() {
        return {
            message: "ada field yang harus unik"
        }
    }

    static wrongCredential() {
        return {
            message: "Username Atau Password Salah"
        }
    }

    static wrongStatus(jabatan) {
        return {
            message: "Tidak ada status " + jabatan
        }
    }

}