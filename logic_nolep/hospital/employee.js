let fs = require("fs");

class Employee {
    constructor(username, password, position) {
        this.username = username;
        this.password = password;
        this.position = position;
        this.login = false;
    }

    static findAll(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) return cb(err);

            if (!data.trim()) return cb(null, []);

            try {
                cb(null, JSON.parse(data));
            } catch (e) {
                cb("File employee.json corrupt!");
            }
        });
    }


    static saveAll(data, cb) {
        fs.writeFile("./employee.json", JSON.stringify(data, null, 2), cb);
    }

    static register(name, password, role, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let obj = new Employee(name, password, role);
            data.push(obj);

            this.saveAll(data, (err) => {
                if (err) return cb(err);
                cb(null, [obj, data.length]);
            });
        });
    }

    static login(username, password, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let isLogin = data.find(e => e.login === true);
            if (isLogin) return cb("Tidak bisa login bersamaan!");

            let user = data.find(e => e.username === username && e.password === password);
            if (!user) return cb("User tidak ditemukan");

            user.login = true;

            this.saveAll(data, (err) => {
                if (err) return cb(err);
                cb(null, user);
            });
        });
    }

    static logout(cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let user = data.find(e => e.login === true);
            if (!user) return cb("Tidak ada user login!");

            user.login = false;

            this.saveAll(data, cb);
        });
    }

    static getCurrentUser(cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            let user = data.find(e => e.login === true);
            if (!user) return cb("Silakan login terlebih dahulu!");

            cb(null, user);
        });
    }

}

module.exports = Employee;
