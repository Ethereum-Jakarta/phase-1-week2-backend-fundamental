const Patient = require("./patient");

class View {
  static showMenu() {
    console.log(`==========================
                 HOSPITAL INTERFACE COMMAND
                 ==========================
        node index.js register <username> <password> <jabatan>
        node index.js login <username> <password>
        node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
        node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
        node index.js deletePatient <id>
        node index.js logout
        node index.js show <employee/patient>
        node index.js findPatientBy: <name/id> <namePatient/idPatient>`);
  }

  static succeslogin(user) {
    console.info(`Welcome ${user.username}`);
  }

  static failedLogin(user) {
    console.info(user);
  }

  static succeslogout(user) {
    console.info(`${user.username} has logout `);
  }

  static error(message) {
    console.info(message);
  }
  static registerView(user) {
    console.log(
      `save data success {"username":${user[0].username},"password":${user[0].password},"role":${user[0].position}. Total employee : ${user[1]}`
    );
  }
  static succes(message) {
    console.info(message);
  }
  static show(data) {
    let title;
    if (data instanceof Patient) {
      title = "Patient";
    } else {
      title = "Employe";
    }
    console.info(`List Of ${title}`);
    console.info(data);
  }
}

module.exports = View;
