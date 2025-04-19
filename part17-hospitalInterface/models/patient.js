const fs = require('fs').promises;

class Patient {
  constructor(id, name, disease) {
    this.id = id;
    this.name = name;
    this.disease = disease;
  }
  static async addPatient(id, name, disease) {
    try {
      const data = await this.findAll();
      const patient = new Patient(id, name, disease);
      data.push(patient);

      const objArr = [];
      objArr.push(patient);
      objArr.push(data.length);

      await this.writeFilePatient(data);
      return objArr;
    } catch (err) {
      console.log(err);
    }
  }
  static async updatePatient(id, name, disease) {
    try {
      const data = await this.findAll();
      const patientIndex = data.findIndex(
        (e) => e.id === id && e.name === name
      );
      if (patientIndex === -1)
        return console.log('Patient ID or Patient Name incorrect!');
      data[patientIndex].disease = disease;
      await this.writeFilePatient(data);
      return data[patientIndex];
    } catch (err) {
      console.log(err);
    }
  }
  static async deletePatient(id, name, disease) {
    try {
      const data = await this.findAll();
      const patientIndex = data.findIndex((el) => id === el.id);
      if (patientIndex === -1) return console.log('Patient not found');
      data.splice(patientIndex, 1);
      this.writeFilePatient(data);
      return data[patientIndex];
    } catch (err) {
      console.log(err);
    }
  }
  static async show() {
    try {
      const data = await this.findAll();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  static async findPatientBy(id, name) {
    try {
      const data = await this.findAll();
      const patient = data.find((e) => e.id === id && e.name === name);
      if (patient) return patient;
      return console.log('Patient not found!');
    } catch (err) {
      console.log(err);
    }
  }
  static async writeFilePatient(data) {
    try {
      await fs.writeFile(
        `${__dirname}/../db/patient.json`,
        JSON.stringify(data)
      );
    } catch (err) {
      console.log(err);
    }
  }
  static async findAll() {
    try {
      const data = await fs.readFile(
        `${__dirname}/../db/patient.json`,
        'utf-8'
      );
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = Patient;
