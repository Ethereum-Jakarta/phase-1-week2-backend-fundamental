class HospitalView {

    static ErrorView(msg) {
        console.log("❌ ERROR:", msg);
    }

    static registerView(objArr) {
        console.log(`✔ Register success. Username: ${objArr[0].username} | Role: ${objArr[0].position}. Total employee: ${objArr[1]}`);
    }

    static loginView(user) {
        console.log(`✔ Login success. Welcome ${user.username} (${user.position})`);
    }

    static logoutView() {
        console.log("✔ Logout success.");
    }

    static addPatientView(patient) {
        console.log(`✔ Patient added: ${patient.name}`);
    }

    static updatePatientView(patient) {
        console.log(`✔ Patient updated: ${patient.name}`);
    }

    static deletePatientView(id) {
        console.log(`✔ Patient deleted: ${id}`);
    }

    static showEmployeeView(data) {
        console.table(data);
    }

    static showPatientView(data) {
        console.table(data);
    }

    static findPatientView(result) {
        console.table(result);
    }
}

module.exports = HospitalView;
