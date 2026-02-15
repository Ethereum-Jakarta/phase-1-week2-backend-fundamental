import Employee from "./employee";
import Patient from "./patient";
import HospitalView from "./view";

export default class HospitalController {
  public static help() {
    HospitalView.helpView();
  }

  public static async register(username?: string, password?: string, jabatan?: string) {
    if (!username || !password || !jabatan || !["doctor", "admin"].includes(jabatan)) throw "Argument kurang atau salah! masukan <username> <password> <jabatan>";
    const data = await Employee.register(username, password, jabatan as "doctor" | "admin");
    HospitalView.registerView(...data);
  }

  public static async login(username?: string, password?: string) {
    if (!username || !password) throw "Argument kurang! masukan <username> <password>";
    const data = await Employee.login(username, password);
    HospitalView.loginView(data);
  }

  public static async logout() {
    await Employee.logout();
    HospitalView.logoutView();
  }

  public static async addPatient(patientname?: string, ...symptomps: string[]) {
    if (!patientname || symptomps.length < 1) throw "Argument kurang! masukan <namaPasien> <penyakit1> <penyakit2>";
    const data = await Patient.add(patientname, symptomps);
    HospitalView.addPatientView(data);
  }

  public static async updatePatient(patientname?: string, ...symptomps: string[]) {
    if (!patientname || symptomps.length < 1) throw "Argument kurang! masukan <namaPasien> <penyakit1> <penyakit2>";
    await Patient.update(patientname, symptomps);
    HospitalView.updatePatientView();
  }

  public static async deletePatient(id?: string) {
    if (!id) throw "Masukan ID!";
    await Patient.delete(id);
    HospitalView.deletePatientView();
  }

  public static async findPatientBy(by?: string, nameorid?: string) {
    if (!by || !["id", "name"].includes(by) || !nameorid) throw "Argument kurang atau salah! masukan <name/id> <namaPasien/id>";
    const patient = await Patient.find(by as "id" | "name", nameorid);
    HospitalView.showPatientView(patient);
  }

  public static async show(type?: string) {
    if (!type || !["employee", "patient"].includes(type)) throw "Argument salah! masukan <employee/patient>";
    const data = type === "employee" ? await Employee.list() : await Patient.list();
    HospitalView.showView(data, type === "patient");
  }
}
