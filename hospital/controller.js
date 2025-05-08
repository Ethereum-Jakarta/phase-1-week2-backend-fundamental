let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");
const { error } = require("console");

class HospitalController {

    static async register(username, password, position){
        try {
            const countEmployee = await Employee.register(username, password, position)
            
            HospitalView.registerView(countEmployee)
        } catch (err) {
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async login(username, password){
        try {
            const countEmployee = await Employee.login(username, password)
            const validation = await Employee.validationPosition()

            if (validation === null){
                HospitalView.loginView(countEmployee)
                return countEmployee
            } else {
                HospitalView.loginView(countEmployee)
            }
        } catch (err){
            HospitalView.errorView(err)
            console.log(err.message)
            return null
        }
    }

    static async addPatient(id, namePatient, disease){
        try {
            const countEmployee = await Patient.addPatient(id, namePatient, disease)

            HospitalView.addPatientView(countEmployee)
        } catch (err) {
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async updatePatient(id, namePatient, disease){
        try {
            const countEmployee = await Patient.updatePatient(id, namePatient, disease)

            HospitalView.updatePatientView(countEmployee)
        } catch (err) {
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async deletePatient(id, namePatient){
        try {
            const countEmployee = await Patient.deletePatient(id, namePatient)

            HospitalView.deletePatientView(countEmployee)
        } catch (err) {
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async logout(){
        try {
            const countEmployee = await Employee.logout()

            HospitalView.logoutView(countEmployee)
        } catch (err){
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async show(employeePatient){
        try {
            if (employeePatient.toLowerCase() === 'employee'){
                const countEmployee = await Employee.show()

                HospitalView.showView(countEmployee)
            } else if (employeePatient.toLowerCase() === 'patient') {
                const countEmployee = await Patient.show()

                HospitalView.showView(countEmployee)
            }
            else {
                throw new error('employee or patient wrong!')
            }
        } catch (err){
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async findPatientBy(id, namePatient) {
        try {
            const countEmployee = await Patient.findPatientBy(id, namePatient)

            HospitalView.findPatientByView(countEmployee)
        } catch (err) {
            HospitalView.errorView(err)
            console.log(err.message)
        }
    }

    static async help(){
        try {
            HospitalView.helpView()
        } catch (err) {
            console.log(err.message)
        }
    }

    // lanjutkan command yang lain
}


module.exports = HospitalController;