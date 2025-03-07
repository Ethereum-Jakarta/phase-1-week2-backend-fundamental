let Patient = require("../model/patient.js");
let Employee = require("../model/employee.js");
let HospitalView = require("../view/view.js");

class HospitalController {
  static async register(name, password, role) {
    try {
      const employee = await Employee.register(name, password, role);
      HospitalView.registerView(employee);
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async login(username, password) {
    try {
      const cekAdaLogin = await Employee.cekAdaLogin();
      if (cekAdaLogin) {
        const employee = await Employee.login(username, password);
        if (employee) {
          HospitalView.loginView(employee);
        }
      } else {
        console.log("Sedang ada yang login");
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async addPatient(id, namaPasien, penyakit) {
    try {
      const cekLogin = await Employee.cekLogin();
      if (cekLogin.role === "dokter") {
        const patient = await Patient.addPatient(id, namaPasien, penyakit);
        HospitalView.addPatientView(patient);
      } else {
        console.log("Hanya dokter yang bisa add data pasien");
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async updatePatient(id, namaPasien, penyakit) {
    try {
      const cekLogin = await Employee.cekLogin();
      if (cekLogin.role === "dokter") {
        const patient = await Patient.updatePatient(id, namaPasien, penyakit);
        HospitalView.updatePatientView(patient);
      } else {
        console.log("Hanya dokter yang bisa update data pasien");
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async deletePatient(id) {
    try {
      const cekLogin = await Employee.cekLogin();
      if (cekLogin.role === "dokter") {
        const patient = await Patient.deletePatient(id);
        if (patient) {
          HospitalView.deletePatientView(patient);
        }
      } else {
        console.log("Hanya dokter yang bisa delete data pasien");
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async logout() {
    try {
      const employee = await Employee.logout();
      if (employee) {
        HospitalView.logoutView(employee);
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async show(param) {
    try {
      if (param == "employee") {
        const cekLogin = await Employee.cekLogin();
        if (cekLogin.role === "admin") {
          const employee = await Employee.showEmployee(param);
          HospitalView.showEmployeeView(employee);
        } else {
          console.log("Hanya admin yang bisa melihat data employe");
        }
      } else if (param == "patient") {
        const patient = await Patient.showPatient(param);
        HospitalView.showPatientView(patient);
      } else {
        console.log("Parameter yang anda masukkan salah");
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static async findPatient(param) {
    try {
      const patient = await Patient.findPatient(param);
      if (patient) {
        HospitalView.findPatientView(patient);
      } else {
        console.log("Data yang anda cari tidak ada");
      }
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }

  static help() {
    try {
      HospitalView.HelpView();
    } catch (err) {
      HospitalView.ErrorView(err);
      console.log(err);
    }
  }
}

module.exports = HospitalController;
