class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    
    static loginView(user) {
        console.log(`user ${user[0].username} berhasil login`)
    }
    // lanjutkan method lain
    static helpView(){
        console.log(`
        ==========================
        HOSPITAL INTERFACE COMMAND
        ==========================
        node index.js register <username> <password> <jabatan> 
        node index.js login <username> <password>
        node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
        node index.js logout
        node index.js show <employee/patient> 
        node index.js findPatientBy: <name/id> <namePatient/idPatient>
        `);
    }


    static addPatientView(value){
        console.log(`pasien dengan nama ${value[0].nama} telah ditambahkan, jumlah pasien saat ini : ${value[1]}`)
    }


    static logOutView(user){
        console.log(`user ${user[0].username} berhasil logout`)
    }

    static errView(err){
        console.log(err)
    }

    static updatePatientView(value){
        console.log(`data pasien dengan nama ${value[0].nama} berhasil diupdate`)
    }

    static showView(value){
        value.forEach(data => console.log(data))
    }

    static findPatient(value){
        console.log(value)
    }

    static deletePatientView(value){
        console.log(`pasien dengan nama ${value[0].nama} berhasil dihapus, jumlah pasien saat ini : ${value[1]}`)
    }
}


module.exports = HospitalView;