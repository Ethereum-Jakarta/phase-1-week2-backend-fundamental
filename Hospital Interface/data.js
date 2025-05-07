const fs = require("fs");

class Data {
    static dataPatient(cb) {
        fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) return cb(err);

            cb(err, JSON.parse(data));
        });
    }

    static dataEmployee(cb) {
        fs.readFile("./employee.json", "utf8", (err, data) => {
            if (err) return cb(err);

            cb(err, JSON.parse(data));
        });
    }
}

module.exports = Data;
