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
    static login = (username, password) =>{
        Employee.roleLogin((login) => {
            if(login == null){
              Employee.login(username, password, (err, status) =>{
                if(err) {
                   HospitalView.ErrorView(err)
                }else{
                    HospitalView.loginSuccess(status)
                    }
                })   
            }else{
                HospitalView.doubleLoginView()
            }
        })
    }

    static logout = () => {
        Employee.logout((status) =>{
            HospitalView.logoutSuccess(status)
        })
    }

    static addPatient = (id, nama, penyakit) => {
        Employee.roleLogin((position) =>{
            if(position === 'admin' || position == 'dokter'){
                Patient.addPatient(id, nama, penyakit, (err, objArr) => {
                    if(err) {
                        HospitalView.ErrorView(err)
                    } else{
                        HospitalView.addPatientView(objArr)
                    }
                })
            }else{
                HospitalView.roleNotValid()
            }
        })
    }

    static updatePatient = (id, nama, penyakit) => {
        Employee.roleLogin((position) => {
            if(position == 'admin' || position == 'dokter'){
                Patient.updatePatient(id, nama, penyakit, (err, update) =>{
                    if(err) {
                        HospitalView.ErrorUpdateView(err)
                    }else{
                        HospitalView.updateSuccessView(update)
                    }
                })
            }else{
                HospitalView.roleNotValid()
            }
        })
    }

    static deletePatient = (id, nama) => {
        Employee.roleLogin((position) => {
            if(position == 'admin' || position == 'dokter'){
                Patient.deletePatient(id,nama, (err,hapus) =>{
                    if(err){
                        HospitalView.ErrorView(err)
                    }else{
                        HospitalView.deletePatientView(hapus)
                    }
                })          
            }else{
                HospitalView.roleNotValid()
            }
        })
    }

    static showEmployee = () =>{
        Employee.roleLogin((position) => {
            if(position === 'admin'){
                Employee.showEmployee((show) => {
                    HospitalView.showEmployeeView(show)
                })
            }else{
                HospitalView.roleNotValid()
            }
        })
    }

    static showPatient = () => {
        Employee.roleLogin((position) => {
            if(position == 'admin' || position == 'dokter'){
                Patient.showPatient((show) => {
                    HospitalView.showPatientView(show)
                })         
            }else{
                HospitalView.roleNotValid()
            }
        })
    }

    static findPatient =  (id,nama) => {
        Employee.roleLogin((position) => {
            if(position == 'dokter' || position == 'admin'){
                Patient.findPatient(id,nama,(err,show) =>{
                    if(err){
                        HospitalView.errorPatientView(err)
                    }else{
                        HospitalView.findPatientView(show)
                    }
                })
            } else{
                HospitalView.roleNotValid()
            }
        })
    }

    
    static help(){
        HospitalView.helpView()
    }
    
}


module.exports = HospitalController;