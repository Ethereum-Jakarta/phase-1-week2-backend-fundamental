// import Patient from "./patient";
import Employee from "../models/employee.js";
import Patient from "../models/patient.js";
import HospitalView from "../views/view.js";

class HospitalController {
  // Doctor middleware
  static async #checkAccess(allowedRoles) {
    const user = await Employee.validateSession();
    if (!allowedRoles.includes(user.position.toLowerCase())) {
      throw new Error(`Access Denied: Requires ${allowedRoles.join("/")}`);
    }
    return user;
  }

  static async addPatient(id, namaPasien, ...penyakit) {
    try {
      const user = await this.#checkAccess(["doctor", "super"]);
      const doctor = user.username;
      const message = await Patient.addPatient(
        id,
        namaPasien,
        penyakit,
        doctor,
      );
      HospitalView.patientView(message);
    } catch (error) {
      HospitalView.ErrorView(error.message);
    }
  }

  static help() {
    HospitalView.helpView();
  }

  static async updatePatient(id, namaPasien, ...penyakit) {
    try {
      const user = await this.#checkAccess(["doctor", "super"]);
      const message = await Patient.updatePatient(id, namaPasien, penyakit);
      HospitalView.patientView(message);
    } catch (error) {
      HospitalView.ErrorView(error.message);
    }
  }

  static async deletePatient(idorName) {
    try {
      const user = await this.#checkAccess(["doctor", "super"]);
      const message = await Patient.deletePatient(idorName);
      HospitalView.patientView(message);
    } catch (error) {
      HospitalView.ErrorView(error.message);
    }
  }

  static async show(data) {
    try {
      if (data !== "employee" && data !== "patient") {
        return HospitalView.ErrorView(
          "Invalid input: use 'employee' or 'patient'",
        );
      }

      let message;

      if (data === "employee") {
        await this.#checkAccess(["admin", "super"]);
        message = await Employee.show();
      } else {
        message = await Patient.show();
      }

      HospitalView.patientView(message);
    } catch (err) {
      HospitalView.ErrorView(err.message);
    }
  }

  static async findPatientBy(identifier1, identifier2) {
    try {
      await Employee.validateSession();

      const message = await Patient.findPatientBy(identifier1, identifier2);
      HospitalView.patientView(message);
    } catch (err) {
      HospitalView.ErrorView(err.message);
    }
  }
}

export default HospitalController;
