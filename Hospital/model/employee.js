let fs = require("fs").promises;
let path = require("path");

const filePath = path.join(__dirname, "..", "data", "employee.json");
class Employee {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.login = false;
  }

  static async register(name, password, role) {
    try {
      const data = await this.findAll();
      const obj = new Employee(name, password, role, this.login);
      let newData = data;
      newData.push(obj);
      await fs.writeFile(filePath, JSON.stringify(newData));
      return newData;
    } catch (err) {
      console.log(err);
    }
  }

  // PR Login validate username, dan pasword
  static async login(username, password) {
    try {
      const data = await this.findAll();
      const user =
        data.find((i) => i.username === username && i.password === password)
      if (user) {
        user.login = true;
        await fs.writeFile(filePath, JSON.stringify(data));
        return user;
      } else {
        console.log("Login gagal, username atau password yang anda masukkan salah");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async cekAdaLogin() {
    const data = await this.findAll();
    const dataLogin = data.find((i) => i.login == true);
    if (dataLogin) {
      return false;
    } else {
      return true;
    }
  }

  static async cekLogin() {
    try {
      const data = await this.findAll();
      const dataLogin = data.find((i) => i.login == true);
      if (dataLogin) {
        return dataLogin;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async logout() {
    try {
      const data = await this.findAll();
      const cekLogin = data.find((i) => i.login === true);
      if (cekLogin) {
        cekLogin.login = false;
        await fs.writeFile(filePath, JSON.stringify(data));
        return cekLogin;
      } else {
        console.log("Tidak ada employee yang login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async showEmployee() {
    try {
      const data = await this.findAll();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  static async findAll() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Employee;
