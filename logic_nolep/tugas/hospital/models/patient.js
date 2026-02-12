import { readFile, writeFile } from "node:fs/promises";

const PATIENT_PATH = "./data/patient.json";

class Patient {
  constructor(id, name, penyakit, doctor) {
    this.id = id;
    this.name = name;
    this.diagnosis = penyakit;
    this.admitted_at = this.formatDate(new Date());
    this.attending_physician = doctor;
  }

  formatDate(date) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    return formatter.format(date).replace(",", "");
  }

  static async findAll() {
    try {
      const response = await readFile(PATIENT_PATH, "utf-8");
      return JSON.parse(response || "[]");
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  static async addPatient(id, name, penyakit, doctor) {
    try {
      const patients = await this.findAll();

      const newPatient = new Patient(id, name, penyakit, doctor);
      patients.push(newPatient);

      await writeFile(PATIENT_PATH, JSON.stringify(patients, null, 2));

      return "Successfully added Patient";
    } catch (err) {
      throw new Error(`Failed to add patient data: ${err.message}`);
    }
  }

  static async updatePatient(id, name, penyakit) {
    try {
      const patients = await this.findAll();

      const patient = patients.find((emp) => emp.id === id);
      if (!patient)
        throw new Error(`Can't find patient with id: ${id} or ${name}`);

      patient.name = name || patient.name;
      if (penyakit && penyakit.length > 0) {
        patient.diagnosis = penyakit;
      }

      await writeFile(PATIENT_PATH, JSON.stringify(patients, null, 2));
      return `Successfully update patient data`;
    } catch (err) {
      throw new Error(`Failed to add updated data: ${err.message}`);
    }
  }

  static async deletePatient(identifier) {
    try {
      const patients = await this.findAll();

      const index = patients.findIndex(
        (pt) => pt.id === identifier || pt.name === identifier,
      );
      if (index === -1) {
        throw new Error(`Can't find patient with Id or Name "${identifier}"`);
      }

      patients.splice(index, 1);

      await writeFile(PATIENT_PATH, JSON.stringify(patients, null, 2));
      return `Successfully delete patient data`;
    } catch (err) {
      throw new Error(`Failled to delete patient data: ${err.message}`);
    }
  }

  static async findPatientBy(identifier1, identifier2) {
    try {
      const patients = await this.findAll();

      const patient = patients.find((pt) => {
        const match1 = pt.id == identifier1 || pt.name == identifier1;
        const match2 = pt.id == identifier2 || pt.name == identifier2;

        return match1 && match2;
      });
      if (!patient) {
        throw new Error(
          `Patient with identifiers [${identifier1}, ${identifier2}] not found.`,
        );
      }

      return patient;
    } catch (err) {
      throw new Error(`Failed to fetch patient data: ${err.message}`);
    }
  }

  static async show() {
    return await this.findAll();
  }
}

export default Patient;
