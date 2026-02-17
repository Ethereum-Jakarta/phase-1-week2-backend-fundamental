let fs = require("fs");
let path = require("path");

class Session {
    static sessionFile() {
        return path.join(__dirname, "session.json");
    }
    static saveSession(user) {
        fs.writeFileSync(this.sessionFile(), JSON.stringify(user));
    }
    static getSession() {
        if (!fs.existsSync(this.sessionFile())) return null;
        return JSON.parse(fs.readFileSync(this.sessionFile(), "utf8"));
    }
    static clearSession() {
        if (fs.existsSync(this.sessionFile())) fs.unlinkSync(this.sessionFile());
    }
}

module.exports = Session;