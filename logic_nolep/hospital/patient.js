let fs = require("fs");

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
            } catch (e) {
                cb("File patient.json corrupt!");
            }
        });
    }

    static saveAll(data, cb) {
        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), cb);
    }

    static add(id, name, diseases, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let obj = new Patient(id, name, diseases);
            data.push(obj);

            this.saveAll(data, (err) => cb(err, obj));
        });
    }

    static update(id, name, diseases, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let patient = data.find(p => p.id == id);
            if (!patient) return cb("Patient not found");

            patient.name = name;
            patient.diseases = diseases;

            this.saveAll(data, (err) => cb(err, patient));
        });
    }

    static delete(id, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let newData = data.filter(p => p.id != id);

            this.saveAll(newData, (err) => cb(err, id));
        });
    }
}

module.exports = Patient;
