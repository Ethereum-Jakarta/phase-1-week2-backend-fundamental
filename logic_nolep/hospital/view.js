class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},
            "password":${objArr[0].password},"role":${objArr[0].position}. 
            Total employee : ${objArr[1]}`)
    }
    
    // lanjutkan method lain

    static loginView(employee) {
        console.log(`Welcome ${employee.username}, you are logged in as ${employee.position}.`);
    }

    static ErrorView(message) {
        console.log(`Error: ${message}`);
    }

    static BerhasilTambahPasien(pasien){
        console.log(`Pasien berhasil ditambahkan: {"id": ${pasien.id}, 
            "nama": "${pasien.namaPasien}", "penyakit": "${pasien.penyakit}"}`);
    }
    
    static BerhasilUpdatePasien(pasien) {
        console.log(`Pasien berhasil diperbarui: ${JSON.stringify(pasien)}`);
    }

    static BerhasilHapusPasien(pasien) {
        console.log(`pasien dengan id:${pasien} berhasil di hapus`)
    }

    static showEmployees(employees) {
        console.log("Employee List:");
        employees.forEach(emp => console.log(`- ${emp.username}, Role: ${emp.position}`));
    }

    static showPatients(patients) {
        console.log("Patient List:");
        patients.forEach(patient => console.log(`- ${patient.namaPasien}, ID: ${patient.id}`));
    }

    static showPatient(patient) {
        console.log(`Found Patient: ID: ${patient.id}, Name: ${patient.nama}, Illness: ${patient.penyakit}`);
    }
}


module.exports = HospitalView;
