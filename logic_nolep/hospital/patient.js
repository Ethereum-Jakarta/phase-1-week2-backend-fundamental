const fs = require("fs");

class Patient {
    constructor(id, name, penyakit) {
        this.id = id;
        this.name = name;
        this.penyakit = penyakit;
    }

    static ensureFileExists() {
        if (!fs.existsSync("./patient.json")) {
            fs.writeFileSync("./patient.json", "[]");
        }
    }
 
    static add(name, penyakit, cb) {
        this.ensureFileExists();
        this.findAll((err, data) => {
            if (err) {
                cb(err);
            } else {
                let id = data.length + 1;
                let newPatient = new Patient(id, name, penyakit);
                data.push(newPatient);
                fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
                    cb(err, newPatient);
                });
            }
        });
    }
    static findBy(type, value, cb) {
        this.ensureFileExists();
        this.findAll((err, patients) => {
            if (err) return cb(err);

            let result = patients.find(p => p[type] == value);
            if (!result) return cb(`Patient with ${type} '${value}' not found!`);
            
            cb(null, result);
        });
    }
    static findAll(cb) {
        this.ensureFileExists();
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) cb(err);
            else cb(null, JSON.parse(data || "[]"));
        });
    }
    static update(id, penyakit, cb) {
        this.ensureFileExists();
        this.findAll((err, patients) => {
            if (err) return cb(err);

            let patientIndex = patients.findIndex(p => p.id == id);
            if (patientIndex === -1) return cb("Patient not found!");

            patients[patientIndex].penyakit = penyakit;
            fs.writeFile("./patient.json", JSON.stringify(patients, null, 2), (err) => {
                cb(err, patients[patientIndex]);
            });
        });
    }
    static delete(id, cb) {
        this.ensureFileExists();
        this.findAll((err, patients) => {
            if (err) return cb(err);

            let newPatients = patients.filter(p => p.id != id);
            if (newPatients.length === patients.length) return cb("Patient not found!");

            fs.writeFile("./patient.json", JSON.stringify(newPatients, null, 2), (err) => {
                cb(err, `Patient with ID ${id} deleted.`);
            });
        });
    }
}

module.exports = Patient;
