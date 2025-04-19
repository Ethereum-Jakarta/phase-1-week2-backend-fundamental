const Patient = require('../models/patient');
const Employee = require('../models/employee');
const HospitalView = require('../view/view');

class HospitalController {
  static async register(username, password, role) {
    try {
      const employee = await Employee.register(username, password, role);
      HospitalView.registerView(employee);
    } catch (err) {
      HospitalView.errorView(err);
    }
  }
  static async login(username, password) {
    try {
      const employee = await Employee.login(username, password);
      HospitalView.loginView(employee);
    } catch (err) {
      console.log(err);
    }
  }
  static async logout() {
    try {
      const employee = await Employee.logout();
      HospitalView.logoutView(employee);
    } catch (err) {
      console.log(err);
    }
  }
  static async addPatient(id, name, disease) {
    try {
      const patient = await Patient.addPatient(id, name, disease);
      HospitalView.addPatientView(patient);
    } catch (err) {
      HospitalView.errorView(err);
    }
  }
  static async updatePatient(id, name, disease) {
    try {
      const patient = await Patient.updatePatient(id, name, disease);
      HospitalView.updatePatientView(patient);
    } catch (err) {
      HospitalView.errorView(err);
    }
  }
  static async deletePatient(id, name, disease) {
    try {
      const patient = await Patient.deletePatient(id, name, disease);
      HospitalView.deletePatientView(patient);
    } catch (err) {
      HospitalView.errorView(err);
    }
  }
  static async show(status) {
    if (status === 'patient') {
      const patient = await Patient.show(status);
      return HospitalView.showPatientView(patient);
    }
    if (status === 'employee') {
      const employee = await Employee.show(status);
      return HospitalView.showEmployeeView(employee);
    }
    HospitalView.errorView('Thats a wrong number');
  }
  static async findPatient(id, name) {
    try {
      const patient = await patient.findPatient(id, name);
      HospitalView.findPatientView(patient);
    } catch (err) {
      console.log(err);
    }
  }
  static help() {
    return HospitalView.helpView();
  }
}

// lanjutkan command yang lain

module.exports = HospitalController;
