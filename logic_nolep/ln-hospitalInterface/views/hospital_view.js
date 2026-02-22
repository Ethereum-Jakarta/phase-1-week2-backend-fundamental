class HospitalView {
    static registerView(obj) {
        console.log(`Registered new employee: ${obj.username}, Role: ${obj.position}`);
    }

    static loginView(user) {
        console.log(`Login successful. Welcome, ${user.username}`);
    }

    static ErrorView(message) {
        console.error(message);
    }

    static addPatientView(patient) {
        console.log(`Patient added: ${patient.name}`);
    }

    static updatePatientView(patient) {
        console.log(`Patient updated: ${patient.name}`);
    }

    static deletePatientView(message) {
        console.log(message);
    }

    static logoutView() {
        console.log("Logged out.");
    }

    static showPatients(patients) {
        console.log("List of patients:");
        patients.forEach(patient => {
            console.log(`ID: ${patient.id}, Name: ${patient.name}, Diseases: ${patient.diseases.join(", ")}`);
        });
    }

    static showEmployees(employees) {
        console.log("List of employees:");
        employees.forEach(employee => {
            console.log(`Username: ${employee.username}, Role: ${employee.position}`);
        });
    }

    static showHelp() {
        console.log("Usage:");
        console.log("  node index.js register <username> <password> <jabatan>");
        console.log("  node index.js login <username> <password>");
        console.log("  node index.js addPatient <namaPasien> <penyakit1> <penyakit2> ....");
        console.log("  node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....");
        console.log("  node index.js deletePatient <id>");
        console.log("  node index.js logout");
        console.log("  node index.js show <employee/patient>");
        console.log("  node index.js findPatientBy: <name/id> <namePatient/idPatient>");
    }
}

module.exports = HospitalView;
