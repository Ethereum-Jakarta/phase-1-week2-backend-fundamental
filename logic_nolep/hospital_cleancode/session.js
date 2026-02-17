const fs = require("fs/promises");
const path = require("path");

class Session {
  static sessionFile() {
    return path.join(__dirname, "session.json");
  }
  static async saveSession(user) {
    await fs.writeFile(this.sessionFile(), JSON.stringify(user));
  }
  static async getSession() {
    try {
      const data = await fs.readFile(this.sessionFile(), "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') return null;
      throw err;
    }
  }
  static async clearSession() {
    try {
      await fs.unlink(this.sessionFile());
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  }
}

module.exports = Session;
