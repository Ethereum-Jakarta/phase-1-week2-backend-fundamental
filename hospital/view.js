class HospitalView {
  static registerView(objArr) {
    console.log(
      `save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`
    );
  }

  static ErrorView(message) {
    console.log(`terjadi kesalahan ${message}`);
  }

  static loginView(username) {
    console.log(`Selamat datang ${username}`);
  }

  static loginFailedView() {
    console.log("username atau password salah");
  }

  static notLoginView() {
    console.log("kamu harus login terlebih dahulu");
  }

  static alreadyLogin(name) {
    console.log(`Anda sudah login di akun ${name}`);
  }

  static notAdminView() {
    console.log("Hanya Admin yang dapat mengakses data ini");
  }

  static logout() {
    console.log("Anda behasil Logout");
  }

  static addPatientView(data) {
    console.log(
      `save data success {"id":${data[0].id}, "name": ${data[0].name}, diseases: [${data[0].diseases}]} Total patient : ${data[1]}`
    );
  }

  static updatePatientView(data) {
    console.log(
      `Data pasien berhasil di update {"id":${data.id}, "name": ${data.name}, diseases: [${data.disease}]}`
    );
  }

  static deletePatientView(data) {
    console.log(`Data berhasil dihapus, jumlah patient = ${data.length}`);
  }

  static showView(data) {
    console.log(data);
  }

  static errorDataView() {
    console.log("Data tidak ditemukan");
  }

  static findPatientByView(data) {
    console.log(data);
  }

  static help() {
    console.log(
      `==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy <name/id> <namePatient/idPatient>`
    );
  }
}

module.exports = HospitalView;
