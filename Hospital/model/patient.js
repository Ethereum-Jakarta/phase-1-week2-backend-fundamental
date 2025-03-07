let fs = require("fs").promises;
let path = require("path");

const filePath = path.join(__dirname, "..", "data", "patient.json");

class Patient {
  constructor(id, namaPasien, penyakit) {
    this.id = id;
    this.namaPasien = namaPasien;
    this.penyakit = penyakit;
  }

  static async findAll() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.log("error findAll data", err);
    }
  }

  static async addPatient(id, namaPasien, penyakit) {
    try {
      const data = await this.findAll();
      const obj = new Patient(id, namaPasien, penyakit);
      data.push(obj);
      await fs.writeFile(filePath, JSON.stringify(data));
      return obj;
    } catch (err) {
      console.log("error add data", err);
    }
  }

  static async updatePatient(id, namaPasien, penyakit) {
    try {
      const data = await this.findAll();
      const newData = data.find((i) => i.id === id);
      if (newData) {
        newData.namaPasien = namaPasien;
        newData.penyakit = penyakit;
        await fs.writeFile(filePath, JSON.stringify(data));
        return newData;
      } else {
        console.log("data tidak ditemukan");
      }
    } catch (err) {
      console.log("cooooy", err);
    }
  }

  static async deletePatient(id) {
    try {
      const data = await this.findAll();
      const cekData = data.find((i) => i.id === id);
      if (cekData) {
        const newData = data.filter((i) => i.id !== id);
        await fs.writeFile(filePath, JSON.stringify(newData));
        return cekData;
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async showPatient() {
    try {
      const data = await this.findAll();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async findPatient(param) {
    try {
      const data = await this.findAll();
      const findData =
        data.find((i) => i.namaPasien == param) ||
        data.find((i) => i.id == param);
      if(findData) {
        return findData
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Patient;
