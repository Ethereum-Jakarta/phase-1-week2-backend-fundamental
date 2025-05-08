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
    static help(){
        console.log(`=========================================================================
                                    HOSPITAL INTERFACE COMMAND
        ==================================================================================================`)
        console.log(`node index.js register <username> <password> <jabatan>`)
        console.log(`node index.js login <username> <password>`)
        console.log(`node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2>`)
        console.log(`node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2>`)
        console.log(`node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2>`)
        console.log(`node index.js logout`)
        console.log(`node index.js show <employee/patient>`)
        console.log(`node index.js findPatientBy: <name/id> <namePatient/idPatient>`)
    }
    static login(username, password){
        Employee.validate(position => {
            if(position == null){
                Employee.login(username, password,(err, hasil) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.loginView(hasil)
                    }
                });
            }
            else{
                HospitalView.loginChecked();
            }
        })
    }

    static addPatient(id, nama, penyakit){
        Employee.validate(position => {
            if(position){
                Patient.addPatient(id, nama, penyakit, (err, receipt) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.addPatientSuccess(receipt);
                    }
                })
            }
            else{
                console.log("anda belum login")
            }
        })
    }

    static updatePatient(id, nama, penyakit){
        Employee.validate(position => {
            if(position){
                Patient.updatePatient(id, nama, penyakit, (err, receipt) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.updatePatientSuccess(receipt);
                    }
                })
            }
            else{
                console.log("anda tidak memiliki akses untuk feature ini")
            }
        })
    }

    static deletePatient(id, nama, penyakit){
        Employee.validate(position => {
            if(position){
                Patient.deletePatient(id, nama, penyakit, (err, receipt) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.deletePatientSuccess(receipt);
                    }
                })
            }
            else{
                console.log("anda tidak memiliki akses untuk feature ini")
            }
        })
    }

    static logout(){
        Employee.validate(position => {
            if(position){
                Employee.logout((err, logoutData) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.logoutView(logoutData);
                    }
                });
            }
            else{
                console.log("anda belum login");
            }
        })
    }

    static employeeShow(){
        Employee.validate(position => {
            if(position == "admin" || position == "Admin"){
                Employee.show((err, receipt) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        HospitalView.employeeShow(receipt);
                    }
                })
            }
            else{
                console.log("Anda tidak memiliki akses")
            }
        })
    }

    static patientShow(){
        Employee.validate(position => {
            if(position == "admin" || position == "Admin"){
                Patient.show((err, receipt) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        HospitalView.patientShow(receipt);
                    }
                })
            }
            else{
                console.log("Anda tidak memiliki akses")
            }
        })
    }

    static findPatient(id, nama){
        Employee.validate(position => {
            if(position){
                Patient.findPatientBy(id, nama, (err, hasil) => {
                    if (err) {
                        HospitalView.ErrorView(err);
                    } else {
                        HospitalView.findPatientView(hasil);
                    }
                })
            }
            else{
                console.log("data yang anda cari tidak tersedia")
            }
        })
    }
    
}


module.exports = HospitalController;