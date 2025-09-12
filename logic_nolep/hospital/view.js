class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    
    static loginView(user) {
        console.log(`Login success: ${user.username} as ${user.position}`);
    }

    static logoutView(user) {
        console.log(`Logout success: ${user.username}`);
    }

    static addPatientView(patient) {
        console.log(`Patient added: ${patient.name} (${patient.id})`);
    }

    static updatePatientView(patient) {
        console.log(`Updated patient: ${patient.id} - ${patient.name}`);
    }

    static deletePatientView(patient) {
        console.log(`Deleted patient: ${patient.id} - ${patient.name}`);
    }

    static showEmployee(data) {
        console.log('Employee List:');
        data.forEach(e => console.log(`${e.username} (${e.position}) [login: ${e.login}]`));
    }

    static showPatient(data) {
        console.log('Patient List:');
        data.forEach(p => console.log(`${p.id}. ${p.name} - ${p.diseases.join(", ")}`));
    }

    static findPatientView(patient) {
        console.log(`Found Patient: ${patient.id}. ${patient.name} - ${patient.diseases.join(", ")}`);
    }

    static helpView() {
        console.log(`
            ==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>
        `);
    }

    static ErrorView(err) {
        console.log(`Error: ${err}`);
    }
}


module.exports = HospitalView;