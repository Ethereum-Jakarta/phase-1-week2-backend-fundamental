let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases; // array of penyakit
  }

  static register(id, name, ...args) {
    let cb = args.pop(); // Ambil callback dari argumen terakhir
    let diseases = args; // Sisanya adalah penyakit
    // Validasi id hanya digit
    if (!/^\d+$/.test(id)) {
      cb('ID pasien harus berupa digit saja.');
      return;
    }
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        // Cek apakah id sudah ada
        const isExist = data.some(patient => patient.id === id);
        if (isExist) {
          cb('ID already exists');
          return;
        }
        let obj = new Patient(id, name, diseases);
        let newData = data;
        newData.push(obj);
        let objArr = [];
        objArr.push(obj);
        objArr.push(newData.length);
        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          cb(err, objArr);
        });
      }
    });
  }

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          cb(null, []); // file belum ada, anggap data kosong
        } else {
          cb(err);
        }
      } else {
        cb(null, JSON.parse(data));
      }
    });
  }

  static findPatientBy(type, value, cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        let result;
        if (type === 'name') {
          result = data.filter(patient => patient.name === value);
        } else if (type === 'id') {
          result = data.filter(patient => patient.id == value);
        } else {
          cb('Tipe pencarian tidak valid. Gunakan name atau id.');
          return;
        }
        cb(null, result);
      }
    });
  }

  static update(id, name, ...args) {
    let cb = args.pop(); // Ambil callback dari argumen terakhir
    let diseases = args; // Sisanya adalah penyakit
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        const idx = data.findIndex(patient => patient.id === id);
        if (idx === -1) {
          cb('Patient not found');
          return;
        }
        data[idx].name = name;
        data[idx].diseases = diseases;
        let objArr = [];
        objArr.push(data[idx]);
        objArr.push(data.length);
        fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
          cb(err, objArr);
        });
      }
    });
  }

  static delete(id, cb) {
    this.findAll((err, data) => {
      if (err) {
        cb(err);
      } else {
        const idx = data.findIndex(patient => patient.id === id);
        if (idx === -1) {
          cb('Patient not found');
          return;
        }
        data.splice(idx, 1);
        let objArr = [];
        objArr.push(null); // Tidak perlu data pasien yang dihapus
        objArr.push(data.length);
        fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
          cb(err, objArr);
        });
      }
    });
  }
}

module.exports = Patient;
