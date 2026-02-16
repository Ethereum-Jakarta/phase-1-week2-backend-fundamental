class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username}, "password":${objArr[0].password}, "role":${objArr[0].position}. Total Employee: ${objArr[1]}}`);
    }

    static loginSuccess(user) {
        console.log(`successfully logged in as ${user.username} a ${user.position}`)
    }

    static alreadyLogin(user) {
        console.log(`someone has logged in: ${user.username}`)
    }

    static invalidLogin() {
        console.log("incorrect username or password");
    }

    static loginError(err) {
        console.log(err)
    }

    static logoutSuccess(user) {
        console.log(`${user.username} as ${user.position} successfully logged out.`)
    }

    static noUserLoggedIn() {
        console.log("No users are currently logged in")
    }

    static logoutError(err) {
        console.log(err)
    }

    static addPatientSuccess(objArrPatient) {
        console.log(`Berhasil menambahkan pasien dengan nama ${objArrPatient[0].nama}`)
    }

    static addPatientDuplicate(objArrPatient) {
        console.log(`ID telah diisi dengan nama ${objArrPatient.nama}`)
    }

    static addPatientBeforeLogin(objArrPatient) {
        console.log(`Silahkan Login Dahulu`)
    }

    static addPatientNotDoctor(objArrPatient) {
        console.log(`Bukan Akun Dokter`)
    }

    static addPatientError(err) {
        console.log(`gagal`)
    }

    static updatePatientSuccess(objArrPatient) {
        console.log(`Berhasil memperbarui data pasien dengan nama ${objArrPatient.nama}`)
    }

    static updateNoData() {
        console.log("Tidak ada data patient")
    }

    static updatePatientError() {
        console.log("gagal")
    }

    static deletePatientSuccess(objArrPatient) {
        console.log(`Berhasil menghapus data pasien`)
    }

    static deleteNoData() {
        console.log("Tidak ada data patient")
    }

    static deleteNotFound(id) {
        console.log(`Data id ${id} tidak ditemukan`)
    }

    static deletePatientError() {
        console.log("gagal")
    }

    static showEmployeeSucces(parsed) {
        console.log(`data dari Employee: \n${JSON.stringify(parsed, null, 2)}`)
    }

    static showPatientSuccess(parsed) {
        console.log(`data dari Patient: \n${JSON.stringify(parsed, null, 2)}`)
    }

    static showBeforeLogin() {
        console.log("silahkan login dahulu")
    }

    static showNotAdmin() {
        console.log("Bukan akun admin")
    }

    static showWrongType() {
        console.log("Salah memasukkan type")
    }

    static showError() {
        console.log("gagal")
    }

    static findPatientSuccess(data) {
        console.log(`data patient: ${JSON.stringify(data, null, 2)}`)
    }

    static findPatientNotFound(data) {
        console.log(`data patient tidak ditemukan`)
    }

    static findPatientError(error) {
        console.log(`gagal: ${error}`)
    }
}

module.exports = HospitalView;