class HospitalView {
  static registerView(objArr) {
    console.log(
      `save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}}. Total employee : ${objArr[1]}`
    );
  }

  // lanjutkan method lain

  static loginView(user) {
    console.log(`welcome ${user.username}, you have successfully logged in`);
  }

  static addPatientView(patient) {
    console.log(
      `save data patient success {"id": ${patient[0].id}, "name": ${patient[0].name}, "diseases": ${patient[0].diseases}}. Total patient: ${patient[1]}`
    );
  }

  static updatePatientView(patient) {
    console.log(
      `update data patient success {"id": ${patient.id}, "name": ${patient.name}, "diseases": ${patient.diseases}}`
    );
  }

  static deletePatientView(patient) {
    console.log(
      `delete data patient success {"id": ${patient.id}, "name": ${patient.name}, "diseases": ${patient.diseases}}`
    );
  }

  static logout() {
    console.log("successfully logged out");
  }

  static showEmployeesView(data) {
    let n = 1;
    let result = `list of employees:\n`;
    for (const person of data) {
      result += `${n}. username: ${person.username} | password: ${person.password} | position: ${person.position} \n`;
      n++;
    }
    console.log(result);
  }

  static showPatientsView(data) {
    let n = 1;
    let result = `list of patients:\n`;
    for (const person of data) {
      result += `${n}. id: ${person.id} | name: ${
        person.name
      } | diseases: ${person.diseases.join(", ")} \n`;
      n++;
    }
    console.log(result);
  }

  static findPatientByView(patient) {
    console.log(
      `id: ${patient.id} | name: ${
        patient.name
      } | diseases: ${patient.diseases.join(", ")}`
    );
  }

  static ErrorView(err) {
    console.log(`Error: ${err}`);
  }

  static helpView() {
    console.log(`please choose one of these commands:
      > node index.js register <username> <password> <jabatan> 
      > node index.js login <username> <password>
      > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
      > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
      > node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
      > node index.js logout
      > node index.js show <employee/patient> 
      > node index.js findPatientBy: <name/id> <namePatient/idPatient>`);
  }
}

module.exports = HospitalView;
