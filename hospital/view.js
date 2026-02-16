class HospitalView {
  static registerView(objArr) {
      console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
  }

  static sameRegisterView() {
    console.log('username sudah dipakai')
  }

  static addPatientView(data) {
    console.log(`save data success {"id":${data[0].id}, "name": ${data[0].name}, diseases: ${data[0].diseases}} Total patient : ${data[1]}`)
  }

  static updatePatientView(data) {
    console.log(`save data success {"id":${data.id}, "name": ${data.name}, diseases: ${data.diseases}}`)
  }

  static forbiddenView(command) {
    console.log(command + ' tidak bisa diakses karena role kamu tidak memiliki privillege')
  }

  static notLoginView() {
    console.log('kamu harus login terlebih dahulu')
  }
  
  static ErrorView(message) {
    console.log(`terjadi kesalahan ${message}`)
  }
  // lanjutkan method lain

  static loginView(username) {
    console.log(`Selamat datang ${username}`)
  }

  static loginFailedView() {
    console.log('username atau password salah');
  }

  static someoneHasLoginView() {
    console.log('kamu sudah login')
  }

  static deletePatientView(id) {
    console.log(`data patien dengan id = ${id} berhasil dihapus`)
  }

  static patientNotFoundView() {
    console.log('data patient tidak ditemukan')
  }

  static logoutView(data) {
    console.log(`${data.username} berhasil logout`)
  }

  static logoutNotFound() {
    console.log('tidak ada yang login')
  }

  static showView(data) {
    console.log(data)
  }

  static notFound() {
    console.log('data tidak ditemukan')
  }

  static helpView() {
    console.log(`// HOSPITAL INTERFACE COMMAND
    /*
    > node index.js register <username> <password> <jabatan> 
    > node index.js login <username> <password>
    > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
    > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
    > node index.js deletePatient <id>
    > node index.js logout
    > node index.js show <employee/patient> 
    > node index.js findPatientBy: <name/id> <namePatient/idPatient>`)
  }
}


module.exports = HospitalView;