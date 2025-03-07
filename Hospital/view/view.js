class HospitalView {
  static registerView(employee) {
    console.log(
      `save data success {"username": ${employee[0].username}, "password": ${employee[0].password}, "role": ${employee[0].role}. Total employee : belum ada`
    );
  }

  static loginView(objArr) {
    console.log(
      `login success {"username": ${objArr.username}, "role": ${objArr.role}.}`
    );
  }

  static addPatientView(patient) {
    console.log(
      `add data success {"username": ${patient.id}, "password": ${patient.namaPasien}, "role": ${patient.penyakit}. `
    );
  }

  static updatePatientView(patient) {
    console.log(
      `update data success {"username": ${patient.id}, "password": ${patient.namaPasien}, "role": ${patient.penyakit}. `
    );
  }

  static deletePatientView() {
    console.log(`delete data succes`);
  }

  static logoutView(employee) {
    console.log(
      `logout succes {"username": "${employee.username}", "role": "${employee.role}"}`
    );
  }

  static showEmployeeView(dataEmploye) {
    console.log("Nama\t\t|\tRole");
    dataEmploye.forEach((employee) => {
      console.log(
        `${employee.username}\t\t\t${employee.role}`
      );
    });
  }

  static showPatientView(dataPatient) {
    console.log("Id\t|\tNama\t|\tPenyakit");
    dataPatient.forEach((patient) => {
      console.log(
        `${patient.id}\t\t${patient.namaPasien}\t\t${patient.penyakit}`
      );
    });
  }

  static findPatientView(patient) {
    console.log("Id\t|\tNama\t|\tPenyakit");
    console.log(
      `${patient.id}\t\t${patient.namaPasien}\t\t${patient.penyakit}`
    );
  }

  static ErrorView(err) {
    console.log(`Error : ${err}`);
  }

  static HelpView() {
    console.log(`HOSPITAL INTERFACE COMMAND
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
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.`);
  }
}

module.exports = HospitalView;
