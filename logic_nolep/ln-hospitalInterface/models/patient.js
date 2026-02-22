let fs = require("fs");

class Patient {
    constructor(name, diseases) {
        this.name = name;
        this.diseases = diseases;
        this.id = Date.now().toString();  // Simple unique ID based on timestamp
    }

    static addPatient(data, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let patient = new Patient(data[0], data.slice(1));
                patients.push(patient);
                fs.writeFile("./patient.json", JSON.stringify(patients), (err) => {
                    cb(err, patient);
                });
            }
        });
    }

    static updatePatient(id, data, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let patient = patients.find(pat => pat.id === id);
                if (patient) {
                    patient.diseases = data;
                    fs.writeFile("./patient.json", JSON.stringify(patients), (err) => {
                        cb(err, patient);
                    });
                } else {
                    cb("Patient not found");
                }
            }
        });
    }

    static deletePatient(id, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let updatedPatients = patients.filter(pat => pat.id !== id);
                fs.writeFile("./patient.json", JSON.stringify(updatedPatients), (err) => {
                    cb(err, "Patient deleted");
                });
            }
        });
    }

    static findAll(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(null, JSON.parse(data));
            }
        });
    }

    static findPatientBy(type, value, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                let patient = patients.find(pat => pat[type] === value);
                cb(patient ? null : "Patient not found", patient);
            }
        });
    }
}

module.exports = Patient;
