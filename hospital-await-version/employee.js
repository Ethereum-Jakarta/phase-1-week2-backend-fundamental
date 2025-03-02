let fs = require("fs").promises;
const { json } = require("stream/consumers");

class Employee {
  constructor(name, pass, role) {
    this.name = name;
    this.pass = pass;
    this.role = role;
    this.login = false;
  }

  static async findAll() {
    try {
      const data = await fs.readFile("./employeeData.json", "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  static async isEmployeeLoggedIn() {
    try {
      const data = await this.findAll();
      return data.find((e) => e.login === true);
    } catch (error) {
      throw error;
    }
  }

  static async login(name, pass) {
    try {
      const loggedInEmployee = await this.isEmployeeLoggedIn();
      if (loggedInEmployee) {
        throw "mohon logout terlebih dahulu";
      }

      const data = await this.findAll();
      if (name === undefined || pass === undefined) {
        throw "harap isi usename dan password";
      }

      const employee = data.find((e) => e.name === name && e.pass === pass);
      if (!employee) {
        throw "username dan password salah";
      }
      employee.login = true;
      await fs.writeFile("./employeeData.json", JSON.stringify(data));
      return employee;
    } catch (error) {
      throw error;
    }
  }

  static async register(name, pass, role) {
    try {
      const data = await this.findAll();
      const isNameTaken = data.find((e) => e.name === name);

      if (name === undefined || pass === undefined || role === undefined) {
        throw "nama, password, dan posisi wajib diisi";
      }

      if (isNameTaken) {
        throw "username sudah dipakai";
      }

      if (role !== "dokter" && role !== "admin") {
        throw "pilih posisi dokter / admin";
      }

      const newEmployee = new Employee(name, pass, role);
      data.push(newEmployee);
      await fs.writeFile("./employeeData.json", JSON.stringify(data));
      return [newEmployee, data.length];
    } catch (error) {
      throw error;
    }
    // return this.findAll()
    //   .then((data) => {
    //     const isNameTaken = data.find((e) => e.name === name);
    //     if (name === undefined || pass === undefined || role === undefined) {
    //       return Promise.reject("wajib isi nama, password, dan posisi");
    //     } else if (isNameTaken) {
    //       return Promise.reject("username sudah dipakai");
    //     } else if (role !== "dokter" && role !== "admin") {
    //       return Promise.reject("pilih role dokter atau admin");
    //     } else {
    //       let newEmployee = new Employee(name, pass, role);
    //       let newData = data;
    //       newData.push(newEmployee);
    //       let resultObj = [];
    //       resultObj.push(newEmployee);
    //       resultObj.push(newData.length);

    //       return fs.writeFile("./employeeData.json", JSON.stringify(newData)).then(() => {
    //         return resultObj;
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     return Promise.reject(err);
    //   });
  }

  static logout() {
    return this.findAll().then((data) => {
      const employee = data.find((e) => e.login === true);
      if (!employee) {
        return Promise.reject("belum ada yg login");
      } else {
        employee.login = false;
        return fs
          .writeFile("./employeeData.json", JSON.stringify(data))
          .then(() => {
            return employee;
          })
          .catch((err) => Promise.reject(err));
      }
    });
  }
}

module.exports = Employee;
