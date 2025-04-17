import {test, expect, beforeEach, afterEach} from '@jest/globals'
import {
    register,
    login,
    logout,
    show,
    findPatientBy,
    addPatient,
    updatePatient,
    deletePatient
} from "../src/mvc/controller";
import {isStringFieldValid} from '../src/utils/ValidationUtils'
import {SessionDriver} from "../src/utils/SessionDriver";
import {ErrView, EmployeeView} from "../src/mvc/view";
import {employeeDB, patientDB, PatientRepository} from "../src/mvc/model";

// > node index.js register <username> <password> <jabatan>
// > node index.js login <username> <password>
// > node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
// > node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
// > node index.js deletePatient <id>
// > node index.js logout
// > node index.js show <employee/patient>
// > node index.js findPatientBy: <name/id> <namePatient/idPatient>

// NOTE :
//
// 1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
// 2. TIDAK BISA LOGIN BERSAMAAN.
// 3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.
//

test("Register", () => {

    employeeDB.flush()
    expect(register("awan", "theravian", "admin")).toHaveProperty("message", "Success Register") //Valid,noDup
    expect(register("awan", "theravian", "admin")).toEqual(ErrView.duplicateError()) //Duplicate
    expect(register("awan", "", "doctor")).toEqual(ErrView.validateFail()) //pass kosong
    expect(register("awan", "theravian", "doctors")).toEqual(ErrView.validateFail()) //Jabatan gavalid

})

test("LoginLogout", () => {

    const sessionDriver = new SessionDriver();

    sessionDriver.flush()

    //Field Koosng satu
    expect(login("awan", "")).toHaveProperty("message", "Cek field ada yang tidak valid")
    //username gaada
    expect(login("awans", "theravian")).toHaveProperty("message", "Username Atau Password Salah")
    //password salah
    expect(login("awan", "theravians")).toHaveProperty("message", "Username Atau Password Salah")
    //Sukses
    expect(login("awan", "theravian")).toHaveProperty("message", "Success Login")
    //Sesi terisi
    expect(login("awan", "theravian")).toHaveProperty("message", "Employee with username awan was login, please logout")

    //LogOut Sukses
    expect(logout()).toHaveProperty("message", "Success Logouting employee with username : awan")
    //Logout Without Session
    expect(logout()).toHaveProperty("message", "Nothing Session Available")

})

test("Employee Role to CRUD Patient", () => {

    //Reset DB
    const sessionDriver = new SessionDriver()

    sessionDriver.flush()
    employeeDB.flush()
    patientDB.flush()

    //Register three role
    expect(register("awan", "theravian", "admin")).toHaveProperty("message", "Success Register") //Valid,noDup
    expect(register("harkon", "theravian", "doctor")).toHaveProperty("message", "Success Register") //Valid,noDup
    expect(register("wei", "theravian", "nurse")).toHaveProperty("message", "Success Register") //Valid,noDup

    //Login Nurse And Restrict
    expect(login("wei", "theravian")).toHaveProperty("message", "Success Login")
    expect(addPatient()).toEqual(ErrView.hasNoAccess())
    expect(updatePatient()).toEqual(ErrView.hasNoAccess())
    expect(deletePatient()).toEqual(ErrView.hasNoAccess())
    expect(logout()).toHaveProperty("message", "Success Logouting employee with username : wei")

    //Login Doctor And Do
    expect(login("harkon", "theravian")).toHaveProperty("message", "Success Login")
    expect(addPatient(1, "awd", "batuk", "demam")).toBeTruthy()
    expect(updatePatient(1, "asd", "sembuh")).toStrictEqual({id: 1, name: "asd", penyakit: ["sembuh"]})
    expect(deletePatient(1)).toStrictEqual({id: 1, name: "asd", penyakit: ["sembuh"]})
    expect(logout()).toHaveProperty("message", "Success Logouting employee with username : harkon")

    //Login Admin And Do
    expect(login("awan", "theravian")).toHaveProperty("message", "Success Login")
    expect(addPatient(1, "awd", "batuk", "demam")).toBeTruthy()
    expect(updatePatient(1, "asd", "sembuh")).toStrictEqual({id: 1, name: "asd", penyakit: ["sembuh"]})
    expect(deletePatient(1)).toStrictEqual({id: 1, name: "asd", penyakit: ["sembuh"]})

})

test("Validation CRUD", () => {

    //Reset DB
    const sessionDriver = new SessionDriver()

    sessionDriver.flush()
    employeeDB.flush()
    patientDB.flush()

    //Register doctor role
    expect(register("harkon", "theravian", "doctor")).toHaveProperty("message", "Success Register") //Valid,noDup

    //NoSession
    expect(addPatient()).toEqual(ErrView.hasNoLogin())
    expect(updatePatient()).toEqual(ErrView.hasNoLogin())
    expect(deletePatient()).toEqual(ErrView.hasNoLogin())

    //Doctor Login
    expect(login("harkon", "theravian")).toHaveProperty("message", "Success Login")

    //ValidationTrigger For Add
    //Name Kosong
    expect(addPatient(1, "", "batuk", "demam")).toEqual(ErrView.validateFail())
    //Sukses
    expect(addPatient(1, "awd", "batuk", "demam")).toBeTruthy()
    //Dup
    expect(addPatient(1, "awd", "batuk", "demam")).toEqual(ErrView.duplicateError())

    //ValidationTrigger For Update
    //Name Kosong
    expect(updatePatient(1, "", "sembuh")).toEqual(ErrView.validateFail())
    //Id Gak ada
    expect(updatePatient(2, "asd", "sembuh")).toHaveProperty("message", "Patient with id 2 Not Found")
    //Sukses
    expect(updatePatient(1, "asd", "sembuh")).toStrictEqual({id: 1, name: "asd", penyakit: ["sembuh"]})

    //ValidationTrigger For Delete
    //Id Gak Ada
    expect(deletePatient(2)).toHaveProperty("message", "Patient with id 2 Not Found")
    //Sukses
    expect(deletePatient(1)).toStrictEqual({id: 1, name: "asd", penyakit: ["sembuh"]})


});

test("ShowDataRule", () => {

    new SessionDriver().flush()
    //Reset -> Buar admin dokter dan nurse
    employeeDB.flush()
    patientDB.flush()

    //Register Employee
    expect(register("awan", "theravian", "admin")).toHaveProperty("message", "Success Register") //Valid,noDup
    expect(register("harkon", "theravian", "doctor")).toHaveProperty("message", "Success Register") //Valid,noDup
    expect(register("wei", "theravian", "nurse")).toHaveProperty("message", "Success Register") //Valid,noDup

    //Register Patient
    PatientRepository.save({
        id: 1, name: "adwo", penyakit: ["pusing", "malaria"]
    })
    PatientRepository.save({
        id: 2, name: "dwd", penyakit: ["pusing", "malaria"]
    })

    //Nosession
    expect(show("patient")).toEqual(ErrView.hasNoLogin())

    //Nurse Simulation wei
    expect(login("wei", "theravian")).toHaveProperty("message", "Success Login")
    expect(show("employee")).toEqual(ErrView.hasNoAccess())
    expect(show("patient")).toEqual(ErrView.hasNoAccess())
    expect(logout()).toHaveProperty("message", "Success Logouting employee with username : wei")

    //Doctor Simulation Harkon
    expect(login("harkon", "theravian")).toHaveProperty("message", "Success Login")
    expect(show("sepuh")).toHaveProperty("message", "Tidak ada status sepuh")
    expect(show("employee")).toEqual(ErrView.hasNoAccess())
    expect(show("patient")).toHaveProperty("message", "All Patient")

    expect(findPatientBy("id", 2)).toStrictEqual([{
        id: 2, name: "dwd", penyakit: ["pusing", "malaria"]
    }])
    expect(findPatientBy("name", "dwd")).toStrictEqual([{
        id: 2, name: "dwd", penyakit: ["pusing", "malaria"]
    }])

    expect(logout()).toHaveProperty("message", "Success Logouting employee with username : harkon")

})

