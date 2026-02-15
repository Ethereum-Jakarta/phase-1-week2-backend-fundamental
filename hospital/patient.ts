import { readFile, writeFile } from "fs/promises";
import Employee from "./employee";

export default class Patient {
  public id: string = Patient.createID();
  public constructor(public name: string, public symptomps: string[]) {}

  public static async add(name: string, symptomps: string[]) {
    await Patient.isEmployeeLogin();
    const patients = await Patient.findAll();
    if (typeof patients.find(x => x.name === name) !== "undefined") throw "Patient sudah ditambahkan! tidak bisa duplikat!";
    const patient = new Patient(name, symptomps);
    patients.push(patient);
    await Patient.writeFile(patients);
    return patient;
  }

  public static async update(name: string, symptomps: string[]) {
    await Patient.isEmployeeLogin();
    const patients = await Patient.findAll();
    const patient = patients.find(x => x.name === name);
    if (!patient) throw "Pasien tidak ditemukan";
    patient.symptomps = symptomps;
    await Patient.writeFile(patients);
  }

  public static async delete(id: string) {
    await Patient.isEmployeeLogin();
    const patients = await Patient.findAll();
    const patientIndex = patients.findIndex(x => x.id === id);
    if (patientIndex === -1) throw "Pasien tidak ditemukan!";
    patients.splice(patientIndex, 1);
    await Patient.writeFile(patients);
  }

  public static async list() {
    await Patient.isEmployeeLogin();
    const patients = await Patient.findAll();
    return patients;
  }

  public static async find(by: "id" | "name", value: string) {
    await Patient.isEmployeeLogin();
    const patients = await Patient.findAll();
    const patient = patients.find(x => x[by] === value);
    if (!patient) throw "Pasien tidak ditemukan!";
    return patient;
  }

  private static createID() {
    return Date.now().toString(36);
  }

  private static async isEmployeeLogin() {
    const employee = await Employee.loginInfo();
    if (!employee) throw "Harus login terlebih dahulu untuk menggunakan command ini!";
  }

  private static async findAll() {
    let data: any = [];
    try {
      data = JSON.parse(await readFile("./patient.json").then(f =>f.toString()));
    } catch {}
    return data as Patient[];
  }

  private static async writeFile(data: Patient[]) {
    return await writeFile("./patient.json", JSON.stringify(data, null, 2));
  }
}
