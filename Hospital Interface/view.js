class HospitalView {
    static registerView(employee, objArr) {
        console.log(
            `save data success {"username":${employee.username},"password":${employee.password},"role":${employee.position}}. Total employee : ${objArr.length}`
        );
    }

    static ErrorView(err) {
        console.log(err);
    }

    static loginView(employee) {
        console.log(`logged in, username: ${employee.username}`);
    }

    static logoutView(msg) {
        console.log(msg);
    }

    static showView(list) {
        console.log(list);
    }

    static addPatientView(patient) {
        const { id, name, disease } = patient;

        console.log(
            `The patient has been successfully added. { id:${id}, name:${name}, disease:${disease} }`
        );
    }

    static updatePatientView(patient) {
        const { id } = patient;

        console.log(`id with ${id} has been updated`)
    }

    static deletePatientView(patient) {
        const { id, name } = patient;

        console.log(`id with ${id} and nama ${name} has been delete`)
    }

    static findPatientByView(patient) {
        console.log(patient);
    }
}

module.exports = HospitalView;
