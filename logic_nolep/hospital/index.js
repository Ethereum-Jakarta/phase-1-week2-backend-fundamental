let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require("./controller");

switch (command) {
    case "register":
        HospitalController.register(argument[0], argument[1], argument[2]);
        break;
    case "login":
        HospitalController.login(argument[0], argument[1]);
        break;
    case "logout":
        HospitalController.logout();
        break;
    case "addPatient":
        HospitalController.addPatient(argument);
        break;
    case "updatePatient":
        HospitalController.updatePatient(argument);
        break;
    case "deletePatient":
        HospitalController.deletePatient(argument);
        break;
    case "show":
        HospitalController.show(argument[0]);
        break;
    case "findPatientBy:":
        HospitalController.findPatientBy(argument[0], argument[1]);
        break;
    default:
        HospitalController.help();
        break;
}