// let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

class HospitalController {
  static register(name, pass, role) {
    Employee.register(name, pass, role)
      .then((data) => HospitalView.registerView(data))
      .catch((err) => console.log(err));
  }

  static login(name, pass) {
    Employee.login(name, pass)
      .then((data) => HospitalView.loginView(data))
      .catch((err) => HospitalView.errorView(err));
  }

  static logout() {
    Employee.logout()
      .then((employee) => HospitalView.logoutView(employee))
      .catch((err) => HospitalView.errorView(err));
  }

  static help() {
    HospitalView.helpView();
  }
}

module.exports = HospitalController;
