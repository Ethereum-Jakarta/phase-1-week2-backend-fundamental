const fs = require('fs');

class Employee {
    constructor(username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    static register(name, password, role, cb) {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                let obj = new Employee(name, password, role);

                //semua data employee termasuk yang baru ditambahkan disimpan ke file employee.json
                let newData = data;
                newData.push(obj);

                // data khusus untuk ditampilkan di view
                let objArr = [];
                objArr.push(obj);
                objArr.push(newData.length);

                //writeFile akan menimpa seluruh isi file, bukan menambah di akhir.
                //Karena itu kamu harus selalu baca file dulu (fs.readFile) → push data baru → lalu writeFile semua ulang.
                //Format yang ditulis adalah teks JSON, bukan array JS.

                fs.writeFile("./employee.json", JSON.stringify(newData, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(err, objArr) //objArr dikirim ke view agar ditampilkan ke user
                    }
                })

                /*
                JSON.stringify(newData, null, 2)
                param1: mengubah data ke json
                param2: menulis semua properti karena null, jika ingin filter gunakan func
                param3: dengan format rapi pakai indentasi 2
                */
            }
        })
    }

    static login(name, password, cb) {
        this.findAll((err, data) => {
            if (err) {
                console.log(err)
            } else {
                //cek apakah sudah ada yang sedang login
                const alreadyLogin = data.find(employee => employee.login === true);
                if (alreadyLogin) {
                    return cb(null, { status: "already-login", user: alreadyLogin })
                }

                //cari user yang sesuai
                const found = data.find(employee => name === employee.username && password === employee.password);
                if (!found) {
                    return cb(null, { status: "invalid-credentials" })
                }
                found.login = true;

                fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(null, { status: "success", user: found });
                    }
                })
            }
        })
    }

    static logout(cb) {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                //cari user yang sedang login
                const loggedInUser = data.find(employee => employee.login === true);

                if (!loggedInUser) {
                    return cb(null, { status: "no-user-logged-in" });
                }

                //ubah login menjadi false
                loggedInUser.login = false;

                fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(null, { status: "success", user: loggedInUser });
                    }
                })
            }
        })
    }

    static show(type, cb) {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (!type || type !== "employee" && type !== "patient") return cb(null, { status: "wrong-type" })
                const loggedInUser = data.find(admin => admin.login === true);

                if (!loggedInUser) return cb(null, { status: "please-login" });

                if (loggedInUser.position === "admin") {
                    return cb(null, { status: "showAdmin", dataEmployee: data })
                }

                if (loggedInUser.position === "dokter") {
                    const Patient = require('./patient');
                    Patient.findAll((err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            return cb(null, { status: "showDokter", dataPatient: data })
                        }
                    })
                }
                // if (loggedInUser.position !== "admin") return cb(null, { status: "not-a-admin" });

                // if (type === "employee" || type === "patient") {
                //     fs.readFile(`./${type}.json`, "utf-8", (err, data) => {
                //         if (err) {
                //             if (err.code === "ENOENT") {
                //                 cb(null, []) //file belum ada
                //             } else {
                //                 cb(err)
                //             }
                //         } else {
                //             try {
                //                 const parsed = data.trim() === "" ? [] : JSON.parse(data);
                //                 cb(null, parsed)
                //             } catch (e) {
                //                 cb(e)
                //             }
                //         }
                //     })
                // }
            }
        })
    }

    static findAll(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    cb(null, [])// file belum ada
                } else {
                    cb(err)
                }
            } else {
                try {
                    const parsed = data.trim() === "" ? [] : JSON.parse(data);
                    cb(null, parsed);
                } catch (e) {
                    cb(e)
                }
            }
        })
    }
}

module.exports = Employee 