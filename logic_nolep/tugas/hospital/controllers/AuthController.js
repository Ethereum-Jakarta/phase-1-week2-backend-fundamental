import Employee from "../models/employee.js";
import HospitalView from "../views/view.js";

class AuthController {
  static register(username, password, jabatan) {
    const handleRegister = (err, data) =>
      err ? HospitalView.ErrorView(err) : HospitalView.registerView(data);

    Employee.register(username, password, jabatan, handleRegister);
  }

  static login(username, password) {
    const handleLogin = (err, data) =>
      err ? HospitalView.ErrorView(err) : HospitalView.loginView(data);

    Employee.login(username, password, handleLogin);
  }
  static logout() {
    const handleLogout = (err, data) =>
      err ? HospitalView.ErrorView(err) : HospitalView.logoutView(data);
    Employee.logout(handleLogout);
  }
}

export default AuthController;
