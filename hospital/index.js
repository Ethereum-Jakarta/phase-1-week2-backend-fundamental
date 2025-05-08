let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

switch (command) {
  case "register":
    HospitalController.register(argument[0], argument[1], argument[2]);
    break;

  case "login":
    HospitalController.Login(argument[0], argument[1]);
    break;
  // buatlah semua command
  case "logout":
    HospitalController.Logout();
    break;

  case "addPatient":
    HospitalController.addPatient(argument[0], argument[1], argument.slice(2));
    break;

  case "updatePatient":
    HospitalController.updatePatient(
      argument[0],
      argument[1],
      argument.slice(2)
    );
    break;

  case "deletePatient":
    HospitalController.deletePatient(
      argument[0],
      argument[1],
      argument.slice(2)
    );
    break;

  case "show":
    HospitalController.show(argument[0]);
    break;

  case "findPatientBy":
    HospitalController.findPatient(argument[0], argument[1]);
    break;

  default:
    HospitalController.default();

    break;
}
