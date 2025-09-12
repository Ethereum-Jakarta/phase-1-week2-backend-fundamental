let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id
    this.name = name
    this.diseases = diseases;
  }

  static add(name, diseases, cb) {
    this.findAll((err, data) => {
        if (err) return cb(err);

        let id = data.length + 1;
        let patient = new Patient(id, name, diseases);
        data.push(patient);

        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
            if (err) return cb(err);
            cb(null, patient);
        });
    });
  }

  static update(id, newData, cb) {
    this.findAll((err, data) => {
        if (err) return cb(err);

        let patient = data.find(p => p.id == id);
        if (!patient) return cb('Pasien tidak ditemukan');

        patient.name = newData[0];
        patient.diseases = newData.slice(1);

        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
            if (err) return cb(err);
            cb(null, patient);
        });
    });
  }

  static delete(id, cb) {
    this.findAll((err, data) => {
        if (err) return cb(err);

        let index = data.findIndex(p => p.id == id);
        if (index === -1) return cb('Pasient tidak ditemukan');

        let removed = data.splice(index, 1);

        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
            if (err) return cb(err);
            cb(null, removed[0]);
        });
    });
  }

  static findBy(key, value, cb) {
    this.findAll((err, data) => {
        if (err) return cb(err);

        let patient;
        if (key === 'name') {
            patient = data.find(p => p.name === value);
        } else if (key === 'id') {
            patient = data.find(p => p.id == value)
        }

        if (!patient) return cb("Pasien tidak ditemukan");
        cb(null, patient);
    });
  }

  // lanjutkan method lain

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        return cb(err)
      } else {
        cb(null, JSON.parse(data));
      }
    })
  }
 

}



module.exports = Patient;