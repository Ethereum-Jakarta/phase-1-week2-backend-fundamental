class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    static addPatientView(objArr) {
        console.log(`save data success {"id":${objArr[0].id},"nama":${objArr[0].name}. Total patient : ${objArr[1]}`)
    }
    static updatePatientView(objArr) {
        console.log(`Update data success {"id":${objArr[0].id},"nama":${objArr[0].name},"penyakit":${objArr[0].penyakit}. }`)
    }
    static deletePatientView(objArr) {
        // console.log(objArr)
        console.log(`Delete data success {"id":${objArr[0].id},"nama":${objArr[0].name},"penyakit":${objArr[0].penyakit}. }`)
    }
    static findPatientView(objArr) {
        // console.log(objArr)
        console.log("Berikut adalah daftar pasien yang terdaftar")
        console.log("Id|Nama Pasien|Penyakit")
        console.log("-----------------------")
        console.log(`${objArr.id}|${objArr.name}|${objArr.penyakit}`)
        
        console.log("-----------------------")
    }
    static showPatient(objArr) {
        // console.log(objArr)
        console.log("Berikut adalah daftar pasien yang terdaftar")
        console.log("Id|Nama Pasien|Penyakit")
        console.log("-----------------------")
        for(let d=0;d<objArr.length;d++){
            console.log(`${objArr[d].id}|${objArr[d].name}|${objArr[d].penyakit}`)
        }
        console.log("-----------------------")
    }
    static showEmployee(objArr) {
        // console.log(objArr)
        console.log("Berikut adalah daftar employee yang terdaftar")
        console.log("Username|Position")
        console.log("-----------------")
        for(let d=0;d<objArr.length;d++){
            console.log(`${objArr[d].username}|${objArr[d].position}`)
        }
        console.log("------------------")
    }
    static ErrorView(err) {
        console.log(err)
    }
    static loginView(dataUser){
        console.log(`Selamat datang ${dataUser[0].username}, Berikut adalah command yang bisa digunakan`)
        console.log("----------------------------------")
        console.log("> node index.js logout")
        console.log("> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("> node index.js deletePatient <id> <namaPasien>")
        console.log("> node index.js show <patient> ")
        
        if(dataUser[0].position=="admin"){
            console.log("> node index.js show <employee> ")
        }
        console.log("----------------------------------")
    }
    static helpView(code){
        console.log("--- HOSPITAL INTERFACE COMMAND ---")
        console.log("----------------------------------")
        if(code ==0 ){
            console.log("> node index.js register <username> <password> <jabatan>")
            console.log("> node index.js login <username> <password>")
        } else if(code>0){
            console.log("> node index.js logout")
            console.log("> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
            console.log("> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....")
            console.log("> node index.js deletePatient <id> <namaPasien>")
            console.log("> node index.js show <patient> ")
            console.log("> node index.js findPatientBy: <name/id> <namePatient/idPatient></penyakit2>")
        }
        if(code>1){
            console.log("> node index.js show <employee> ")
        }
        console.log("----------------------------------")

    }
    // lanjutkan method lain
}


module.exports = HospitalView;