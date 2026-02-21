let fs = require("fs")

class Patient {
    constructor(id, namaPasien, penyakit) {
        this.id = id;
        this.namaPasien = namaPasien;
        this.penyakit = penyakit;
    }

    static tambah(id, namaPasien, penyakit, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                const newPatient = new Patient(id, namaPasien, penyakit);
                patients.push(newPatient); 
                fs.writeFile("./patient.json",  JSON.stringify(patients, null, 2), (err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, newPatient); 
                    }
                });
            }
        });
    }

    static update(id, namaPasien, penyakit, cb){
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                const patientIndex = patients.findIndex(p => p.id == id);
                if (patientIndex === -1) {
                    return cb(new Error("Pasien gak ada!!"));
                }

                // Update data pasien
                patients[patientIndex].nama = namaPasien;
                patients[patientIndex].penyakit = penyakit;

                fs.writeFile("./patient.json", JSON.stringify(patients, null, 2), (err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, patients[patientIndex]); // Kembali dengan data pasien yang diupdate
                    }
                });
            }
        });
    }

    static delete(id, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                const deletePatients = patients.filter(p => p.id != id);
                const isDeleted = patients.length !== deletePatients.length;
                
                fs.writeFile("./patient.json", JSON.stringify(deletePatients, null, 2), (err) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, id);
                    }
                });
            }
        });
    }

    static find(query, cb) {
        this.findAll((err, patients) => {
            if (err) {
                cb(err);
            } else {
                const patient = patients.find(p => p.id == query || p.namaPasien.toLowerCase() === query.toLowerCase());
                cb(null, patient);
            }
        });
    }

    static findAll(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(null, data ? JSON.parse(data) : []);
            }
        });
    }
}

module.exports = Patient;
