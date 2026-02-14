import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { autoIncrement } from "./helper.js";

// GLOBAL VARIABLE UNRUK PATH
const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "employee.json");
const SESSION_PATH = join(__dirname, "session.json");

export default class Employee {
  constructor(id, username, password, position, isLogin = false) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.position = position;
    this.isLogin = isLogin;
  }

  // PRIVATE METHOD VALIDASI INPUT
  static async #validateInput(...args) {
    for (let arg of args) {
      if (!arg || arg.trim() === "") {
        throw new Error("INPUT TIDAK BOLEH KOSONG");
      }
    }
  }

  // PRIVATE UTILITY METHOD UNTUK SAVE SESSION
  static async #saveToFile(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
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

  // PRIVATE METHOD UNTUK MELIHAT ISI DB
  static async #findAll() {
    try {
      const contents = await fs.readFile(DB_PATH, "utf8");
      return JSON.parse(contents || "[]");
    } catch (err) {
      return [];
    }
  }

  // METHOD UNTUK REGISTER
  static async register(name, password, role) {
    await this.#validateInput(name, password, role);

    const isRoleValid = role === "admin" || role === "dokter";

    if (!isRoleValid)
      throw new Error("ROLE HANYA BOLEH: 'dokter' ATAU 'admin' ");

    const employees = await this.#findAll();

    if (employees.some((e) => e.username === name)) {
      throw new Error("Username sudah terdaftar!");
    }

    const nextId = autoIncrement(employees);
    const newEmployee = new Employee(nextId, name, password, role);

    employees.push(newEmployee);
    await this.#saveToFile(employees);

    return { ...newEmployee, total_employee: employees.length };
  }

  // METHOD UNTUK LOGIN
  static async login(username, password) {
    await this.#validateInput(username, password);
    // CALL METHOD UNTUK BACA SESSION
    const session = await this.#readSession();
    if (session) {
      throw new Error(
        "DILARANG LOGIN LEBIH DARI SEKALI! SILAHKAN LOGOUT TERLEBIH DAHULU!"
      );
    }

    const employees = await this.#findAll();
    const user = employees.find(
      (e) => e.username === username && e.password === password
    );

    if (!user) throw new Error("Username atau Password salah!");

    const updatedEmployees = employees.map((e) =>
      e.username === username ? { ...e, isLogin: true } : e
    );
    await this.#saveToFile(updatedEmployees);

    // BIKIN SESSION
    const sessionData = { username, role: user.position, loginAt: new Date() };
    await fs.writeFile(SESSION_PATH, JSON.stringify(sessionData, null, 2));

    return username;
  }

  // LOGOUT REMOVE SESSION
  static async logout() {
    try {
      const session = await this.#readSession();
      if (!session) {
        throw new Error("ANDA BELUM LOGIN! HARAP LOGIN TERLEBIH DAHULU!");
      }
      fs.unlink(SESSION_PATH);

      const employees = await this.#findAll();
      const updatedEmployees = employees.map((e) =>
        e.username === session.username ? { ...e, isLogin: false } : e
      );
      await this.#saveToFile(updatedEmployees);

      return session.username;
    } catch (err) {
      throw err;
    }
  }

  // SHOW DATA KHUSUS ADMIN
  static async showEmployee() {
    try {
      // CALL METHOD UNTUK BACA SESSION
      const session = await this.#readSession();
      if (!session) {
        throw new Error("ANDA BELUM LOGIN! HARAP LOGIN TERLEBIH DAHULU");
      }
      if (session.role !== "admin") {
        throw new Error("HANYA ADMIN YANG DAPAT MELIHAT DATA");
      }
      return await this.#findAll();
    } catch (err) {
      throw err;
    }
  }
}
