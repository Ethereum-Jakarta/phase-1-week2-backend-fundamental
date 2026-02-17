import type Employee from "../models/employee.js"
import type Patient from "../models/patient.js";

class HospitalView {
    static errorView(msg: string): void {
        console.error(msg)
    }

    static registerView(user: Employee[]): void {
        const data: Employee | undefined = user[user.length - 1];
        console.log(`Register success. username: ${data?.username} | role: ${data?.position}. Total Employee: ${user.length}`);
    }

    static loginView(user: Employee[]): void {
        const login: Employee | undefined = user.find(u => u.login === true)
        if (login) {
            console.log(`Login success. Welcome ${login.username} (${login.position})`)
        }
    }

    static logoutView(): void {
        console.log('Logout success');
    }

    static addPatientView(patient: Patient[]): void {
        const data: Patient | undefined = patient[patient.length - 1];
        console.log(`Patient added: ${data?.username}`);
    }

    static updatePatientView(patient: Patient[]): void {
        const updated = patient[0];
        if (updated) {
            console.log(`Patient updated: ${updated.id}`);
        }
    }

    static deletePatientView(id: number): void {
        console.log(`Patietn deleted: ${id}`)
    }

    static showEmployeeView(employee: Employee[]): void {
        console.table(employee);
    }

    static showPatientView(patient: Patient[]): void {
        console.table(patient);
    }

    static findPatientView(patient: Patient[]): void {
        console.table(patient);
    }
}

export default HospitalView