const fs = require("fs/promises");

class Employee {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role; // 'dokter' atau 'admin'
    this.login = false;
  }

  static async register(name, password, role) {
    if (role !== 'dokter' && role !== 'admin') {
      throw new Error('Role harus dokter atau admin');
    }
    const data = await this.findAll();
    if (data.some(emp => emp.username === name)) {
      throw new Error('Username already exists');
    }
    const obj = new Employee(name, password, role);
    data.push(obj);
    await fs.writeFile("./employee.json", JSON.stringify(data));
    return [obj, data.length];
  }

  static async findAll() {
    try {
      const data = await fs.readFile("./employee.json", "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }
}

module.exports = Employee;
