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
        HospitalController.register(argument[0], argument[1], argument[2]);
        break;
    
    // buatlah semua command
    case "login":{
        HospitalController.login(argument[0], argument[1]);
        break;
    }
    case "addPatient":{
        const [id, name, ...penyakit] = argument;
        HospitalController.addPatient(id, name, penyakit);
        break;
    }
    case "updatePatient":{
        const [id, name, ...penyakit] = argument;
        HospitalController.updatePatient(id, name, penyakit);
        break;
    }
    case "deletePatient":{
        const [id, name, ...penyakit] = argument;
        HospitalController.deletePatient(id, name, penyakit);
        break;
    }
    case "logout":{
        HospitalController.logout();
        break;
    }
    case "show":{
        if(argument[0] == "employee" || argument[0] == "Employee"){
            HospitalController.employeeShow();
            break;
        }
        else if(argument[0] == "patient" || argument[0] == "Patient"){
            HospitalController.patientShow();
            break;
        }
        else{
            HospitalController.employeeShow();
            HospitalController.patientShow();
            break;
        }
    }
    case "findPatientBy:":{
        HospitalController.findPatient(argument[0], argument[1])
        break;
    }
    default:
        HospitalController.help();
        break;
}