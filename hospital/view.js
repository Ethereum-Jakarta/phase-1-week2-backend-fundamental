class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }

    static ErrorView(err){
        console.log(`failed save data, data is not valid`)
    }

    static loginSuccess(status){
        console.log(`Login success, Welcome ${status.username}(role : ${status.position})`)
    }

    static loginFailed(status){
        console.log(`LOGIN FAILED, username or password incorrect`)
    }

    static doubleLoginView(){
        console.log("You're already login, please logout first")
    }

    static logoutSuccess(status){
        console.log(`Logout success`)
    }

    static addPatientView(objArr){
        console.log(`add Patient success {"id":${objArr[0].id}, "nama":${objArr[0].nama}}. Total Patient: ${objArr[1]}`)
    }

    static updateSuccessView(update){
        console.log(`Update Patient Success {"id":${update[0].id}, "nama":${update[0].nama}, "penyakit": ${update[0].penyakit}}`)
    }

    static deletePatientView(hapus){
        console.log(`Delete patient success. Total patient: ${hapus[1]}`)
    }

    static showEmployeeView(show){
        console.log(show)
    }

    static showPatientView(show){
        console.log(show)
    }

    static errorPatientView(){
        console.log('Patient not found')
    }

    static findPatientView(show){
        console.log(show)
    }

    static roleNotValid(){
        console.log("You're not logged in / Your role doesn't has role to access this command")
    }


    static helpView(){
        console.log(`// HOSPITAL INTERFACE COMMAND
        /*
        > node index.js register <username> <password> <jabatan> 
        > node index.js login <username> <password>
        > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        > node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        > node index.js logout
        > node index.js show <employee/patient> 
        > node index.js findPatientBy: <name/id> <namePatient/idPatient>
        */`)
    }
    
    // lanjutkan method lain
}


module.exports = HospitalView;