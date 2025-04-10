let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
    static register (username, password, role) {
        Employee.register(username, password, role, (error, objArr) => {
            if(error){
                HospitalView.errView(error)
            }else{
                HospitalView.registerView(objArr)
            }
        })
    }

    // lanjutkan command yang lain

    static login (username, password) {
        Employee.login(username, password, (err, user) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.loginView(user)
            }
        })
    }

    static addPatient(id, namaPasien, penyakit1, penyakit2){
        Patient.addPatient(id, namaPasien, penyakit1, penyakit2, (err, value) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.addPatientView(value)
            }
        })
    }

    static updatePatient(id, namaPasien, penyakit1, penyakit2){
        Patient.updatePatient(id, namaPasien, penyakit1, penyakit2, (err, value) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.updatePatientView(value)
            }
        })
    }

    static deletePatient(id, namaPasien, penyakit1, penyakit2){
        Patient.deletePatient(id, namaPasien, penyakit1, penyakit2, (err, value) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.deletePatientView(value)
            }
        })
    }

    static show(data){
        Patient.show(data, (err, value) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.showView(value)
            }
        })
    }

    static findPatient(type, value){
        Patient.findPatientBy(type, value, (err, value) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.findPatientView(value)
            }
        })
    }


    static logOut(){
        Employee.logOut((err, result) => {
            if(err){
                HospitalView.errView(err)
            }else{
                HospitalView.logOutView(result)
            }
        })
    }




    static help() {
        HospitalView.helpView()
    }

}


module.exports = HospitalController;