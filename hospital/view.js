class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {
            "username": ${objArr[0].username},
            "password": ${objArr[0].password},
            "role": ${objArr[0].position}
             Total employee : ${objArr[1]}
        }`)
    }
    
    // lanjutkan method lain
    static loginView(data) {
        console.log(`login success ${data.username} as ${data.position}`)
    }

    static ErrorView(errMessage) {
        console.log(`Error occured ( ${errMessage} )`)
    }

    static LogoutView(data) {
        console.log(`${data.username} has been logged out`)
    }

    static addPatientView(objArr) {
        console.log(`save data success {
            "id":${objArr[0].id},
            "name":${objArr[0].name},
            "diseases":${objArr[0].diseases} 
             Total patient : ${objArr[1]}
        }`)
    }

    static updatePatientView(patient) {
        console.log(` Patient has been updated with the following info {
            name : ${patient.name},
            diseases : ${patient.diseases}
        }`)
    }

    static deletePatientView(patient){
        console.log(`Patient with id : ${patient.id} has been deleted.`)
    }

    static showPatientView(data) {
        connsole.log("Patient List :")
        console.log(data)
    }

    static showEmployeeView(data) {
        connsole.log("Employee List :")
        console.log(data)
    }

    static findPatientView(data, option) {
        console.log(`Found Patient By ${option} : `)
        console.log(data)
    }
    

    static CommandListView(){
        console.log(`
==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>
            `)
    }
}


module.exports = HospitalView;