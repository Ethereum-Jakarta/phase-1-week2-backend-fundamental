const path = require("path");
const fs = require("fs");

let Patient = require("./patient");
let Employee = require("./employee");
let HospitalView = require("./view");

const patientsFilePath = path.join(__dirname, "patient.json");
const employeesFilePath = path.join(__dirname, "employee.json");

class HospitalController {
  static help() {
    console.log(`
            ==========================
            HOSPITAL INTERFACE COMMAND
            ==========================
            > node index.js register <username> <password> <role> | (example: node index.js register newuser password123 doctor)
            > node index.js login <username> <password> | (example: node index.js login admin admin123)
            > node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ... | node index.js addPatient "Nama Pasien" "Penyakit1" "Penyakit2"
            > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ... | node index.js updatePatient '1' 'ganti' 'flu' 'batuk'
            > node index.js deletePatient <id> | node index.js deletePatient '1'
            > node index.js logout
            > node index.js show <employee/patient>
            > node index.js findPatientBy: <name/id> <namePatient/idPatient> | node index.js findPatientBy name " Ari " | node index.js findPatientBy id 2 
        `);
  }

  static register(name, password, role) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.registerView(objArr);
      }
    });
  }

  // lanjutkan command yang lain
  static login(username, password) {
    Employee.findAll((err, employees) => {
      if (err) {
        HospitalView.showError(err);
      } else {
        let found = employees.find(
          (emp) => emp.username === username && emp.password === password
        );
        if (found) {
          found.login = true; // Mengubah status login menjadi true

          // Simpan perubahan kembali ke file
          Employee.saveAll(employees, (err) => {
            if (err) {
              HospitalView.showError(err);
            } else {
              HospitalView.showLoginSuccess(username);
            }
          });
        } else {
          HospitalView.showLoginFailed(); // Tampilkan pesan login gagal
        }
      }
    });
  }

  static updatePatient(patientId, patientName, patientDiseases, callback) {
    fs.readFile(patientsFilePath, 'utf8', (err, data) => {
      if (err) return callback(err);
  
      let patients;
      try {
        patients = JSON.parse(data);
      } catch (parseErr) {
        return callback(parseErr);
      }
  
      const patientIndex = patients.findIndex(patient => patient.id === patientId);
      
      if (patientIndex === -1) return callback(new Error('Patient not found'));
  
      patients[patientIndex] = { id: patientId, name: patientName, diseases: patientDiseases };
      
      fs.writeFile(patientsFilePath, JSON.stringify(patients, null, 2), writeErr => {
        if (writeErr) return callback(writeErr);
        callback(null, patients[patientIndex]);
      });
    });
  }
  
  static deletePatient(id) {
    Patient.deletePatient(id, (err, patientId) => {
      if (err) {
        HospitalView.showError(err);
      } else {
        HospitalView.showDeletePatientSuccess(patientId);
      }
    });
  }

  static logout(callback) {
    // Simulate a logout process, e.g., resetting a session variable
    // This is highly dependent on how you've implemented authentication
    callback(null, 'Logout successful');
  }
  
  static show(type, callback) {
    const filePath = type === 'employee' ? employeesFilePath : patientsFilePath;
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return callback(err);
  
      try {
        const items = JSON.parse(data);
        callback(null, items);
      } catch (parseErr) {
        callback(parseErr);
      }
    });
  }
  
  static findPatientBy(criteria, value, callback) {
    fs.readFile(patientsFilePath, 'utf8', (err, data) => {
      if (err) return callback(err);
  
      let patients;
      try {
        patients = JSON.parse(data);
      } catch (parseErr) {
        return callback(parseErr);
      }
  
      let patient;
      if (criteria === 'id') {
        patient = patients.find(p => p.id.toString() === value.toString());
      } else if (criteria === 'name') {
        // Convert both to lower case and trim for case-insensitive, trimmed comparison
        patient = patients.find(p => p.name.toLowerCase().trim() === value.toLowerCase().trim());
      }
  
      if (!patient) {
        return callback(new Error('Patient not found'));
      }
  
      callback(null, patient);
    });
  }
  
  
  
  static addPatient(name, diseases, callback) {
    fs.readFile(patientsFilePath, "utf8", (err, data) => {
      if (err) return callback(err, null);

      let patients;
      try {
        patients = JSON.parse(data);
      } catch (error) {
        // If JSON parsing fails, start with an empty array
        patients = [];
      }

      let newPatient = { id: patients.length + 1, name, diseases };
      patients.push(newPatient);

      fs.writeFile(
        patientsFilePath,
        JSON.stringify(patients, null, 2),
        (err) => {
          if (err) return callback(err, null);
          callback(null, newPatient); // Success
        }
      );
    });
  }
}

module.exports = HospitalController;
