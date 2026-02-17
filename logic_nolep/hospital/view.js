class HospitalView {
    static registerView(objArr) {
        console.log(`save data success:
{
  "username": "${objArr[0].username}",
  "password": "${objArr[0].password}",
  "role": "${objArr[0].role}"
}
Total employee: ${objArr[1]}`)
    }
    
    // lanjutkan method lain
    static ErrorView(err) {
        console.log(`Error: ${err}`);
    }

    static helpView() {
        console.log(`==========================
HOSPITAL INTERFACE COMMAND
==========================

> node index.js register <username> <password> <jabatan>
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient>
> node index.js findPatientBy: <name/id> <namePatient/idPatient>
        `);
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
        console.log(`Pasien berhasil ditambahkan:
{
  "id": "${objArr[0].id}",
  "name": "${objArr[0].name}",
  "diseases": [${objArr[0].diseases.map(d => '"' + d + '"').join(', ')}]
}
Total patient: ${objArr[1]}`);
    }
    static updatePatientView(objArr) {
        console.log(`Data pasien berhasil diupdate:
{
  "id": "${objArr[0].id}",
  "name": "${objArr[0].name}",
  "diseases": [${objArr[0].diseases.map(d => '"' + d + '"').join(', ')}]
}`);
    }
    static deletePatientView(objArr) {
        console.log(`Data pasien berhasil dihapus. Sisa pasien: ${objArr[1]}`);
    }
}


module.exports = HospitalView;