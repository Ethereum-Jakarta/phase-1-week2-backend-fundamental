let fs = require("fs");

class Employee {
    constructor(username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    static register(username, password, role, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb(err);
            } else {
                let obj = new Employee(username, password, role);
                data.push(obj);
                fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
                    cb(err, obj);
                });
            }
        });
    }

    static findAll(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) {
                cb(err);
            } else {
                cb(null, JSON.parse(data));
            }
        });
    }

    static login(username, password, cb) {
        this.findAll((err, data) => {
            if (err) {
                cb(err);
            } else {
                let user = data.find(emp => emp.username === username && emp.password === password);
                if (user) {
                    cb(null, user);
                } else {
                    cb("Invalid credentials");
                }
            }
        });
    }
}

module.exports = Employee;
