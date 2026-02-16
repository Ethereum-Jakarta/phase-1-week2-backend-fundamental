let fs = require('fs');

class Employee {
    constructor (username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    static findAll(cb) {
        fs.readFile('./employee.json', 'utf-8', (err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(err, JSON.parse(data));
            }
        })
    }

    static register(name, password, role, cb) {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                let obj = new Employee(name, password, role);
                let newData = data;
                newData.push(obj);
                let objArr = [];

                objArr.push(obj);
                objArr.push(newData.length);

                fs.writeFile('./employee.json', JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(err, objArr);
                    }
                })
            }
        })
    }

    // lanjutkan method lain

    static login(username, password, cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const alreadyLogin = data.find(emp => emp.login === true);
            if (alreadyLogin) {
                return cb('Someone is already logged in');
            }

            const employee = data.find(emp => emp.username === username && emp.password === password);
            if (!employee) {
                return cb('Invalid username or password');
            }

            employee.login = true;

            fs.writeFile('./employee.json', JSON.stringify(data), (err) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, employee);
                }
            })

        })
    }

    static logout(cb) {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const employee = data.find(emp => emp.login === true);
            if (!employee) {
                return cb('no user is currenly logged in');
            } 

            employee.login = false;

            fs.writeFile('./employee.json', JSON.stringify(data), (err) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, employee);
                }
            })
           
        })
    }

    static getLoggedIn(cb) {
        this.findAll((err, data) => {
            if (err) cb(err);

            const loggedInUser = data.find(emp => emp.login === true);
            cb(null, loggedInUser);
        })
    }
    
}

module.exports = Employee;