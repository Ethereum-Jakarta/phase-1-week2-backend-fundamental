import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { autoIncrement } from "./helper.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "patient.json");
const SESSION_PATH = join(__dirname, "session.json");

export default class Patient {
  constructor(id, nama, penyakit) {
    this.id = id;
    this.nama = nama;
    this.penyakit = penyakit;
  }
  // PRIVATE UTILS METHOD UNTUK BACA SESSION FILE
  static async #readSession() {
    try {
      const sessionRaw = await fs.readFile(SESSION_PATH, "utf-8");
      const session = JSON.parse(sessionRaw);

      return session;
    } catch (err) {
      if (err.code === "ENOENT") {
        return null;
      } else {
        throw err;
      }
    }
  }

  // PRIVATE UTILITY METHOD UNTUK SAVE SESSION
  static async #saveToFile(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  // PRIVATE METHOD UNTUK MELIHAT ISI DB
  static async #findAll() {
    try {
      const contents = await fs.readFile(DB_PATH, "utf8");
      return JSON.parse(contents || "[]");
    } catch (err) {
      return [];
    }
  }

  // PRIVATE METHOD VALIDASI INPUT
  static async #validateInput(...args) {
    for (let arg of args) {
      if (!arg || arg.length === 0) {
        throw new Error("INPUT TIDAK BOLEH KOSONG");
      }
    }
  }

  // METHOD SHOW PATIENTS
  static async showPatient() {
    try {
      // CALL METHOD UNTUK BACA SESSION
      const session = await this.#readSession();
      if (!session) {
        throw new Error("ANDA BELUM LOGIN!");
      }

      return await this.#findAll();
    } catch (err) {
      if (err.code === "ENOENT") throw new Error("HARAP LOGIN TERLEBIH DAHULU");
      throw err;
    }
  }

  // METHOD ADD PATIENT
  static async addPatient(nama, namaPenyakit) {
    await this.#validateInput(nama, namaPenyakit);

    const session = await this.#readSession();

    if (!session) {
      throw new Error("ANDA BELUM LOGIN!");
    }
    if (session.role !== "dokter") {
      throw new Error("HANYA DOKTER YANG DAPAT MENGUBAH DATA PASIEN");
    }

    const patients = await this.#findAll();

    if (patients.some((e) => e.nama === nama)) {
      throw new Error("Pasien sudah terdaftar!");
    }

    const nextId = autoIncrement(patients);

    const newPatient = new Patient(nextId, nama, namaPenyakit);

    patients.push(newPatient);
    await this.#saveToFile(patients);

    return { ...newPatient, total_patient: patients.length };
  }

  // METHOD UPDATE PATIENT
  static async updatePatient(nama, penyakitLama, penyakitBaru) {
    if (!penyakitLama && !penyakitBaru) {
      throw new Error("DATA TIDAK LENGKAP, SILAHKAN LENGAPI DULU!");
    }

    // VALIDASI SESSION
    const session = await this.#readSession();
    if (!session) {
      throw new Error("ANDA BELUM LOGIN!");
    }
    if (session.role !== "dokter") {
      throw new Error("HANYA DOKTER YANG DAPAT MENGUBAH DATA PASIEN");
    }

    const patients = await this.#findAll();
    const dataPatient = patients.find((e) => e.nama === nama);

    if (!dataPatient) {
      throw new Error(`DATA PASIEN ATAS NAMA: ${nama} TIDAK DITEMUKAN!`);
    }

    const newDataPatient = {
      ...dataPatient,
      penyakit: dataPatient.penyakit.filter((e) => e !== penyakitLama),
    };

    newDataPatient.penyakit.push(penyakitBaru);

    const updatedPatients = patients.filter((patient) => patient.nama !== nama);

    updatedPatients.push(newDataPatient);

    await this.#saveToFile(updatedPatients);
    return {
      ...newDataPatient,
      data_lama: dataPatient.penyakit,
      data_baru: newDataPatient.penyakit,
    };
  }

  // METHOD DELETE PATIENT
  static async deletePatient(nama, namaPenyakit) {
    // VALIDASI SESSION
    const session = await this.#readSession();
    if (!session) {
      throw new Error("ANDA BELUM LOGIN!");
    }
    if (session.role !== "dokter") {
      throw new Error("HANYA DOKTER YANG DAPAT MENGUBAH DATA PASIEN");
    }

    const patients = await this.#findAll();
    const dataPatient = patients.find((e) => e.nama === nama);

    if (!dataPatient) {
      throw new Error(`DATA PASIEN ATAS NAMA: ${nama} TIDAK DITEMUKAN!`);
    }

    const updatedPatients = patients.filter((patient) => patient.nama !== nama);

    if (namaPenyakit) {
      const newDataPatient = {
        ...dataPatient,
        penyakit: dataPatient.penyakit.filter((e) => e !== namaPenyakit),
      };
      updatedPatients.push(newDataPatient);

      await this.#saveToFile(updatedPatients);
      return newDataPatient;
    } else {
      await this.#saveToFile(updatedPatients);
      return nama;
    }
  }

  // FIND PATIENT BY ID
  static async findPatientById(id) {
    const patients = await this.#findAll();
    const patient = patients.find((e) => e.id === id);
    if (!patient) {
      throw new Error(`PASIEN DENGAN ID: ${id} TIDAK DITEMUKAN!`);
    }
    return patient;
  }

  // FIND PATIENT BY NAME
  static async findPatientByName(name) {
    const patients = await this.#findAll();
    const patient = patients.find((e) => e.nama === name);

    if (!patient) {
      throw new Error(`PASIEN DENGAN NAMA: ${name} TIDAK DITEMUKAN!`);
    }
    return patient;
  }
}
