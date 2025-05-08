let Patient = require('./patient');
let Employee = require('./employee');
let HospitalView = require('./view');

class HospitalController {
  // register
  static async register(name, password, role) {
    try {
      // Validasi hanya boleh ada 2 role.
      if (role.toLowerCase() === "dokter" || role.toLowerCase() === 'admin') {
        const objArr = await Employee.register(name, password, role);
        HospitalView.registerView(objArr);
      } else {
        throw new Error('Role yang tersedia: [Dokter] [Admin]. Silahkan register kembali.');
      }
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // login
  static async login(name, password) {
    try {
      const objArr = await Employee.login(name, password);
      HospitalView.loginView(objArr);
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // addPatient
  static async addPatient(id, namaPasien, ...penyakit) {
    try {
      const objArr = await Patient.addPatient(id, namaPasien, ...penyakit);
      HospitalView.addPatientView(objArr);
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // updatePatient
  static async updatePatient(id, namaPasien, ...penyakit) {
    try {
      const objArr = await Patient.updatePatient(id, namaPasien, ...penyakit);
      HospitalView.updatePatientView(objArr);
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // deletePatient
  static async deletePatient(id, namaPasien, ...penyakit) {
    try {
      const objArr = await Patient.deletePatient(id, namaPasien, ...penyakit);
      HospitalView.deletePatientView(objArr);
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // logout
  static async logout() {
    try {
      const objArr = await Employee.logout();
      HospitalView.logoutView(objArr);
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // show
  static async show(employeeOrPatient) {
    try {
      let objArr = undefined;
      if (employeeOrPatient === 'Employee' || employeeOrPatient === 'employee') {
        objArr = await Employee.show();
        HospitalView.showView(objArr);
      } else if (employeeOrPatient === 'Patient' || employeeOrPatient === 'patient') {
        objArr = await Patient.show();
        HospitalView.showView(objArr);
      }
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // findPatientBy
  static async findPatientBy(id, namaPasien) {
    try {
      const objArr = await Patient.findPatientBy(id, namaPasien);
      HospitalView.findPatientByView(objArr);
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }

  // help
  static async help() {
    try {
      HospitalView.helpView();
    } catch (err) {
      HospitalView.ErrorView(err);
    }
  }
}

module.exports = HospitalController;
