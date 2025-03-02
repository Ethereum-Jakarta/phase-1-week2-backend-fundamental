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
let command = process.argv[2];
let arguments = process.argv.slice(3);
let HospitalController = require("./controller");

// switch case dimulai dari sini

switch (command) {
  case "register":
    HospitalController.register(arguments[0], arguments[1], arguments[2]);
    break;
  case "login":
    HospitalController.login(arguments[0], arguments[1]);
    break;
  case "addPatient":
    HospitalController.addPatient(arguments[0], arguments[1], arguments.slice(2));
    break;
  case "updatePatient":
    HospitalController.updatePatient(arguments[0], arguments[1], arguments.slice(2));
    break;
  case "deletePatient":
    HospitalController.deletePatient(arguments[0]);
    break;
  case "logout":
    HospitalController.logout();
    break;
  case "show":
    HospitalController.show(arguments[0]);
    break;
  case "findPatientBy":
    console.log("fitur belum terbuka, silakan tunggu :)");
  // HospitalController.findPatientBy(arguments[0], arguments[1]);

  // buatlah semua command
  default:
    HospitalController.help();
    break;
}
