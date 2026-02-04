class HospitalView {
    static registerView(objArr) {
        console.log(`Save data success: {"username": "${objArr[0].username}", "password": "${objArr[0].password}", "role": "${objArr[0].role}"}. Total employees: ${objArr[1]}`);
    }

    static loginView(employee) {
        console.log(`Login success! Welcome, ${employee.username} (${employee.role}).`);
    }

    static addPatientView(patient) {
        console.log(`New patient added: ID ${patient.id}, Name: ${patient.name}, penyakit: ${patient.penyakit.join(", ")}`);
    }

    static updatePatientView(patient) {
        console.log(`Patient updated: ID ${patient.id}, Name: ${patient.name}, New penyakit: ${patient.penyakit.join(", ")}`);
    }

    static deletePatientView(message) {
        console.log(message);
    }

    static logoutView(message) {
        console.log(message);
    }

    static showEmployeesView(employees) {
        console.log("=== Employees List ===");
        employees.forEach(emp => console.log(`Username: ${emp.username}, Role: ${emp.role}`));
    }

    static showPatientsView(patients) {
        console.log("=== Patients List ===");
        patients.forEach(pat => console.log(`ID: ${pat.id}, Name: ${pat.name}, penyakit: ${pat.penyakit.join(", ")}`));
    }

    static findPatientView(patient) {
        console.log(`Patient found: ID ${patient.id}, Name: ${patient.name}, penyakit: ${patient.penyakit.join(", ")}`);
    }

    static errorView(message) {
        console.log(`Error: ${message}`);
    }

    static helpView() {
        console.log(`
==========================
HOSPITAL INTERFACE COMMAND
==========================
node index.js register <username> <password> <jabatan>
node index.js login <username> <password>
node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....
node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
node index.js deletePatient <id>
node index.js logout
node index.js show <employee/patient>
node index.js findPatientBy <name/id> <namePatient/idPatient>
        `);
    }
}
 
module.exports = HospitalView;
