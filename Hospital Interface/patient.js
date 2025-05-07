const fs = require("fs");
const Data = require("./data");

class Patient extends Data {
    constructor(id, name, penyakit1, penyakit2) {
        super();
        this.id = id;
        this.name = name;
        this.penyakit1 = penyakit1;
        this.panyakit2 = penyakit2;
    }

    static addPatient(id, name, penyakit1, penyakit2, cb) {
        this.dataPatient((err, data) => {
            if (err) return cb(err);

            this.dataEmployee((err, employees) => {
                if (err) return cb(err);

                const employee = employees.find(({ login }) => login);
                if (!employee) return cb("must login first");
                if (employee.position !== "dokter")
                    return cb("you are not a doctor");

                const existId = data.find((patient) => patient.id === id);
                if (existId) return cb("id already exists");
                const existName = data.find((patient) => patient.name === name);
                if (existName) return cb("name already exist");

                const newData = data,
                    patient = { id, name, disease: [penyakit1, penyakit2] };

                newData.push(patient);

                fs.writeFile(
                    "./patient.json",
                    JSON.stringify(newData),
                    (err) => {
                        if (err) return cb(err);

                        cb(null, patient);
                    }
                );
            });
        });
    }

    static updatePatient(id, name, penyakit1, penyakit2, cb) {
        this.dataPatient((err, data) => {
            if (err) return cb(err);

            this.dataEmployee((err, employees) => {
                if (err) return cb(err);

                const employee = employees.find(({ login }) => login);
                if (!employee) return cb("must login first");
                if (employee.position !== "dokter")
                    return cb("you are not a doctor");

                const patientExists = data.find((patient) => patient.id === id);
                if (!patientExists)
                    return cb(`patient with id: ${id} not found`);

                const newData = data.map((patient) => {
                    if (patient.id === id) {
                        patient.name = name;
                        patient.disease[0] = penyakit1;
                        patient.disease[1] = penyakit2;
                    }

                    return patient;
                });

                fs.writeFile(
                    "./patient.json",
                    JSON.stringify(newData),
                    (err) => {
                        if (err) return cb(err);

                        cb(null, patientExists);
                    }
                );
            });
        });
    }

    static deletePatient(id, name, cb) {
        this.dataPatient((err, data) => {
            if (err) return cb(err);

            this.dataEmployee((err, employees) => {
                if (err) return cb(err);

                const employee = employees.find(({ login }) => login);
                if (!employee) return cb("must login first");
                if (employee.position !== "dokter")
                    return cb("you are not a doctor");

                const patientExists = data.find(
                    (patient) => patient.id === id && patient.name === name
                );
                if (!patientExists)
                    return cb(
                        `patient with id ${id} and name ${name} not found`
                    );

                const newData = data.filter(
                    (patient) => patient.id !== id && patient.name !== name
                );

                fs.writeFile(
                    "./patient.json",
                    JSON.stringify(newData),
                    (err) => {
                        if (err) return cb(err);

                        cb(null, patientExists);
                    }
                );
            });
        });
    }

    static findPatientBy(type, field, cb) {
        this.dataPatient((err, data) => {
            if (err) return cb(err);

            this.dataEmployee((err, employees) => {
                if (err) return cb(err);

                const employee = employees.find(({ login }) => login);
                if (!employee) return cb("must login first");
                if (employee.position !== "dokter")
                    return cb("you are not a doctor");

                if (type === "id") {
                    const patient = data.find(({ id }) => id === field);
                    if (!patient) return cb("patient not found");
                    cb(null, patient);
                } else {
                    const patient = data.find(({ name }) => name === field);
                    if (!patient) return cb("patient not found");
                    cb(null, patient);
                }
            });
        });
    }
}

module.exports = Patient;
