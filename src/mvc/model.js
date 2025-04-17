import fs from 'fs'
import path from "path";
import JSONDBDriver from '../utils/JSONDBDriver'

const dbDir = "/Users/yukenz/WebstormProjects/Week2-Backend-Fundamental-MVC/src/mvc/db"

export const employeeDB = new JSONDBDriver(path.resolve(dbDir, "employee.json"));
export const patientDB = new JSONDBDriver(path.resolve(dbDir, "patient.json"));
export const adminDB = new JSONDBDriver(path.resolve(dbDir, "admin.json"));

export const JABATAN = ["admin", "doctor", "nurse"]

class AdminRepository {

    static findById(username) {
        return adminDB.read()
            .filter(admin => admin.username === username)[0]
    }

    static save(admin) {

        const admins = adminDB.read()
        admins.push(admin)

        return adminDB.write(admins)
    }

    static delete(username) {
        return adminDB.write(
            adminDB.read().filter(admin => admin.username !== username)
        )
    }

}

class EmployeeRepository {

    static findById(username) {
        return employeeDB.read()
            .filter(employee => employee.username === username)[0]
    }

    static save(employee) {

        const employees = employeeDB.read(employeeDB)
        employees.push(employee)

        return employeeDB.write(employees)
    }

    static delete(username) {
        return employeeDB.write(
            employeeDB.read().filter(employee => employee.username !== username)
        )
    }

    static findAllByJabatan(jabatan = "") {
        return employeeDB.read()
            .filter(employee => employee.jabatan === jabatan)
    }

    static findAll() {
        return employeeDB.read()
    }

}

class PatientRepository {
    static findById(id) {
        return patientDB.read()
            .filter(patient => patient.id === id)[0]
    }

    static findByProp(prop, value) {

        return patientDB.read()
            .filter(patient => patient[prop] == value)

    }

    static save(patient) {

        const patients = patientDB.read()
        patients.push(patient)

        return patientDB.write(patients)
    }

    static update(patientUpdated) {

        const patients = patientDB.read().map(patient => {

            //filter entity yang { idkey : valuekey }
            if (patient.id === patientUpdated.id) {
                return patientUpdated
            } else {
                return patient
            }

        })
        patientDB.write(patients)
        return patientUpdated
    }

    static delete(id) {
        return patientDB.write(
            patientDB.read().filter(patient => patient.id !== id)
        )
    }

    static findAll() {
        return patientDB.read()
    }
}

export {EmployeeRepository, PatientRepository, AdminRepository}
export default {EmployeeRepository, PatientRepository, AdminRepository}