class HospitalView {
    static registerView(objArr) {
        console.log(`save data success:\n{\n  "username": "${objArr[0].username}",\n  "password": "${objArr[0].password}",\n  "role": "${objArr[0].role}"\n}\nTotal employee: ${objArr[1]}`);
    }
    static ErrorView(err) {
        console.log(`Error: ${err}`);
    }
    static helpView() {
        console.log(`==========================\nHOSPITAL INTERFACE COMMAND\n==========================\n\n> node index.js register <username> <password> <jabatan>\n> node index.js login <username> <password>\n> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....\n> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....\n> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....\n> node index.js logout\n> node index.js show <employee/patient>\n> node index.js findPatientBy: <name/id> <namePatient/idPatient>\n        `);
    }
    static showListView(role, data) {
        if (data.length === 0) {
            console.log(`Tidak ada data ${role}.`);
            return;
        }
        if (role === 'employee') {
            console.log(`Daftar employee:`);
            data.forEach((item, idx) => {
                console.log(`${idx + 1}. Username: ${item.username}, Password: ${item.password}, Role: ${item.role}`);
            });
        } else if (role === 'patient') {
            console.log(`Daftar patient:`);
            data.forEach((item, idx) => {
                console.log(`${idx + 1}. ID: ${item.id}, Name: ${item.name}, Diseases: ${item.diseases.join(', ')}`);
            });
        }
    }
    static showPatientSearchResult(data) {
        if (!data || data.length === 0) {
            console.log('Pasien tidak ditemukan.');
            return;
        }
        console.log('Hasil pencarian pasien:');
        data.forEach((item, idx) => {
            console.log(`${idx + 1}. ID: ${item.id}, Name: ${item.name}, Diseases: ${item.diseases.join(', ')}`);
        });
    }
    static loginView(user) {
        console.log(`Login berhasil sebagai ${user.role} (${user.username})`);
    }
    static logoutView() {
        console.log('Logout berhasil.');
    }
    static registerPatientView(objArr) {
        console.log(`Pasien berhasil ditambahkan:\n{\n  "id": "${objArr[0].id}",\n  "name": "${objArr[0].name}",\n  "diseases": [${objArr[0].diseases.map(d => '"' + d + '"').join(', ')}]\n}\nTotal patient: ${objArr[1]}`);
    }
    static updatePatientView(objArr) {
        console.log(`Data pasien berhasil diupdate:\n{\n  "id": "${objArr[0].id}",\n  "name": "${objArr[0].name}",\n  "diseases": [${objArr[0].diseases.map(d => '"' + d + '"').join(', ')}]\n}`);
    }
    static deletePatientView(objArr) {
        console.log(`Data pasien berhasil dihapus. Sisa pasien: ${objArr[1]}`);
    }
}

module.exports = HospitalView;
