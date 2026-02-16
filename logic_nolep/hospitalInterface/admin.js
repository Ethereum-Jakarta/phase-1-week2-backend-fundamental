const fs = require('fs');

class Admin {
    constructor(role) {
        this.role = role;
    }



    static findAll(cb) {
        fs.readFile(`./${role}.json`, "utf8", (err, data) => {
            if (err) {
                if (err.code === "ENOENT") {
                    cb(null, [])
                } else {
                    cb(err)
                }
            } else {
                try {
                    const parsed = data.trim() === "" ? [] : JSON.parse(data);
                    cb(null, parsed);
                } catch (e) {
                    cb(e);
                }
            }
        })
    }
}