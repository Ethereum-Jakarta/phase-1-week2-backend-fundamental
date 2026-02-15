import type Employee from "./employee";
import type Patient from "./patient";

export default class HospitalView {
  public static registerView(data: Employee, dataSize: number) {
    console.log(`save data succes { "username": "${data.username}", "password": "${data.password}", "role": "${data.position} }. Total employee : ${dataSize}`);
  }

  public static loginView(data: Employee) {
    console.log(`Login Approved! Hi ${data.username} (${data.position})`);
  }

  public static logoutView() {
    console.log("Logout");
  }

  public static helpView() {
    const helpMessage = `==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy: <name/id> <namePatient/idPatient>`;
    console.log(helpMessage);
  }

  public static addPatientView(data: Patient) {
    console.log(`Pasien ditambahkan!\nID: ${data.id}\nNama: ${data.name}\nPenyakit: ${data.symptomps.join(", ")}`);
  }

  public static updatePatientView() {
    console.log("Berhasil mengubah data pasien!");
  }

  public static deletePatientView() {
    console.log("Berhasil menghapus data pasien!");
  }

  public static showView(data: Patient[] | Employee[], isPatient: boolean) {
    if (data.length < 1) console.log(`tidak ada ${isPatient ? "pasien" : "pekerja"}`);
    for (const d of data ) {
      isPatient ? HospitalView.showPatientView(d as Patient) : HospitalView.showEmployeeView(d as Employee);
      console.log("");
    }
  }

  public static showPatientView(patient: Patient) {
    console.log(`ID: ${patient.id}\nNama: ${patient.name}\nPenyakit: ${patient.symptomps.join(", ")}`);
  }

  public static showEmployeeView(employee: Employee) {
    console.log(`Username: ${employee.username}\nPassword: ${employee.password}\nRole: ${employee.position}`);
  }

  public static errorView(...messages: any) {
    console.error(...messages);
  }
}
