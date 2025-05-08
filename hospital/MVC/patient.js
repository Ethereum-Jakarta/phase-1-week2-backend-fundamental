let fs = require('fs').promises;

class Patient {
  constructor(id, name, ...penyakit) {
    this.id = id;
    this.name = name;
    this.penyakit = penyakit;
  }

  // addPatient
  static async addPatient(id, namaPasien, ...penyakit) {
    try {
      const data = await this.findAll();
      const dataEmployee = await this.findAllEmployee();

      // Function untuk validasi hanya dokter yang boleh menggunakan addPatient
      const hasRole = (data) => {
        return data.some(
          (employee) =>
            (employee.position === 'admin' || employee.position === 'Admin') &&
            employee.login === true
        );
      };

      // Implementasi function hasRole
      if (!hasRole(dataEmployee)) {
        // Function untuk mengecek duplikasi ID
        const hasId = (data, id) => {
          return data.some((patient) => patient.id === id);
        };
        // Function untuk mengecek apakah dokter login
        const hasLogin = (data) => {
          return data.some((employee) => employee.login === true);
        };

        // Validasi ID dan login
        if (!hasId(data, id) && hasLogin(dataEmployee)) {
          const obj = new Patient(id, namaPasien, ...penyakit[0]);
          data.push(obj);
          await fs.writeFile('./patient.json', JSON.stringify(data));
          return [obj, data.length];
        } else if (!hasLogin(dataEmployee)) {
          throw new Error('Silahkan login terlebih dahulu.');
        }
      } else {
        throw new Error('Hanya dokter yang bisa memakai command ini.');
      }
    } catch (err) {
      throw err;
    }
  }

  // updatePatient
  static async updatePatient(id, namaPasien, ...penyakit) {
    try {
      const data = await this.findAll();
      const dataEmployee = await this.findAllEmployee();

      // Function untuk mengecek index ID dan nama jika ditemukan
      const findIndexByProperty = (data, property, value) => {
        const index = data.findIndex((patient) => patient[property] === value);
        return index;
      };
      const hasId = findIndexByProperty(data, 'id', id);
      const hasNama = findIndexByProperty(data, 'name', namaPasien);

      // Function untuk validasi hanya dokter yang bisa memakai updatePatient
      const hasRole = (data) => {
        return data.some(
          (employee) =>
            (employee.position === 'admin' || employee.position === 'Admin') &&
            employee.login === true
        );
      };

      // Implementasi function hasRole
      if (!hasRole(dataEmployee)) {
        // Function untuk mengecek apakah dokter login
        const hasLogin = (data) => {
          return data.some((employee) => employee.login === true);
        };

        // Validasi patient. Jika ada maka update. Validasi apakah dokter login
        if (hasId === hasNama && hasLogin(dataEmployee)) {
          data[hasId].id = id;
          data[hasNama].name = namaPasien;
          data[hasNama].penyakit = penyakit[0];

          await fs.writeFile('./patient.json', JSON.stringify(data));
          return [data, hasId];
        } else if (!hasLogin(dataEmployee)) {
          throw new Error('Silahkan login terlebih dahulu.');
        }
      } else {
        throw new Error('Hanya dokter yang bisa memakai command ini.');
      }
    } catch (err) {
      throw err;
    }
  }

  // deletePatient
  static async deletePatient(id, namaPasien, ...penyakit) {
    try {
      const data = await this.findAll();
      const dataEmployee = await this.findAllEmployee();

      // Function untuk mengecek ID dan nama jika ditemukan
      const findIndexByProperty = (data, property, value) => {
        const index = data.findIndex((patient) => patient[property] === value);
        return index;
      };
      const hasId = findIndexByProperty(data, 'id', id);
      const hasNama = findIndexByProperty(data, 'name', namaPasien);

      // Function untuk validasi hanya dokter yang boleh menggunakan deletePatient
      const hasRole = (data) => {
        return data.some(
          (employee) =>
            (employee.position === 'admin' || employee.position === 'Admin') &&
            employee.login === true
        );
      };

      // Implementasi function hasRole
      if (!hasRole(dataEmployee)) {
        // Function untuk mengecek apakah dokter login
        const hasLogin = (data) => {
          return data.some((employee) => employee.login === true);
        };

        // Validasi patient. Jika ada maka hapus. Validasi apakah dokter login
        if (hasId === hasNama && hasLogin(dataEmployee)) {
          if (hasId !== -1 && hasNama !== -1) {
            data.splice(hasId, 1);

            await fs.writeFile('./patient.json', JSON.stringify(data));
            return data;
          }
        } else if (!hasLogin(dataEmployee)) {
          throw new Error('Silahkan login terlebih dahulu.');
        }
      } else {
        throw new Error('Hanya dokter yang bisa memakai command ini.');
      }
    } catch (err) {
      throw err;
    }
  }

  // show
  static async show() {
    try {
      const data = await this.findAll();
      const dataEmployee = await this.findAllEmployee();
      const obj = [];

      // Function untuk validasi Dokter
      const hasRole = (data) => {
        return data.some(
          (employee) =>
            (employee.position === 'admin' || employee.position === 'Admin') &&
            employee.login === true
        );
      };

      // Implementasi hasRole
      if (!hasRole(dataEmployee)) {
        // Function untuk mengecek apakah Dokter login
        const hasLogin = (data) => {
          return data.some((employee) => employee.login === true);
        };

        if (hasLogin(dataEmployee)) {
          for (let i = 0; i < data.length; i++) {
            obj.push(data[i]);
          }
          return obj;
        } else {
          throw new Error('Silahkan login terlebih dahulu.');
        }
      } else {
        throw new Error('Anda bukan Dokter.');
      }
    } catch (err) {
      throw err;
    }
  }

  // findPatientBy
  static async findPatientBy(id, namaPasien) {
    try {
      const data = await this.findAll();
      const dataEmployee = await this.findAllEmployee();

      // Variabel untuk menampung pasien
      let pasien = [];

      // Function untuk mencari index melalui id dan nama
      const findIndexByProperty = (data, property, value) => {
        const index = data.findIndex((patient) => patient[property] === value);
        return index;
      };
      // Function untuk pengecekan role
      const hasRole = (data) => {
        return data.some(
          (employee) =>
            employee.position === 'dokter' || employee.position === 'Dokter'
        );
      };

      // Implementasi hasRole
      if (hasRole(dataEmployee)) {
        // Function validasi login
        const hasLogin = (data) => {
          return data.some((employee) => employee.login === true);
        };

        // Validasi jika input dibalik (id nama) atau (nama id) maka hasilnya sama
        if (id >= 0 && id <= 10000 && hasLogin(dataEmployee)) {
          const hasId = findIndexByProperty(data, 'id', id);
          const hasName = findIndexByProperty(data, 'name', namaPasien);

          if (hasId === hasName) {
            pasien.push(data[hasName]);
          }
        } else if (typeof id === 'string' && hasLogin(dataEmployee)) {
          const hasId = findIndexByProperty(data, 'id', namaPasien);
          const hasName = findIndexByProperty(data, 'name', id);

          if (hasId === hasName) {
            pasien.push(data[hasName]);
          }
        } else {
          throw new Error('Silahkan login terlebih dahulu.');
        }
        if (pasien.length === 0) {
          return 'Tidak ada data pasien.';
        }
      }
      return pasien;
    } catch (err) {
      throw err;
    }
  }

  // Async Patient
  static async findAll() {
    try {
      const data = await fs.readFile('./patient.json', 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }
  // Async Employee
  static async findAllEmployee() {
    try {
      const data = await fs.readFile('./employee.json', 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Patient;
