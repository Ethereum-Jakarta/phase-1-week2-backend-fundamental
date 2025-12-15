class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username}, "password:"${objArr[0].password}}`);
    }
    // lanjutkan method lain

    static loginView(employee) {
        console.log(`login success: ${employee.username} as ${employee.position}`);
    }

    static logoutView(employee) {
        console.log(`logout success: ${employee.username} as ${employee.position}`);
    }

    static addPatientView(patient) {
        console.log(`Patient added: ${patient.name}`);
    }

    static updatePatientView(patient) {
        console.log(`Patient updated: ${patient.id} - ${patient.name}`);
    }

    static deletePatientView(patient) { 
        console.log(`Patient deleted: ${patient.id} - ${patient.name}`);
    }

    static showEmployeeView(employee) {
        console.log('=== EMPLOYEE LIST ===');
        employee.forEach(emp => {
            console.log(`${emp.username} - ${emp.position}`);
        });
    }

    static showPatientView(patient) {
        console.log('=== PATIENT LIST ===');
        patient.forEach(p => {
            console.log(`${p.id}. ${p.name} | disease: ${p.disease.join(', ')}`);
        });
    }

    static findPatientView(patient) {
        if (patient.length === 0) {
            console.log('No patient found');
            return;
        }
        
        patient.forEach(p => {
            console.log(`${p.id}. ${p.name} | disease: ${p.disease.join(', ')}`);
        });
    }

    static ErrorView(message) {
        console.log(`Error: ${message}`);
    }
}

module.exports = HospitalView;