let fs = require("fs").promises;
const { json } = require("stream/consumers");

class Employee {
  constructor(name, pass, role) {
    this.name = name;
    this.pass = pass;
    this.role = role;
    this.login = false;
  }

  static findAll() {
    return fs
      .readFile("./employeeData.json", "utf-8")
      .then((data) => {
        try {
          const jsonData = JSON.parse(data);
          return jsonData;
        } catch (ParseError) {
          return Promise.reject(ParseError);
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  static isEmployeeLoggedIn() {
    return this.findAll()
      .then((data) => {
        return data.find((e) => e.login === true);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  static login(name, pass) {
    return this.isEmployeeLoggedIn()
      .then((loggedInEmployee) => {
        if (loggedInEmployee) {
          return Promise.reject("mohon logout terlebih dahulu");
        } else {
          return this.findAll().then((data) => {
            if (name === undefined || pass === undefined) {
              return Promise.reject("harap isi usename dan password");
            } else {
              const employee = data.find((e) => e.name === name && e.pass === pass);
              if (!employee) {
                return Promise.reject("username dan password salah");
              } else {
                employee.login = true;
                return fs.writeFile("./employeeData.json", JSON.stringify(data)).then(() => {
                  return employee;
                });
              }
            }
          });
        }
      })
      .catch((err) => Promise.reject(err));
  }

  static register(name, pass, role) {
    return this.findAll()
      .then((data) => {
        const isNameTaken = data.find((e) => e.name === name);
        if (name === undefined || pass === undefined || role === undefined) {
          return Promise.reject("wajib isi nama, password, dan posisi");
        } else if (isNameTaken) {
          return Promise.reject("username sudah dipakai");
        } else if (role !== "dokter" && role !== "admin") {
          return Promise.reject("pilih role dokter atau admin");
        } else {
          let newEmployee = new Employee(name, pass, role);
          let newData = data;
          newData.push(newEmployee);
          let resultObj = [];
          resultObj.push(newEmployee);
          resultObj.push(newData.length);

          return fs.writeFile("./employeeData.json", JSON.stringify(newData)).then(() => {
            return resultObj;
          });
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
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
