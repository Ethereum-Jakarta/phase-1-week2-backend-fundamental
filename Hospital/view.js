class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }

    static loginView(ketemu) {
        console.log(`Login Berhasil!, Selamat Datang ${ketemu.username}`)
    }
    
    static help() {
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
    // Lanjutkan method lain

    static addPatientView(objArr) {
        console.log(`Pasien bernama ${objArr[0].username} memilki gejala ${objArr[0].penyakit}`)
    }

    static logoutView(logoutData) {
        console.log(`${logoutData.username}, Anda telah berhasil logout!`)
    }

    static updatePatient(update, username, penyakit) {
        if(update) {
            console.log(`Data Pasien bernama ${username} memilki gejala ${penyakit} Telah di update`)
        } else {
            console.log(`Data pasien tidak di temukan`)
        }
    }

    static deletePatient(deleted,id, username, penyakit) {
        if(deleted) {
            console.log(`Data Pasiend dengan id ${id}, bernama ${username}, memilki gejala ${penyakit} Telah di hapus`)
        } else {
            console.log(`Data pasien tidak di temukan`)
        }
    }

    static showView(data) {
        console.log(data)
    }

    static patientView(patient) {
        if(patient) {
            console.log(patient)
        } else {
            console.log(`Data tidak di temukan`)
        }
    }
}

module.exports = HospitalView;
