const chalk = require("chalk");

class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username": ${objArr[0].username},"password": ${objArr[0].password},"role": ${objArr[0].position}. Total employee : ${objArr[1]}}`)
    }
    
    static loginView(logInfo) {
        console.log(`Kamu berhasil login sebagai ${chalk.yellow(logInfo.position)}. Selamat datang ${chalk.yellow(logInfo.username)}!`)
    }

    static loginTrue(username) {
        console.log(`
Kamu sudah login dengan username: ${chalk.yellow(username)}
Lakukan perintah logout jika ingin login kembali!
`)
    }

    static logoutView(objUser) {
        console.log(`
logout berhasil! => username: ${chalk.yellow(objUser.username)}, role: ${chalk.yellow(objUser.position)}
`)
    }

    static addPatientView(objArr) {
        console.log(`save data success {"id": ${objArr[0].id},"patient name": ${objArr[0].name}, "disease": ${objArr[0].disease}. Total patient: ${objArr[1]}}`)
    }

    
    static updatePatientView(obj) {
        console.log(`save data success ${JSON.stringify(obj)}`);
    }
    
    static deletePatientView(obj) {
        console.log(`delete succes > ${JSON.stringify(obj)}`)
    }
    
    static showPatientView(objArr) {
        // console.log(JSON.stringify(objArr, null, 2))
        // console.dir(objArr, {depth: null} )
        console.table(objArr)
    }

    static showEmployeeView(objArr) {
        console.table(objArr)
    }
    
    static findPatientView(objArr) {
        console.log(objArr)
    }

    // lanjutkan method lain
    static wrongCommand() {
        console.log(`${chalk.red(`
Lakukan perintah dengan benar!!
Jika butuh bantuan, lakukan:`)}
> ${chalk.white.bold("node index.js help")}            
`);
    };

    static helpView() {
        console.log(
            `
==========================
${chalk.yellow("HOSPITAL INTERFACE COMMAND")}
==========================
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <namePatient/idPatient>
            `
        );
    };
}


module.exports = HospitalView;