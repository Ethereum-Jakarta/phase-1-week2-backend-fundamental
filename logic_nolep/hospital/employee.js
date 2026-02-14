let fs = require("fs");
let FILE_PATH = "./employee.json";

class Employee {
    constructor(id, username, password, position) {
        this.id = id
        this.username = username
        this.password = password
        this.position = position
        this.login = false;
    }

    static register(name, password, role, cb) {
        if (!name || !password || !role) {
            return cb('Error: Please provide username, password, and role.');
        }
        this.findAll((err, data) => {
            if (err) cb(err);
            else {
                const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
                const newEmployee = new Employee(newId, name, password, role);
                data.push(newEmployee);

                fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
                    if (err) cb(err);
                    else cb(null, [newEmployee, data.length]);
                });
            }
        });
    }

    static login(username, password, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const alreadyLoggedIn = data.find(user => user.login === true);
            if (alreadyLoggedIn) {
                return cb(`Error: User ${alreadyLoggedIn.username} is already logged in. Please logout first.`);
            }

            const user = data.find(u => u.username === username);
            if (!user) {
                return cbj('Error: Username not found');
            }
            if (user.password !== password) {
                return cb('Error: Incorrect password.');
            }

            user.login = true;

            fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
                if (err) cb(err);
                else cb(null, user);
            });
        });
    }

    static logout(cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const user = data.find(u => u.login === true);
            if (!user) {
                return cb('Error: no user currently logged in.');
            }

            user.login = false;
            fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
                if (err) cb(err);
                else cb(null, user);
            });
        });
    }

    static getLoggedInUser(cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);
            const user = data.find(u => u.login === true);
            if (!user) {
                return cb('Error: You must be logged in to perform this action.');
            }
            cb(null, user);
        });
    }


    // lanjutkan method lain

    static findAll(cb) {
        fs.readFile(FILE_PATH, "utf8", (err, data) => {
            if (err) {
                cb(err)
            } else {
                cb(null, JSON.parse(data));
            }
        });
    }
 

}



module.exports = Employee;