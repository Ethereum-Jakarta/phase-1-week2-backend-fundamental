let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

// HOSPITAL INTERFACE COMMAND
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>

NOTE :

1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
2. TIDAK BISA LOGIN BERSAMAAN.
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.

*/

switch (command) {
    case "register":
        console.log(argument[0], argument[1], argument[2])
        HospitalController.register(argument[0], argument[1], argument[2]);
        break;
    case "login":
        // console.log(argument[0], argument[1], argument[2])
        HospitalController.login(argument[0], argument[1]);
        break;
        
    case "logout":
        // console.log(argument[0], argument[1], argument[2])
        HospitalController.logout();
        break;
    case "findPatientBy":
        // console.log(argument[0], argument[1], argument[2])
        HospitalController.findPatientBy(argument[0],argument[1]);
        break;
    case "addPatient":
        let addPenyakit = []
        for(let a=2;a<argument.length;a++){
            addPenyakit.push(argument[a])
        }
        // console.log(addPenyakit)
        HospitalController.addPatient(argument[0],argument[1],addPenyakit);
        break;
    case "updatePatient":
        let updatePenyakit = []
        for(let a=2;a<argument.length;a++){
            updatePenyakit.push(argument[a])
        }
        // console.log(penyakit)
        HospitalController.updatePatient(argument[0],argument[1],updatePenyakit);
        break;
    case "deletePatient":
        // console.log(argument[0], argument[1], argument[2])
        HospitalController.deletePatient(argument[0], argument[1]);
        break;
    case "show":
        // console.log(argument[0], argument[1], argument[2])
        HospitalController.show(argument[0]);
        break;
    // buatlah semua command
    default:
        HospitalController.help();
        break;
}