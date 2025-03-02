class HospitalView {
  static registerView(data) {
    console.log(`Akun dengan nama ${data[0].name} dengan posisi ${data[0].role} telah dibuat. Jumlah pegawai: ${data[1]}`);
  }

  static loginView(data) {
    console.log(`berhasil login! welcome ${data.name}, anda adalah ${data.role}`);
  }

  static logoutView(employee) {
    console.log(`${employee.name} posisi ${employee.role} berhasil logout`);
  }

  static errorView(err) {
    console.log(err);
  }

  static helpView() {
    console.log(
      "// HOSPITAL INTERFACE COMMAND\n /* \n > node index.js register <username> <password> <jabatan> \n > node index.js login <username> <password> \n > node index.js logout \n \n NOTE : \n \n 1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT. \n 2. TIDAK BISA LOGIN BERSAMAAN. \n 3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE. \n \n */"
    );
  }
}

module.exports = HospitalView;
