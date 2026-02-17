let command = process.argv[2];
let argument = process.argv.slice(3);
const HospitalController = require("./controller");

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
*/

(async () => {
  switch (command) {
    case "register":
      await HospitalController.register(argument[0], argument[1], argument[2]);
      break;
    case "login":
      await HospitalController.login(argument[0], argument[1]);
      break;
    case "logout":
      await HospitalController.logout();
      break;
    case "addPatient":
      await HospitalController.addPatient(argument[0], argument[1], ...argument.slice(2));
      break;
    case "updatePatient":
      await HospitalController.updatePatient(argument[0], argument[1], ...argument.slice(2));
      break;
    case "deletePatient":
      await HospitalController.deletePatient(argument[0]);
      break;
    case "show":
      await HospitalController.show(argument[0]);
      break;
    case "findPatientBy:":
      await HospitalController.findPatientBy(argument[0], argument[1]);
      break;
    default:
      HospitalController.help();
      break;
  }
})();
