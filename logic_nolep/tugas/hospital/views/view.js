class HospitalView {
  static registerView(objArr) {
    console.log(
      `save data success {"Username":${objArr[0].username}, "Position":${objArr[0].position}. Total employee : ${objArr[1]}`,
    );
  }

  static loginView(employee) {
    console.log(`Welcome, ${employee.position} ${employee.username}`);
  }

  static logoutView(message) {
    console.log(message);
  }

  static patientView(message) {
    console.log(message);
  }

  static ErrorView(err) {
    console.log(`Error!: ${err}`);
  }

  static employeeView(message) {
    console.log(message);
  }

  static helpView() {
    const commands = [
      "node index.js register <username> <password> <jabatan>",
      "node index.js login <username> <password>",
      "node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....",
      "node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....",
      "node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....",
      "node index.js logout",
      "node index.js show <employee/patient>",
      "node index.js findPatientBy: <name/id> <namePatient/idPatient>",
    ];

    console.log("==========================");
    console.log("HOSPITAL INTERFACE COMMAND");
    console.log("==========================");

    // console.table(commands);
    commands.forEach((command) => {
      console.log(`> ${command}`);
    });
  }
}

export default HospitalView;
