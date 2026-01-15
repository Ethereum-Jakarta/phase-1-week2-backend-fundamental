const fs = require('fs');

class Patient {
    constructor(id, name, diseases) {
        this.id = id;
        this.name = name;
        this.diseases = diseases;
    }

    static findAll(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) return cb(err);

            if (!data.trim()) return cb(null, []);

            try {
                cb(null, JSON.parse(data));
            } catch(error) {
                cb(error);
            }
        });
    }

    static saveAll(data, cb) {
        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
            if (err) return cb(err);
            cb(null, data);
        });
    }

    static add(id, name, diseases, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const obj = new Patient(id, name, diseases);
            data.push(obj);

            this.saveAll(data, (err) => {
                if (err) return cb(err);
                cb(null, obj);
            });
        });
    }

    static update(id, name, diseases, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const patient = data.find(p => p.id === id);
            if (!patient) return cb('Patient not found!');

            patient.name = name;
            patient.diseases = diseases;

            this.saveAll(data, (err) => {
                if (err) return cb(err);
                cb(null, patient);
            });
        });
    }

    static delete(id, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const patient = data.filter(p => p.id !== id);
            if (patient) return cb('There are no patients!');

            this.saveAll(patient, (err) => {
                if (err) return cb(err);
                cb(null, id)
            });
        });
    }
}

module.exports = Patient;