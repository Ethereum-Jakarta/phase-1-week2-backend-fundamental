const fs = require("fs");
const path = require("path");
const patientsFilePath = path.join(__dirname, "patient.json");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases;
  }

  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
  static addPatient(name, diseases, callback) {
    fs.readFile(patientsFilePath, (err, data) => {
      if (err) return callback(err, null);

      let patients = JSON.parse(data);
      let newPatient = { id: patients.length + 1, name, diseases };
      patients.push(newPatient);

      fs.writeFile(
        patientsFilePath,
        JSON.stringify(patients, null, 2),
        (err) => {
          if (err) return callback(err, null);
          callback(null, newPatient); // Success
        }
      );
    });
  }

  static deletePatient(id, callback) {
    fs.readFile(patientsFilePath, "utf8", (err, data) => {
      if (err) return callback(err);

      let patients;
      try {
        patients = JSON.parse(data);
      } catch (parseErr) {
        return callback(parseErr);
      }

      const filteredPatients = patients.filter(
        (patient) => patient.id !== id.toString()
      );

      // Ensure we're comparing strings, since IDs in your JSON are strings
      // const filteredPatients = patients.filter(patient => patient.id !== id.toString());

      if (patients.length === filteredPatients.length) {
        return callback(new Error("Patient not found")); // No patient was removed, id not found
      }

      fs.writeFile(
        patientsFilePath,
        JSON.stringify(filteredPatients, null, 2),
        (writeErr) => {
          if (writeErr) return callback(writeErr);
          callback(null, id); // Success, return the deleted patient's id
        }
      );
    });
  }
}

module.exports = Patient;
