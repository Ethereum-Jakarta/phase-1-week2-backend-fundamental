import Patient from "./patient.js";
import Employee from "./employee.js";
import HospitalView from "./view.js";

export default class HospitalController {
  // HANDLE REGISTER
  static async register(name, password, role) {
    try {
      const newEmployee = await Employee.register(name, password, role);
      HospitalView.registerView(newEmployee);
    } catch (err) {
      HospitalView.errorMessageView(err.message);
    }
  }
  // HANDLE LOGIN
  static async login(username, password) {
    try {
      const loginEmployee = await Employee.login(username, password);
      HospitalView.loginView(loginEmployee);
    } catch (err) {
      HospitalView.errorMessageView(err.message);
    }
  }

  // HANDLE ADD PATIENT
  static async addPatient(nama, penyakit) {
    try {
      const newPatient = await Patient.addPatient(nama, penyakit);
      HospitalView.newPatientView(newPatient);
    } catch (err) {
      HospitalView.errorMessageView(err.message);
    }
  }

  // HANDLE UPDATE PATIENT
  static async updatePatient(nama, penyakitLama, penyakitBaru) {
    try {
      const patient = await Patient.updatePatient(
        nama,
        penyakitLama,
        penyakitBaru
      );
      HospitalView.updatedPatientView(patient);
    } catch (err) {
      HospitalView.errorMessageView(err.message);
    }
  }

  // HANDLE DELETE PATIENT
  static async deletePatient(nama, penyakit) {
    try {
      const patients = await Patient.deletePatient(nama, penyakit);
      HospitalView.deletedPatientView(patients);
    } catch (err) {
      HospitalView.errorMessageView(err.message);
    }
  }

  // FIND PATIENT BY <ID/NAME>
  static async findPatient(key, value) {
    if (key === "id") {
      try {
        const patient = await Patient.findPatientById(Number(value));
        HospitalView.foundPatientView(patient);
      } catch (err) {
        HospitalView.errorMessageView(err.message);
      }
    } else if (key === "name") {
      try {
        const patient = await Patient.findPatientByName(value);
        HospitalView.foundPatientView(patient);
      } catch (err) {
        HospitalView.errorMessageView(err.message);
      }
    } else {
      HospitalView.errorMessageView(
        "kata kunci tidak tersedia coba -> findPatientBy: <name/id>"
      );
    }
  }
  // HANDLE LOGOUT
  static async logout() {
    try {
      const logout = await Employee.logout();
      HospitalView.logoutView(logout);
    } catch (err) {
      HospitalView.errorMessageView(err.message);
    }
  }
  // HANDLE SHOW <PATIENT/EMPLOYEE>
  static async show(arg) {
    if (arg === "employee") {
      try {
        const data = await Employee.showEmployee();
        HospitalView.show(data);
      } catch (err) {
        HospitalView.errorMessageView(err.message);
      }
    } else if (arg === "patient") {
      try {
        const data = await Patient.showPatient();
        HospitalView.show(data);
      } catch (err) {
        HospitalView.errorMessageView(err.message);
      }
    } else {
      HospitalView.errorMessageView(
        "kata kunci tidak tersedia coba -> node index.js show <employee/patient>"
      );
    }
  }
  // HANDLE HELP
  static help() {
    HospitalView.helpMessageView();
  }
}
