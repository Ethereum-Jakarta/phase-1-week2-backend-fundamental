const fs = require('fs');

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
            } catch(error) {
                cb(error)
            }
        });
    }

    static saveAll(data, cb) {
        fs.writeFile("./employee.json", JSON.stringify(data, null, 2), (err, data) => {
            if (err) return cb(err);
            cb(null, data);
        });
    }

    static register(username, password, role, cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const user = data.find(u => u.username === username);
            if (user && user.position === 'admin') {
                return cb('Name already taken!');
            }

            if (user && user.position === 'dokter') {
                return cb('Name already taken!');
            }

            const obj = new Employee(username, password, role);
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

            const isLogin = data.find(e => e.login === true);
            if (isLogin) return cb('Cannot login together!');

            const user = data.find(u => u.username === username && u.password === password);
            if (!user) return cb('Username or password incorrect!');

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

            const user = data.find(u => u.login === true);
            if (!user) return cb('No one logged in!')

            user.login = false;

            this.saveAll(data, (err) => {
                if (err) return cb(err);
                cb(null, user);
            });
        });
    }

    static getCurrentUser(cb) {
        this.findAll((err, data) => {
            if (err) return cb(err);

            const user = data.find(u => u.login === true);
            if (!user) return cb('Must login first!');
            
            cb(null, user);
        })
    }
}

module.exports = Employee;