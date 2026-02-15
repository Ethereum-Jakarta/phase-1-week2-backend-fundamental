import AuthController from "./controllers/AuthController.js";
import HospitalController from "./controllers/HospitalController.js";

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
const [command, ...argument] = process.argv.slice(2);
const validateArg = (argument, minArgs, egMessage) => {
  if (argument.length < minArgs) {
    console.log("Error: Missing arguments!");
    console.log("Example: ", egMessage);
    return false;
  }
  return true;
};

switch (command) {
  case "register":
    if (
      validateArg(
        argument,
        3,
        "node index.js register <username> <password> <jabatan>",
      )
    ) {
      AuthController.register(argument[0], argument[1], argument[2]);
    }
    break;
  case "login":
    if (validateArg(argument, 2, "node index.js login <username> <password>")) {
      AuthController.login(argument[0], argument[1]);
    }
    break;
  case "logout":
    AuthController.logout();
    break;
  case "addPatient":
    if (
      validateArg(
        argument,
        3,
        "node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....",
      )
    ) {
      HospitalController.addPatient(
        argument[0],
        argument[1],
        ...argument.slice(2),
      );
    }
    break;
  case "updatePatient":
    if (
      validateArg(
        argument,
        2,
        "node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....",
      )
    ) {
      HospitalController.updatePatient(
        argument[0],
        argument[1],
        ...argument.slice(2),
      );
    }
    break;
  case "deletePatient":
    if (validateArg(argument, 1, "node index.js deletePatient <id/name>")) {
      HospitalController.deletePatient(argument[0]);
    }
    break;
  case "show":
    if (validateArg(argument, 1, "node index.js show <employee/patient>")) {
      HospitalController.show(argument[0]);
    }
    break;
  case "findPatientBy":
    if (
      validateArg(
        argument,
        1,
        "node index.js findPatientBy: <name/id> <namePatient/idPatient>",
      )
    ) {
      HospitalController.findPatientBy(argument[0], argument[1]);
    }
    break;
  default:
    HospitalController.help();
    break;
}
