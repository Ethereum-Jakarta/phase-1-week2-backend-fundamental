const fs = require("fs");
const patientJSON = "patient.json";
if (!fs.existsSync(patientJSON)) {
  fs.writeFileSync(patientJSON, "[]", { encoding: "utf-8" });
}

class Patient {
  constructor(name, diseases) {
    this.name = name;
    this.diseases = diseases;
    this.id = Math.random().toString(36).slice(2, 7);
  }

  static addpatient(data, callback) {
    this.findAll((err, patients) => {
      if (err) {
        callback(err);
      }
      let patient = new Patient(data[0], data.slice(1));
      patients.push(patient);
      fs.writeFile("patient.json", JSON.stringify(patients, null, 2), (err) => {
        callback(err, patient);
      });
    });
  }

  static updatePatient(id, data, callback) {
    this.findAll((err, patients) => {
      if (err) {
        callback(err);
      }
      let patient = patients.find((person) => person.id === id);
      if (!patient) {
        callback("There's no patient.");
      } else {
        patient.diseases = data;
        fs.writeFile(
          "patient.json",
          JSON.stringify(patients, null, 2),
          (err) => {
            callback(err, patient);
          }
        );
      }
    });
  }

  static deletePatient(id, callback) {
    this.findAll((err, patients) => {
      if (err) {
        callback(err);
      }

      let remainingPatients = patients.filter((person) => person.id !== id);
      fs.writeFile(
        "patient.json",
        JSON.stringify(remainingPatients, null, 2),
        (err) => {
          if (err) callback(err);
          callback(err, "Patient deleted");
        }
      );
    });
  }



  static findAll(callback) {
    fs.readFile("patient.json", "utf-8", (err, data) => {
      if(err) {
        callback(err)
      }
      callback(null, JSON.parse(data))
    })
  }

  static findPatientBy(type, value, callback) {
    this.findAll((err, patients) => {
      if(err) {
        callback(err)
      }

      let patient = patients.find(person => person[type] === value)
      if(!patient) {
        callback("There's no patient", patient)
      } else {
        callback(null)
      }
    })
  }

}


module.exports = Patient;