const { deletePatient } = require('./patient');

class HospitalView {
  // register
  static registerView(objArr) {
    console.log(
      `save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}}. Total employee : ${objArr[1]}`
    );
  }

  // login
  static loginView(objArr) {
    console.log(
      `Login success with username ${objArr[0][objArr[1]].username} and role ${
        objArr[0][objArr[1]].position
      }`
    );
  }

  // addPatient
  static addPatientView(objArr) {
    if (objArr !== undefined) {
      console.log(
        `patient has been add with id: ${objArr[0].id} and name: ${objArr[0].name}`
      );
    } else {
      console.log('Patient with that ID has been added before');
    }
  }

  // updatePatient
  static updatePatientView(objArr) {
    if (objArr !== undefined) {
      console.log(
        `Patient with id ${objArr[0][objArr[1]].id} and name ${
          objArr[0][objArr[1]].name
        } has been updated.`
      );
    } else {
      console.log('Patient with that ID and name is not found');
    }
  }

  // deletePatient
  static deletePatientView(objArr) {
    if (objArr !== undefined) {
      console.log(`Patient has been deleted.`);
    } else {
      console.log('Patient with that ID and name is not found');
    }
  }

  // logout
  static logoutView(objArr) {
    if (objArr !== undefined) {
      console.log("You've successfully logout.");
    } else {
      console.log('There is no logged in account.');
    }
  }

  // show
  static showView(objArr) {
    console.log(objArr)
  }

  // findPatientBy
  static findPatientByView(objArr) {
    console.log(objArr);
  }

  // error
  static ErrorView(objArr) {
    console.log(`${objArr}`);
  }

  // help
  static helpView() {
    console.log('node index.js register <username> <password> <jabatan>');
    console.log('node index.js login <username> <password>');
    console.log(
      'node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....'
    );
    console.log(
      'node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....'
    );
    console.log(
      'node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....'
    );
    console.log('node index.js logout');
    console.log('node index.js show <employee/patient> ');
    console.log(
      'node index.js findPatientBy: <name/id> <namePatient/idPatient>'
    );
    console.log('');
    console.log('NOTE :');
    console.log('');
    console.log('1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.');
    console.log('2. TIDAK BISA LOGIN BERSAMAAN.');
    console.log('3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.');
  }
}

module.exports = HospitalView;
