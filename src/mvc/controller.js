import {EmployeeRepository, PatientRepository, employeeDB, JABATAN} from './model'
import {EmployeeView, PatientView, ErrView} from './view'
import {isStringFieldValid} from '../utils/ValidationUtils'
import {SessionDriver} from "../utils/SessionDriver";

const sessionDriver = new SessionDriver();

export function register(username, password, jabatan) {

    //Validasi data gagal
    if (!isStringFieldValid(username, password, jabatan)) {
        return ErrView.validateFail()
    }

    //Jabatan gaada
    if (JABATAN.indexOf(jabatan) === -1) {
        return ErrView.validateFail()
    }

    //Username udah ada
    if (EmployeeRepository.findById(username)) {
        return ErrView.duplicateError()
    }

    //Buatkan Data
    const employee = {
        username, password, jabatan
    };

    //Simpan ke db
    EmployeeRepository.save(employee)

    return EmployeeView.register(employee)
}

export function login(username, password) {


    //Jika Ada Session
    if (sessionDriver.isHave()) {
        return ErrView.hasLogin(sessionDriver.read().username)
    }

    //Validasi data gagal
    if (!isStringFieldValid(username, password)) {
        return ErrView.validateFail();
    }

    //
    const employee = EmployeeRepository.findById(username);

    //Err jika gaada
    if (!employee) {
        return ErrView.wrongCredential()
    }

    //Err jika pass salah
    if (employee.password !== password) {
        return ErrView.wrongCredential()
    }

    //Sukses Auth buatkan session
    sessionDriver.write(employee)

    return EmployeeView.login(employee)

}

export function logout() {

    //Ada session gak?
    if (!sessionDriver.isHave()) {
        return ErrView.hasNoLogin()
    }

    const username = sessionDriver.read().username;

    //Kosongin Session
    sessionDriver.flush()
    return EmployeeView.logout(username)

}

export function show(status) {

    //Musti Login
    if (!sessionDriver.isHave()) {
        return ErrView.hasNoLogin()
    }

    const session = sessionDriver.read();

    //Cuma boleh diisi employee dan patient
    switch (status) {
        case 'employee':

            //Bukan admin gabisa liat employe
            if (JABATAN.indexOf(session.jabatan) > JABATAN.indexOf("admin")) {
                return ErrView.hasNoAccess()
            }

            return EmployeeView.showAll(
                EmployeeRepository.findAll()
            );
        case 'patient':

            //Bukan dokter gabisa liat pasien
            if (JABATAN.indexOf(session.jabatan) > JABATAN.indexOf("doctor")) {
                return ErrView.hasNoAccess()
            }

            return PatientView.showAll(
                PatientRepository.findAll()
            )
        default:
            return ErrView.wrongStatus(status)
    }

}

export function findPatientBy(prop, value) {

    //Musti Login
    if (!sessionDriver.isHave()) {
        return ErrView.hasNoLogin()
    }

    //Jabatan Harus doktor (<=1)
    const session = sessionDriver.read();
    if (JABATAN.indexOf(session.jabatan) > JABATAN.indexOf("doctor")) {
        return ErrView.hasNoAccess()
    }

    return PatientRepository.findByProp(prop, value)

}

export function addPatient(id, name, ...penyakit) {

    //Musti Login
    if (!sessionDriver.isHave()) {
        return ErrView.hasNoLogin()
    }

    //Jabatan Harus doktor (<=1)
    const session = sessionDriver.read();
    if (JABATAN.indexOf(session.jabatan) > JABATAN.indexOf("doctor")) {
        return ErrView.hasNoAccess()
    }

    //Field gak valid
    if (!isStringFieldValid(id, name, ...penyakit)) {
        return ErrView.validateFail()
    }

    //Id Duplikat
    if (PatientRepository.findById(id)) {
        return ErrView.duplicateError()
    }

    //Buatkan data
    const patient = {
        id, name, penyakit: [...penyakit]
    }

    PatientRepository.save(patient)

    return true

}

export function updatePatient(id, name, ...penyakit) {

    //Musti Login
    if (!sessionDriver.isHave()) {
        return ErrView.hasNoLogin()
    }

    //Jabatan Harus doktor (<=1)
    const session = sessionDriver.read();
    if (JABATAN.indexOf(session.jabatan) > JABATAN.indexOf("doctor")) {
        return ErrView.hasNoAccess()
    }

    //Field gak valid
    if (!isStringFieldValid(id, name, ...penyakit)) {
        return ErrView.validateFail()
    }

    //Id untuk di update gak ada
    const patient = PatientRepository.findById(id);
    if (!(patient)) {
        return PatientView.notFound(id)
    }

    //Update data
    return PatientRepository.update({
        ...patient,
        name,
        penyakit: [...penyakit]
    })


}

export function deletePatient(id) {

    //Musti Login
    if (!sessionDriver.isHave()) {
        return ErrView.hasNoLogin()
    }

    //Jabatan Harus doktor (<=1)
    const session = sessionDriver.read();
    if (JABATAN.indexOf(session.jabatan) > JABATAN.indexOf("doctor")) {
        return ErrView.hasNoAccess()
    }

    //Id untuk di delete gak ada
    const patient = PatientRepository.findById(id);
    if (!(patient)) {
        return PatientView.notFound(id)
    }

    PatientRepository.delete(id)

    return patient

}
