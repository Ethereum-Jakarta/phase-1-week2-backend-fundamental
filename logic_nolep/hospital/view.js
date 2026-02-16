class HospitalView {
    static registerView(objArr) {
        console.log(`register success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }

    static loginView(objArr) {
        console.log(`login success!! welcome ${objArr.username} - ${objArr.position}`);
    }

    static logoutView(objArr) {
        console.log(`logout success!! byee ${objArr.username} - ${objArr.position}`);
    }

    static addPatient(objArr) {
        console.log(`patient success added {"id":${objArr[0].id}, "patientName":${objArr[0].namaPasien}, "disease1":${objArr[0].penyakit1}, "disease2":${objArr[0].penyakit2}}`);
    }

    static updatePatient(objArr) {
        console.log(`success update patient data {"id":${objArr.id}, "patientName":${objArr.namaPasien}, "disease1":${objArr.penyakit1}, "disease2":${objArr.penyakit2}}`);
    }

    static deletePatient(objArr) {
        console.log(`success deleted patient data: {"id":${objArr.id}, "patientName":${objArr.namaPasien}, "disease1":${objArr.penyakit1}, "disease2":${objArr.penyakit2}}`);
    }

    static showPatient(objArr) {
        console.log("Here's the data:")
        for (let i = 0; i < objArr.length; i++) {
            let data = {};
            data["id"] = objArr[i].id;
            data["patientName"] = objArr[i].namaPasien;
            data["disease1"] = objArr[i].penyakit1;
            data["disease2"] = objArr[i].penyakit2;
            console.log(data);
        }
    }

    static showEmployee(objArr) {
        console.log("Here's the data:")
        for (let i = 0; i < objArr.length; i++) {
            let data = {};
            data["username"] = objArr[i].username;
            data["position"] = objArr[i].position;
            console.log(data);
        }
    }

    static findPatientBy(objArr) {
        console.log(`Here's the patient data: {"id":${objArr.id}, "patientName":${objArr.namaPasien}, "disease1":${objArr.penyakit1}, "disease2":${objArr.penyakit2}}`);
    }

    static ErrorView(err) {
        console.log('Error here:', err);
    }

    static helpView() {
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
            `);
    }
}


module.exports = HospitalView;