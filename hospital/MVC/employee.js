let fs = require('fs').promises;

class Employee {
  constructor(username, password, position) {
    this.username = username;
    this.password = password;
    this.position = position;
    this.login = false;
  }

  // register
  static async register(name, password, role) {
    try {
      const data = await this.findAll();

      // Function untuk validasi tidak boleh ada username yang sama.
      const hasUsername = (data, name) => {
        return data.some((patient) => patient.username === name);
      };

      // Implementasi function
      if (!hasUsername(data, name)) {
        const obj = new Employee(name, password, role);
        data.push(obj);
        await fs.writeFile('./employee.json', JSON.stringify(data));
        return [obj, data.length];
      } else {
        throw new Error('Username already taken.');
      }
    } catch (err) {
      throw err;
    }
  }

  // login
  static async login(name, password) {
    try {
      const data = await this.findAll();

      // Function untuk mengecek apakah ada yang login
      const hasTrueLogin = data.some((obj) => obj.login === true);
      // Function untuk validasi username dan password
      const hasLogin = (data, property, value) => {
        return data.findIndex((employee) => employee[property] === value);
      };
      const hasUsername = hasLogin(data, 'username', name);
      const hasPassword = hasLogin(data, 'password', password);

      // Validasi login
      if (hasUsername !== -1 && hasPassword !== -1 && !hasTrueLogin) {
        data[hasPassword].login = true;
        fs.writeFile('./employee.json', JSON.stringify(data));

        return [data, hasPassword, hasTrueLogin];
      } else if (hasTrueLogin) {
        throw new Error('Harap logout terlebih dahulu.');
      } else {
        throw new Error('Login gagal.');
      }
    } catch (err) {
      throw err;
    }
  }

  // logout
  static async logout() {
    try {
      const data = await this.findAll();

      // Validasi isLogin = true?
      const isLogin = (data) => {
        return data.findIndex((employees) => employees.login === true);
      };
      const index = isLogin(data);

      if (index !== -1) {
        data[index].login = false;
        await fs.writeFile('./employee.json', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      throw err;
    }
  }

  // show
  static async show() {
    try {
      const data = await this.findAll();
      const obj = [];

      // Function untuk validasi Admin
      const hasRole = (data) => { return data.some((employee) => (employee.position === 'dokter' || employee.position === 'Dokter') && employee.login === true);
      };
      
      // Implementasi hasRole
      if (!hasRole(data)) {
        // Function untuk mengecek apakah Admin login
        const hasLogin = (data) => {
          return data.some((employee) => employee.login === true);
        };

        if (hasLogin(data)) {
          for (let i = 0; i < data.length; i++) {
            obj.push(data[i]);
          }
          return obj;
        } else {
          throw new Error('Silahkan login terlebih dahulu.');
        }
      } else {
        throw new Error('Anda bukan Admin.');
      }
    } catch (err) {
      throw err;
    }
  }

  // Async
  static async findAll() {
    try {
      const data = await fs.readFile('./employee.json', 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Employee;
