const fs = require("fs/promises");

class Patient {
  constructor(id, name, diseases) {
    this.id = id;
    this.name = name;
    this.diseases = diseases; // array
  }

  static async register(id, name, ...diseases) {
    if (!/^\d+$/.test(id)) throw new Error('ID pasien harus berupa digit saja.');
    const data = await this.findAll();
    if (data.some(patient => patient.id === id)) {
      throw new Error('ID already exists');
    }
    const obj = new Patient(id, name, diseases);
    data.push(obj);
    await fs.writeFile("./patient.json", JSON.stringify(data));
    return [obj, data.length];
  }

  static async findAll() {
    try {
      const data = await fs.readFile("./patient.json", "utf8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }

  static async findPatientBy(type, value) {
    const data = await this.findAll();
    if (type === 'name') {
      return data.filter(patient => patient.name === value);
    } else if (type === 'id') {
      return data.filter(patient => patient.id == value);
    } else {
      throw new Error('Tipe pencarian tidak valid. Gunakan name atau id.');
    }
  }

  static async update(id, name, ...diseases) {
    const data = await this.findAll();
    const idx = data.findIndex(patient => patient.id === id);
    if (idx === -1) throw new Error('Patient not found');
    data[idx].name = name;
    data[idx].diseases = diseases;
    await fs.writeFile("./patient.json", JSON.stringify(data));
    return [data[idx], data.length];
  }

  static async delete(id) {
    const data = await this.findAll();
    const idx = data.findIndex(patient => patient.id === id);
    if (idx === -1) throw new Error('Patient not found');
    data.splice(idx, 1);
    await fs.writeFile("./patient.json", JSON.stringify(data));
    return [null, data.length];
  }
}

module.exports = Patient;
