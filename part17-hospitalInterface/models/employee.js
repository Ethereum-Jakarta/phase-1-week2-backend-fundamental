const fs = require('fs').promises;

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  static async register(username, password, role) {
    try {
      const data = await this.findAll();
      const obj = new Employee(username, password, role);
      data.push(obj);
      //   const objArr = [obj, data.length];
      const objArr = [];
      objArr.push(obj);
      objArr.push(data.length);

      await fs.writeFile(
        `${__dirname}/../db/employee.json`,
        JSON.stringify(data)
      );
      return objArr;
    } catch (err) {
      console.log(err);
    }
  }
  static async login(username, password) {
    try {
      const data = await this.findAll();
      const employee = data.find(
        (emp) => emp.username === username && emp.password === password
      );

      if (employee.login === true) {
        return console.log('User already logged in');
      }

      if (employee) {
        employee.login = true;
        await this.updateEmployee(employee);
        return employee;
      } else return console.log('Invalid username or password');
    } catch (err) {
      console.log(err);
    }
  }
  static async logout() {
    try {
      const data = await this.findAll();
      const employee = data.find((emp) => emp.login === true);
      if (employee) {
        employee.login = false;
        await this.updateEmployee(employee);
        return employee;
      } else return console.log('No user logged in');
    } catch (err) {
      console.log(err);
    }
  }
  static async show() {
    try {
      const data = await this.findAll();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  static async updateEmployee(employee) {
    try {
      const data = await this.findAll();
      const index = data.findIndex((emp) => emp.username === employee.username);
      data[index] = employee;
      await fs.writeFile(
        `${__dirname}/../db/employee.json`,
        JSON.stringify(data)
      );
    } catch (err) {
      console.log(err);
    }
  }

  static async findAll() {
    try {
      const data = await fs.readFile(
        `${__dirname}/../db/employee.json`,
        'utf8'
      );
      return JSON.parse(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Employee;
