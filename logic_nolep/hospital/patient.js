let fs = require('fs');

class Patient {
    constructor(id, namaPasien, penyakit1, penyakit2) {
        this.id = id;
        this.namaPasien = namaPasien;
        this.penyakit1 = penyakit1;
        this.penyakit2 = penyakit2;
    }

    static addPatient(id, namaPasien, penyakit1, penyakit2, cb) {
        this.findAllEmp((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                // cari apakah ada yang sudah login dan pastikan itu dokter
                let login = data.find(emp => emp.login === true)
                if (!login) {
                    cb(new Error('Please login first!!'), null);
                    return;
                } else {
                    if (login.position !== 'dokter') {
                        cb(new Error('Only doctor can access patient data!!'), null);
                        return;
                    }
                    this.findAllPatient((err, data) => {
                        if (err) {
                            cb(err, null);
                        } else {
                            // id tidak boleh sama
                            let cek = data.find(ptn => ptn.id === id); {
                                if (cek) {
                                    cb(new Error('Id has been used'), null);
                                    return;
                                }
                            }
                            let obj = new Patient(id, namaPasien, penyakit1, penyakit2);
                            let newData = data;

                            newData.push(obj);
                            let objArr = [];

                            objArr.push(obj);
                            objArr.push(newData.length);

                            fs.writeFile("./patient.json", JSON.stringify(newData, null, 2), (err) => {
                                if (err) {
                                    cb(err, null);
                                } else {
                                    cb(null, objArr);
                                }
                            });
                        }
                    });
                }
            }
        })
    }

    static updatePatient(id, namaPasien, penyakit1, penyakit2, cb) {
        this.findAllEmp((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                let login = data.find(emp => emp.login === true);
                if (!login) {
                    cb(new Error('Please login first!!'), null);
                    return;
                } else {
                    if (login.position !== 'dokter') {
                        cb(new Error('Only doctor can access patient data!!'), null);
                    }
                    this.findAllPatient((err, data) => {
                        let patient = data.find(ptn => ptn.id === id && ptn.namaPasien === namaPasien);
                        if (!patient) {
                            cb(new Error('Patient not found!!'), null);
                            return;
                        }
                        // update data pasien
                        patient.penyakit1 = penyakit1;
                        patient.penyakit2 = penyakit2;

                        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(null, patient);
                            }
                        });
                    });
                }
            }
        });
    }

    static deletePatient(id, cb) {
        this.findAllEmp((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                let login = data.find(emp => emp.login === true);
                if (!login) {
                    cb(new Error('Please login first!!'), null);
                    return;
                } else {
                    if (login.position !== 'dokter') {
                        cb(new Error('Only doctor can access patient data!!'), null);
                    }
                    this.findAllPatient((err, data) => {
                        let index = data.findIndex(ptn => ptn.id === id);
                        if (index === -1) {
                            cb(new Error('Index not found'), null);
                        }
                        let hapus = data[index];
                        data.splice(index, 1);

                        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
                            if (err) {
                                cb(err, null);
                            } else {
                                cb(null, hapus);
                            }
                        });
                    });
                }
            }
        });
    }

    static show(tipe, cb) {
        this.findAllEmp((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                let login = data.find(emp => emp.login === true);
                if (!login) {
                    cb(new Error('Please login first!!'), null);
                    return;
                } else {
                    if (tipe === 'employee') {
                        if (login.position === 'admin') {
                            cb(null, data);
                        } else {
                            cb(new Error("You can't access this data!!"));
                        }
                    } else {
                        if (login.position === 'dokter') {
                            this.findAllPatient((err, data) => {
                                if (err) {
                                    cb(err, null);
                                } else {
                                    cb(null, data);
                                }
                            });
                        } else {
                            cb(new Error("You can't access this data!!"));
                        }
                    }
                }
            }
        });
    }

    static findPatientBy(id, namaPasien, cb) {
        this.findAllEmp((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                let login = data.find(emp => emp.login === true);
                if (!login) {
                    cb(new Error('Please login first!!'), null);
                    return;
                } else {
                    if (login.position !== 'dokter') {
                        cb(new Error('Only doctor can access patient data!!'), null);
                    }
                    this.findAllPatient((err, data) => {
                        let patient = data.find(ptn => ptn.id === id || ptn.namaPasien === id && ptn.id === namaPasien || ptn.namaPasien === namaPasien);
                        if (!patient) {
                            cb(new Error('No patient found!!'), null);
                            return;
                        } else {
                            cb(null, patient);
                        }
                    });
                }
            }
        });
    }

    static findAllPatient(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            try {
                // Cek apakah data kosong atau hanya whitespace
                if (!data || data.trim() === '') {
                    cb(null, []);
                    return;
                }

                // Parse JSON dengan error handling
                let parsedData = JSON.parse(data);

                // Pastikan hasil parsing adalah array
                if (!Array.isArray(parsedData)) {
                    cb(null, []);
                    return;
                }

                cb(null, parsedData);
            } catch (parseError) {
                cb(null, parseError);
                // console.log("JSON Parse Error:", parseError.message);
                // console.log("Data yang error:", data);
            }
        });
    }

    static findAllEmp(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            try {
                // Cek apakah data kosong atau hanya whitespace
                if (!data || data.trim() === '') {
                    cb(null, []);
                    return;
                }

                // Parse JSON dengan error handling
                let parsedData = JSON.parse(data);

                // Pastikan hasil parsing adalah array
                if (!Array.isArray(parsedData)) {
                    cb(null, []);
                    return;
                }

                cb(null, parsedData);
            } catch (parseError) {
                cb(null, error);
                //     console.log("JSON Parse Error:", parseError.message);
                //     console.log("Data yang error:", data);
            }
        });
    }
}

module.exports = Patient;