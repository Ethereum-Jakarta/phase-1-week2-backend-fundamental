const { deletePatient } = require("./patient")

class HospitalView {
    static registerView(objArr) {
            console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}}`)
    }

    static loginView(loginInformation){
        if (loginInformation !== null){
            console.log(`Login are succesfull.... Hello (${loginInformation.position}) - ${loginInformation.username}`)
        } else {
            console.log('login failed')
        }
    }

    static addPatientView(objPatient){
        console.log(`Add data Patient Succes {"id":${objPatient[0].id}, "Name Patient":${objPatient[0].name}, "disease":${objPatient[0].disease}}`)
    }

    static updatePatientView(countData){
        console.log(`your data is update now  ${countData.name}`)
    }

    static deletePatientView(newData){
        console.log(`Data ${newData.name} is delete `)
    }

    static logoutView(countData){
        console.log(`${countData.username} has Log-Out`)
    }

    static showView(countData){
        console.log(countData)
    }

    static findPatientByView(countData){
        console.log(countData)
    }

    static helpView(){
        console.log(`HOSPITAL INTERFACE COMMAND
        
        > node index.js register <username> <password> <jabatan> 
        > node index.js login <username> <password>
        > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        > node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        > node index.js logout
        > node index.js show <employee/patient> 
        > node index.js findPatientBy: <name/id> <namePatient/idPatient>`)
    }

    static errorView(err) {
        console.log(err.message)
    }
    
    // lanjutkan method lain
}


module.exports = HospitalView;