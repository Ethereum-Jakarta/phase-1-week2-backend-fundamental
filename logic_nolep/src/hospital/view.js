export default class HospitalView {
  // VIEW REGISTER
  static registerView(objArr) {
    const { username, password, position, total_employee } = objArr;

    console.log("SAVE DATA SUCESS:");
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.log(`role: ${position}`);
    console.log(`Total employee: ${total_employee} `);
  }

  // VIEW LOGIN
  static loginView(username) {
    console.log(`LOGIN USER ${username} SUCCESS`);
  }

  // VIEW LOGOUT
  static logoutView(employee) {
    console.log(`USERNAME: '${employee}' BERHASIL LOGOUT, TERIMAKASIH!`);
  }

  // VIEW NEW PATIENT
  static newPatientView(objArr) {
    const { nama, penyakit, total_patient } = objArr;
    const listPenyakit = penyakit.join();

    console.log("SAVE DATA SUCCES!");
    console.log(`Nama Pasien: ${nama}`);
    console.log(`Penyakit: ${listPenyakit}`);
    console.log(`Total pasien: ${total_patient}`);
  }

  // VIEW UPDATED PATIENT
  static updatedPatientView(patient) {
    const { nama, data_lama, data_baru } = patient;
    const dataPenyakitBaru = data_baru.join();
    const dataPenyakitLama = data_lama.join();

    console.log("UPDATE DATA SUCCES!");
    console.log(`Nama Pasien: ${nama}`);
    console.log(`Penyakit: ${dataPenyakitBaru}`);
    console.log(
      `PERUBAHAN DATA DARI: ${dataPenyakitLama} => ${dataPenyakitBaru}, BERHASIL`
    );
  }

  // VIEW DELETED PATIENT
  static deletedPatientView(patient) {
    if (typeof patient === "string") {
      console.log(`DATA PASIEN ATAS NAMA: ${patient} BERHASIL DIHAPUS`);
    }
    const { nama, penyakit } = patient;
    const listPenyakit = penyakit.join();

    console.log("DELETE DATA SUCCES!");
    console.log(`Nama Pasien: ${nama}`);
    console.log(`Penyakit: ${listPenyakit}`);
  }

  // VIEW FOUNDED PATIENT
  static foundPatientView(dataPasien) {
    const { id, nama } = dataPasien;
    console.log(
      `DATA PASIEN ATAS NAMA: ${nama} DAN ID: ${id} BERHASIL DITEMUKAN!`
    );
    console.log(dataPasien);
  }

  // VIEW SHOW PATIENT & EMPLOYEE
  static show(objArr) {
    console.log(objArr);
  }

  // VIEW HELP AKA DEFAULT
  static helpMessageView() {
    console.log("==========================");
    console.log("HOSPITAL INTERFACE COMMAND");
    console.log("==========================");
    console.log("node index.js register <username> <password> <jabatan>");
    console.log("node index.js login <username> <password>");
    console.log(
      "node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ...."
    );
    console.log(
      "node index.js updatePatient <namaPasien> <penyakitLama> <penyakitBaru> ...."
    );
    console.log("node index.js deletePatient <namaPasien> <penyakit>");
    console.log("node index.js logout");
    console.log("node index.js show <employee/patient>");
    console.log(
      "node index.js findPatientBy: <name/id> <namePatient/idPatient>"
    );
  }

  // VIEW KHUSUS ERROR
  static errorMessageView(errorMessage) {
    console.log(errorMessage);
  }
}

/*
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js findPatientBy: <name/id> <namePatient/idPatient>
node index.js logout
node index.js show <employee/patient>
*/
