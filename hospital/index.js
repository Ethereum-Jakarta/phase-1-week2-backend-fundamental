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
    
    case "login":
        HospitalController.login(argument[0], argument[1]);
        break;

    case "addpatient":
        HospitalController.addPatient(argument[0], argument[1], argument[2]);
        break;

    case "updatepatient":
        HospitalController.updatePatient(argument[0], argument[1], argument[2]);
        break;

    case "deletepatient":
        HospitalController.deletePatient(argument[0]);
        break;

    case "showpatient":
        HospitalController.showPatient();
        break;
    
    case "showemployee":
        HospitalController.showEmployee();
        break;

    case "findpatient":
        HospitalController.findPatient(argument[0], argument[1]);
        break;
        
    case "logout":
        HospitalController.logout();
        break;
    // buatlah semua command
    default:
        HospitalController.help();
        break;
}