let fs = require('fs');

class Patient {
    constructor(id, name, disease) {
        this.id = id;
        this.name = name;
        this.disease = disease;
    }

    static findAll(cb) {
        fs.readFile('./patient.json', 'utf-8', (err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(err, JSON.parse(data));
            }
        })
    }

    static add(name, disease, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const lastId = data.length === 0 ? 0 : Math.max(...data.map(p => p.id));
            const id = lastId + 1
            const patient = new Patient(id, name, disease);
            data.push(patient);

            fs.writeFile('./patient.json', JSON.stringify(data), (err) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, patient)
                }
            })

        })
    }

    static update(id, name, disease, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patient = data.find(p => p.id === Number(id));
            if (!patient) {
                return cb('Patient not found');
            }

            patient.name = name;
            patient.disease = disease;

            fs.writeFile('./patient.json', JSON.stringify(data), (err) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, patient);
                }
            })
        })
    }

    static delete(id, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const index = data.findIndex(p => p.id === Number(id));
            if (index === -1) {
                return cb('Patient not found');
            }

            const deleted = data.splice(index, 1)[0];
            
            fs.writeFile('./patient.json', JSON.stringify(data), (err) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, deleted);
                }
            })
        })
    }



}

module.exports = Patient;