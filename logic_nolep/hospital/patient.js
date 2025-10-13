const fs = require('fs');
const FILE_PATH = "./patient.json";

class Patient {
    constructor(id, name, diagnosis) {
        this.id = id;
        this.name = name;
        this.diagnosis = diagnosis;
    }

    static findAll(cb) {
        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
            if (err) cb(err);
            else cb(null, JSON.parse(data));
        });
    }

    static add(name, diagnosis, cb) {
        if (!name || diagnosis.length === 0) {
            return cb('Error: Patient name and at least one diagnosis are required.');
        }
        this.findAll((err, data) => {
            if (err) return cb(err);
            const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
            const newPatient = new Patient(newId, name, diagnosis);
            data.push(newPatient);

            fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
                if (err) cb(err);
                else cb(null, newPatient);
            });
        });
    }

    static update(id, name, diagnosis, cb) {
        if (!id || !name || diagnosis.length === 0) {
            return cb('Error: Patient ID, name, and at least one diagnosis are required.');
        }
        this.findAll((err, data) => {
            if (err) return cb(err);
            const index = data.findIndex(p => p.id === id);
            if (index === -1) {
                return cb(`Error: Patient with ID ${id} not found.`);
            }
            data[index].name = name;
            data[index].diagnosis = diagnosis;

            fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
                if (err) cb(err);
                else cb(null, data[index]);
            });
        });
    }

    static delete(id, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);
            const index = data.findIndex(p => p.id === id);
            if (index === -1) {
                return cb(`Error: Patient with ID ${id} not found.`);
            }
            const deletedPatient = data.splice(index, 1)[0];

            fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
                if (err) cb(err);
                else cb(null, deletedPatient);
            });
        });
    }

    static findBy(criteria, value, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);
            let results = [];
            if (criteria === 'id') {
                results = data.filter(p => p.id === +value);
            } else if (criteria === 'name') {
                results = data.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
            } else {
                return cb("Invalid criteria. Use 'id' or 'name'.");
            }

            if (results.length === 0) {
                return cb(`No patients found for ${criteria}: ${value}`);
            }
            cb(null, results);
        })
    }
}

module.exports = Patient;