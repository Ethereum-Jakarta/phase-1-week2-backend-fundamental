class HospitalView {
  static registerView(objArr) {
    const message = `save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`;
    console.log(message);
  }

  static loginView(user) {
    const message = `Login successful. Welcome, ${user.username}`;
    console.log(message);
  }

  static ErrorView(message) {
    console.error(message);
  }

  static addPatientView(patient) {
    const message = `Patient added: ${patient.name}`;
    console.log(message);
  }

  static updatePatientView(patient) {
    const message = `Patient updated: ${patient.name}`;
    console.log(message);
  }

  static deletePatientView(message) {
    console.log(message);
  }

  static logoutView() {
    console.log("Logged out.");
  }

  static showPatients(patients) {
    console.log("List of patients:");
    for (let i = 0; i < patients.length; i++) {
      let message = `ID: ${patients[i].id}, Name: ${
        patients[i].name
      }, Diseases: ${patients[i].diseases.join(", ")}`;
      console.log(message);
    }
  }

  static showEmployees(employees) {
    console.log("List of employees:");
    for (let i = 0; i < employees.length; i++) {
      let message = `Username: ${employees[i].username}, Role: ${employees[i].position}`;
      console.log(message);
    }
  }

  static help() {
    console.log("Usage:");
    console.log("  node index.js register <username> <password> <jabatan>");
    console.log("  node index.js login <username> <password>");
    console.log(
      "  node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ...."
    );
    console.log(
      "  node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ...."
    );
    console.log("  node index.js deletePatient <id>");
    console.log("  node index.js logout");
    console.log("  node index.js show <employee/patient>");
    console.log(
      "  node index.js findPatientBy: <name/id> <namePatient/idPatient>"
    );
  }
}


module.exports = HospitalView;