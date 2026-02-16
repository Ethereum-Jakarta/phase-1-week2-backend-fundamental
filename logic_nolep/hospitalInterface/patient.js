const fs = require('fs');
const Employee = require('./employee');

class Patient {
    constructor(id, nama, penyakit1, penyakit2) {
        this.id = id;
        this.nama = nama;
        this.penyakit1 = penyakit1;
        this.penyakit2 = penyakit2;
    }

    static addPatient(id, nama, penyakit1, penyakit2, cb) {
        Employee.findAll((err, empolyeeData) => {
            if (err) {
                console.log(err);
            } else {
                //cek sudah login atau belum
                const loggedInUser = empolyeeData.find(employee => employee.login === true);
                // console.log(loggedInUser)
                if (!loggedInUser) return cb(null, { status: "please-login" });

                //cek akun dokter atau bukan
                if (loggedInUser.position !== "dokter") return cb(null, { status: "not-a-doctor" })

                this.findAll((err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        //cek duplikat id
                        const found = data.find(patient => patient.id === id);
                        if (found) return cb(null, { status: "duplicate-id", patient: found })

                        let objPatient = new Patient(id, nama, penyakit1, penyakit2);

                        //semua data patient termasuk yang baru ditambahkan dan disimpan ke file patient.json
                        let newData = data;
                        newData.push(objPatient);

                        //data khusus untuk di tampilkan di view
                        let objArrPatient = [];
                        objArrPatient.push(objPatient);

                        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                cb(err, { status: "success", patient: objArrPatient });
                            }
                        })
                    }
                })
            }
        })

    }

    static updatePatient(id, nama, penyakit1, penyakit2, cb) {
        Employee.findAll((err, employeeData) => {
            if (err) {
                console.log(err)
            } else {
                const loggedInUser = employeeData.find(employee => employee.login === true);
                // console.log(loggedInUser)
                if (!loggedInUser) return cb(null, { status: "please-login" });
                if (loggedInUser.position !== "dokter") return cb(null, { status: "not-a-doctor" })

                this.findAll((err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let found = data.find(patient => patient.id === id)

                        if (!found) return cb(null, { status: "no-data" });
                        found.nama = nama;
                        found.penyakit1 = penyakit1;
                        found.penyakit2 = penyakit2;

                        fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                cb(err, found)
                            }
                        })
                    }
                })
            }
        })

    }

    static deletePatient(id, nama, penyakit1, penyakit2, cb) {
        Employee.findAll((err, employeeData) => {
            if (err) {
                console.log(err);
            } else {
                const loggedInUser = employeeData.find(employee => employee.login === true);
                // console.log(loggedInUser)
                if (!loggedInUser) return cb(null, { status: "please-login" });
                if (loggedInUser.position !== "dokter") return cb(null, { status: "not-a-doctor" })

                this.findAll((err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (data.length === 0) return cb(null, { status: "no-data" });

                        let found = data.find(patient => patient.id === id);
                        console.log(found)

                        if (!found) return cb(null, { status: "not-found", id: id });

                        const filteredData = data.filter(patient => patient.id !== found.id);
                        // console.log(filteredData)

                        fs.writeFile("./patient.json", JSON.stringify(filteredData, null, 2), (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                cb(null, filteredData)
                            }
                        })
                    }
                })
            }
        })

    }

    static findPatient(name, id, cb) {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                let found = data.find(patient => patient.id === id || patient.name === name);
                // console.log("found:", found)

                if (!found) return cb(null, { status: "not-found" });

                return cb(null, { data: found })
            }
        })
    }

    static findAll(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    cb(null, []) //file belum ada
                } else {
                    cb(err)
                }
            } else {
                try {
                    const parsed = data.trim() === "" ? [] : JSON.parse(data);
                    cb(null, parsed);
                } catch (e) {
                    cb(e);
                }
            }
        })
    }
}

module.exports = Patient;