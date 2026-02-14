class HospitalView {
    static registerView(objArr) {
        console.log(`SUCCESS: User "${objArr[0].username}" with role "${objArr[0].position}" has been registered. Total employees: ${objArr[1]}.`)
    }

    static loginView(user) {
        console.log(`Welcome, ${user.position} ${user.username}!. You are now logged in.`);
    }

    static logoutView(user) {
        console.log(`User ${user.username} has been logged out.`);
    }

    static showEmployees(employees) {
        console.log('========= Employee List ==========');
        employees.forEach(e => {
            console.log(`${e.id}. ${e.username} - ${e.position} (Logged in: ${e.login})`);
        })
        console.log('==================================');
    }

    static showPatients(patients) {
        console.log('========= Patient List ==========');
        if (patients.length === 0) {
            console.log('No patients data found.');
        } else {
            patients.forEach(p => {
                console.log(`${p.id}. ${p.name} - Diagnosis ${p.diagnosis.join(', ')}`);
            });
        }
        console.log('==================================');
    }

    static addPatientView(patient) {
        console.log(`SUCCESS: New patient "${patient.name}" with ID ${patient.id} has been added.`);
    }

    static updatePatientView(patient) {
        console.log(`SUCCESS: Patient data with ID ${patient.id} has been updated.`);
    }

    static deletePatientView(patient) {
        console.log(`SUCCESS: Patient "${patient.name}" with ID ${patient.id} has been removed.`);
    }

    static ErrorView(err) {
        console.error(`Error: ${err}`)
    }

    static showHelp() {
        console.log(`
==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
    -> Jabatan yang tersedia: 'dokter', 'admin'

node index.js login <username> <password>
    -> Login untuk mengakses fitur lain.

node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ...
    -> Menambah data pasien baru (hanya dokter).

node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ...
    -> Memperbarui data pasien berdasarkan ID (hanya dokter).

node index.js deletePatient <id>
    -> Menghapus data pasien berdasarkan ID (hanya dokter).

node index.js logout
    -> Keluar dari sesi login.

node index.js show <employee/patient>
    -> Menampilkan data (employee hanya untuk admin, patient hanya untuk dokter).

node index.js findPatientBy: <name/id> <namePatient/idPatient>
    -> Mencari pasien berdasarkan nama atau ID (hanya dokter).
        `);
    }
}


module.exports = HospitalView;