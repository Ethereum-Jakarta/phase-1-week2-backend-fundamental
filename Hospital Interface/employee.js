let fs = require("fs");
const Data = require("./data");

class Employee extends Data {
    constructor(username, password, position) {
        super();
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    static register(username, password, role, cb) {
        this.dataEmployee((err, data) => {
            if (err) return cb(err);

            const employee = new Employee(username, password, role),
                newData = data;

            newData.push(employee);

            fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
                if (err) cb(err);

                cb(null, employee, newData);
            });
        });
    }

    static login(username, password, cb) {
        this.dataEmployee((err, data) => {
            if (err) return cb(err);

            const existLogin = data.filter(({ login }) => login);
            if (existLogin.length) return cb("You are logged in");

            const exist = data.find(
                (employee) =>
                    employee.username === username &&
                    employee.password === password
            );

            if (!exist) return cb("Incorrect Username or Password");

            const newData = data.map((employee) => {
                if (
                    employee.username === username &&
                    employee.password === password
                ) {
                    employee.login = true;
                }

                return employee;
            });

            fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
                if (err) return cb(err);

                cb(err, exist);
            });
        });
    }

    static logout(cb) {
        this.dataEmployee((err, data) => {
            if (err) return cb(err);

            const existLogin = data.filter(({ login }) => login);
            if (!existLogin.length) return cb("you are not logged in");

            const newData = data.map((employee) => {
                if (employee.login) {
                    employee.login = false;
                }

                return employee;
            });

            fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
                if (err) return cb(err);

                cb(err, "Successfully logged out");
            });
        });
    }

    static show(type, cb) {
        this.dataEmployee((err, data) => {
            if (err) return cb(err);

            this.dataPatient((err, patients) => {
                if (err) return cb(err);

                const employee = data.find(({ login }) => login);
                if (!employee) return cb("you are not logged in");

                if (type === "employee") {
                    if (employee.position !== "admin")
                        return cb("you are not admin");

                    return cb(null, data);
                } else if (type === "patient") {
                    if (
                        employee.position !== "admin" &&
                        employee.position !== "dokter"
                    )
                        return cb("you are not admin or dokter");

                    return cb(null, patients);
                }
            });
        });
    }
}

module.exports = Employee;
