let fs = require("fs");

class Employee {
    constructor(username, password, position) {
        this.username = username
        this.password = password
        this.position = position
        this.login = false;
    }

    static register(name, password, role, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb(err, null);
            } else {
                let obj = new Employee(name, password, role)
                let newData = data;

                newData.push(obj);
                let objArr = [];

                objArr.push(obj);
                objArr.push(newData.length);

                fs.writeFile("./employee.json", JSON.stringify(newData, null, 2), (err) => {
                    if (err) {
                        cb(err, null);
                    } else {
                        cb(null, objArr);
                    }
                });
            }
        });
    }

    static login(username, password, cb) {
        this.findAll((err, data) => {

            if (err) {
                cb(err, null);
            } else {
                // cari apakah ada yang sudah login
                let login = data.find(emp => emp.login === true)
                if (login) {
                    cb(new Error("Someone's already login!!"), null);
                    return;
                }

                // cari employee berdasarkan username
                let employee = data.find(emp => emp.username === username);

                if (!employee) {
                    cb(new Error('Employee not found'), null);
                }

                if (employee.password === password) {
                    employee.login = true;
                    // simpan kembali seluruh data ke file
                    fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (writeErr) => {
                        if (writeErr) {
                            cb(new Error('Failed saving login status'), null);
                        } else {
                            cb(null, employee);
                        }
                    });
                } else {
                    cb(new Error('Invalid password'), null);
                }
            }
        })
    }

    static logout(cb) {
        this.findAll((err, data) => {
            if (err) {
                cb(err, null);
            } else {

                let employee = data.find(emp => emp.login === true);

                if (!employee) {
                    cb(new Error('Employee not found'), null);
                }

                employee.login = false;
                fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (writeErr) => {
                    if (writeErr) {
                        cb(new Error('Failed saving logout status'), null);
                    } else {
                        cb(null, employee);
                    }
                })
            }
        })
    }

    // lanjutkan method lain

    static findAll(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            try {
                // Cek apakah data kosong atau hanya whitespace
                if (!data || data.trim() === '') {
                    // jika file kosong maka inisiasi dengan array
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
}

module.exports = Employee;