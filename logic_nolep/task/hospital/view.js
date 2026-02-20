class HospitalView {
    static helpView() {
        console.log(
            `
            --- HOSPITAL INTERFACE COMMAND ---
            
            > node index.js register <username> <password> <jabatan> 
            > node index.js login <username> <password>
            > node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
            > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            > node index.js deletePatient <id> 
            > node index.js logout
            > node index.js show <employee/patient> 
            > node index.js findPatientBy <namaPasien/id>
            `
        )
    }

    static registerView(user) {
        console.log(`save data success {"username": ${user.username}, "password": ${user.password}, "role": ${user.role}. Total employee : ${user.total}}`)
    }
    
    // lanjutkan method lain

    static loginView(user) {
        console.log(`Login berhasil, selamat datang ${user.username}`)
    }

    static logoutView() {
        console.log(`Logout berhasil!`)
    }

    static addPatientView(patient) {
        console.log(`Pasien berhasil ditambah! \n{\nPatient ID: ${patient.id}, \nPatient Name: ${patient.name} \nDisease: ${patient.disease}\n}`)
    }

    static updatePatientView(patient) {
        console.log(`Pasien dengan ID: ${patient.id} berhasil diperbarui!`)
    }

    static deletePatientView(patient) {
        console.log(`Pasien dengan ID: ${patient.id} berhasil dihapus!`)
    }

    static showView(data) {
        console.log(`Berikut data yang diminta: \n`, data)
    }

    static findPatientByView(patient) {
        console.log(`Berikut data pasien yang diminta: \n`, patient)
    }

    static ErrorView(err) {
        console.log(err)
    } 
}


export default HospitalView