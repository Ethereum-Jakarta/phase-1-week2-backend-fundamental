let HospitalController = require("./controller");
let command = process.argv[2];
let argument = process.argv.slice(3);

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
  case "register":
    HospitalController.register(argument[0], argument[1], argument[2]);
    break;
  case "login":
    HospitalController.login(argument[0], argument[1]);
    break;
  case "addPatient":
    const name = argument[0];
    const diseases = argument.slice(1);
    HospitalController.addPatient(name, diseases, (err, newPatient) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Patient added successfully:", newPatient);
      }
    });
    break;

  case "updatePatient":
    if (arguments.length < 3) {
      console.log(
        "Insufficient arguments for updatePatient. Usage: node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ..."
      );
      break;
    }
    const patientId = argument[0];
    const patientName = argument[1];
    const patientDiseases = argument.slice(2);
    HospitalController.updatePatient(
      patientId,
      patientName,
      patientDiseases,
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Patient updated successfully:", result);
        }
      }
    );
    break;
  case "deletePatient":
    const deletePatientId = argument[0]; // Directly use the argument without converting it
    HospitalController.deletePatient(deletePatientId, (err, patientId) => {
      if (err) {
        console.error(err.message);
      } else {
        HospitalView.showDeletePatientSuccess(patientId);
      }
    });
    break;

  case "logout":
    HospitalController.logout((err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result); // Assuming logout method returns a success message
      }
    });
    break;

  case "show":
    if (
      argument.length === 0 ||
      (argument[0] !== "employee" && argument[0] !== "patient")
    ) {
      console.log(
        "You should choose between 'employee' or 'patient'. Usage: node index.js show <employee/patient>"
      );
    } else {
      const showType = argument[0]; // 'employee' or 'patient'
      HospitalController.show(showType, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          // Assuming the 'show' method in HospitalController properly formats the result for display
          console.log(result);
        }
      });
    }
    break;
  case "findPatientBy":
    if (argument.length < 2) {
      console.log("Usage: node index.js findPatientBy <name/id> <value>");
    } else {
      const searchCriterion = argument[0]; // 'name' or 'id'
      const searchValue = argument[1];

      HospitalController.findPatientBy(
        searchCriterion,
        searchValue,
        (err, patient) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Patient found:", patient);
          }
        }
      );
    }
    break;

    const searchCriterion = argument[0]; // 'name' or 'id'
    const searchValue = argument[1];
    HospitalController.findPatientBy(
      searchCriterion,
      searchValue,
      (err, patient) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Patient found:", patient);
        }
      }
    );
    break;
  default:
    HospitalController.help();
    break;
}
