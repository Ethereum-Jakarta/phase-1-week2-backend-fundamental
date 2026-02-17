class HospitalView {
    static registerView(objArr) {
        console.log(`Save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }

    // lanjutkan method lain
    static loginView = (data) => {
        if (typeof data !== 'string') {
            console.log(`Login successful. Welcome, ${data.username}!`);
        } else {
            console.log(data);
        }
    }
    static logoutView = (data) => {
        if (typeof data !== 'string') {
            console.log(`Logout successful. Goodbye, ${data.username}!`);
        } else {
            console.log(data);
        }
    }
    static addPatientView = (data) => {
        if (typeof data !== 'string') {
            console.log(`Add patient success {"name":${data[0].name},"disease1":${data[0].disease1},"disease2":${data[0].disease2}}. Total patient : ${data[1]}`);
        } else {
            console.log(data);
        }
    }
    static updatePatientView = (data) => {
        if (typeof data !== 'string') {
            console.log(`Update patient success {"name":${data.name},"disease1":${data.disease1},"disease2":${data.disease2}}.`)
        } else {
            console.log(data);
        }
    }
    static deletePatientView = (data) => {
        if (typeof data !== 'string') {
            console.log(`Delete patient success. Total patient : ${data.length}`)
        } else {
            console.log(data);
        }
    }
    static findPatientByView = (data) => {
        if (typeof data !== 'string') {
            console.table(data)
        } else {
            console.log(data);
        }
    }
    static showView = (data) => {
        console.table(data);
    }

    static helpView = () => {
        console.log("==========================")
        console.log("HOSPITAL INTERFACE COMMAND")
        console.log("==========================")
        console.log("node index.js register <username> <password> <jabatan>")
        console.log("node index.js login <username> <password>")
        console.log("node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....")
        console.log("node index.js deletePatient <id>")
        console.log("node index.js logout")
        console.log("node index.js show <employee/patient>")
        console.log("node index.js findPatientBy: <name/id> <namePatient/idPatient>");
    }
}

export { HospitalView }