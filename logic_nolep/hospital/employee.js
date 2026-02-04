const fs = require("fs");

class Employee {
    constructor(name, password, role) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.login = false;
    }
 
    static ensureFileExists() {
        if (!fs.existsSync("./employee.json")) {
            fs.writeFileSync("./employee.json", "[]");
        }
    }

    static findAll(cb) {
        this.ensureFileExists();
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) cb(err);
            else cb(null, JSON.parse(data || "[]"));
        });
    }

    static register(name, password, role, cb) {
        this.ensureFileExists();
        this.findAll((err, employees) => {
            if (err) return cb(err);

            let newEmployee = new Employee(name, password, role);
            employees.push(newEmployee);
            fs.writeFile("./employee.json", JSON.stringify(employees, null, 2), (err) => {
                cb(err, newEmployee);
            });
        });
    }

    static login(name, password, cb) {
        this.ensureFileExists();
        this.findAll((err, employees) => {
            if (err) return cb(err);

            let employee = employees.find(emp => emp.name === name && emp.password === password);
            if (!employee) {
                cb("Login gagal! name atau password salah.");
            } else {
                cb(null, employee);
            }
        });
    }
    static logout(cb) {
        cb(null, "Logout berhasil!");
    }
    
}

module.exports = Employee;
