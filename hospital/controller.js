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
    static login(name, password){
        Employee.isLogin((err,info) =>{
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if(info.login){
                    HospitalView.ErrorView("Anda sudah login, jika ingin mengganti akun silakan logout dahulu");
                } else {
                    Employee.login(name,password,(err,dataUser) =>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            HospitalView.loginView(dataUser);
                        }
                    })
                }
            }
        })
    }
    static addPatient(id,nama,penyakit){
        Employee.isLogin((err,info) =>{
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if(info.login==false){
                    HospitalView.ErrorView("Anda belum login, silakan login terlebih dahulu");
                } else {
                    Patient.addPatient(id,nama,penyakit,(err,info)=>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            HospitalView.addPatientView(info);
                        }
                    })
                }
            }
        })
    }
    static updatePatient(id,nama,penyakit){
        Employee.isLogin((err,info) =>{
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if(info.login==false){
                    HospitalView.ErrorView("Anda belum login, silakan login terlebih dahulu");
                } else {
                    Patient.updatePatient(id,nama,penyakit,(err,info)=>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            if(info == "Id tidak ditemukan"){
                                HospitalView.ErrorView(info);
                            } else {
                                HospitalView.updatePatientView(info);
                            }
                        }
                    })
                }
            }
        })
    }
    static deletePatient(id,nama){
        Employee.isLogin((err,info) =>{
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if(info.login==false){
                    HospitalView.ErrorView("Anda belum login, silakan login terlebih dahulu");
                } else {
                    Patient.deletePatient(id,nama,(err,info)=>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            if(info == "Id tidak ditemukan"){
                                HospitalView.ErrorView(info);
                            } else {
                                HospitalView.deletePatientView(info);
                            }
                        }
                    })
                }
            }
        })
    }
    static findPatientBy(arg1,arg2){
        Employee.isLogin((err,info) =>{
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                if(info.login==false){
                    HospitalView.ErrorView("Anda belum login, silakan login terlebih dahulu");
                } else {
                    Patient.findPatientBy(arg1,arg2,(err,info)=>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            if(info == "id tidak ditemukan"||info == "name tidak ditemukan"){
                                HospitalView.ErrorView(info);
                            } else {
                                HospitalView.findPatientView(info);
                            }
                        }
                    })
                }
            }
        })
    }
    static logout (){
        Employee.isLogin((err,info) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                // console.log(info)
                if(info.login==false){
                    HospitalView.helpView(0);
                } else {
                    Employee.logout((err,data)=>{
                        if (err) {
                            HospitalView.ErrorView(err);
                        } else {
                            HospitalView.helpView(0);
                        }
                    })
                }
            }
        })
    }
    static show (code){
        Employee.isLogin((err,info) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                // console.log(info)
                let model = ''
                if(info.login==false){
                    HospitalView.helpView(0);
                } else {
                    // console.log(info.position)
                    if(code=="employee"){
                        if(info.position=="admin"){
                            Employee.findAll((err,data)=>{
                                if (err) {
                                    HospitalView.ErrorView(err);
                                } else {
                                    HospitalView.showEmployee(data);
                                }
                            })
                        } else {
                            HospitalView.ErrorView("Mohon maaf Anda tidak bisa mengakses command ini")
                        }
                    } else if(code=="patient"){
                        Patient.findAll((err,data)=>{
                            if (err) {
                                HospitalView.ErrorView(err);
                            } else {
                                HospitalView.showPatient(data);
                            }
                        })
                    } else {
                        HospitalView.ErrorView("Maaf command yang Anda masukan tidak sesuai");
                    }
                }
            }
        })
    }
    static help (){
        Employee.isLogin((err,info) => {
            if (err) {
                HospitalView.ErrorView(err);
            } else {
                console.log(info)
                if(info.login==false){
                    HospitalView.helpView(0);
                } else if(info.position == "dokter"){
                    HospitalView.helpView(1);
                } else if(info.position == "admin"){
                    HospitalView.helpView(2);
                }
            }
        })
    }
    // lanjutkan command yang lain
}


module.exports = HospitalController;