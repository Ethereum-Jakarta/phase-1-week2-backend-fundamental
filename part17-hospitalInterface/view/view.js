class HospitalView {
  static registerView(objArr) {
    console.log(
      `save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`
    );
  }
  static loginView(user) {
    if (user.position === 'doctor')
      console.log(`Okaeri Dokutah ${user.username}`);
    else console.log(`Welcome ${user.username}`);
  }
  static logoutView(user) {
    console.log(`Goodbye ${user.username}`);
  }
  static errorView(err) {
    console.log(err);
  }
  static addPatientView(msg) {
    console.log(
      `Patient Name: ${msg.name} with ID: ${msg.id} Disease: ${msg.disease} has been added.`
    );
  }
  static updatePatientView(msg) {
    console.log(
      `Patient Name: ${msg.name} with ID: ${msg.id} Disease: ${msg.disease} has been updated.`
    );
  }
  static deletePatientView(msg) {
    console.log(
      `Patient Name: ${msg.name} with ID: ${msg.id} Disease: ${msg.disease} has been deleted.`
    );
  }
  static showPatientView(data) {
    console.log(data);
  }
  static showEmployeeView(data) {
    console.log(data);
  }
  static findPatientView(data) {
    console.log(data);
  }
  static helpView() {
    console.log(`
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>
    `);
  }
}

module.exports = HospitalView;
