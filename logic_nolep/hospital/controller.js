const Patient = require('./patient');
const Employee = require('./employee');
const HospitalView = require('./view');

class HospitalController {
    static register(name, password, role) {
        Employee.register(name, password, role, (err, data) => {
            if (err) return HospitalView.errorView(err);
            HospitalView.registerView(data);
        });
    }

    static login(name, password) {
        Employee.login(name, password, (err, data) => {
            if (err) return HospitalView.errorView(err);
            HospitalView.loginView(data);
        });
    }

    static logout() {
        Employee.logout((err) => {
            if (err) return HospitalView.errorView(err);
            HospitalView.logoutView();
        });
    }

    static addPatient(args) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.errorView(err);

            if (user.position !== 'dokter') return HospitalView.errorView('Only dokter!');

            const [id, name, ...diseases] = args;

            Patient.add(id, name, diseases, (err, data) => {
                if (err) return HospitalView.errorView(err);
                HospitalView.addPatientView(data);
            });
        });
    }

    static updatePatient(args) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.errorView(err);

            if (user.position !== 'dokter') return HospitalView.errorView('Only dokter!');

            const [id, name, ...diseases] = args;

            Patient.update(id, name, diseases, (err, data) => {
                if (err) return HospitalView.errorView(err);
                HospitalView.updatePatientView(data);
            });
        });
    }

    static deletePatient(args) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.errorView(err);

            if (user.position !== 'dokter') return HospitalView.errorView('Only dokter!');

            const [id] = args;

            Patient.delete(id, (err, data) => {
                if (err) return HospitalView.errorView(err);
                HospitalView.deletePatientView(data)
            });
        });
    }

    static show(type) {
        Employee.getCurrentUser((err, user) => {
            if (err) return HospitalView.errorView(err);

            if (type === 'employee') {
                if (user.position !== 'admin') {
                    return HospitalView.errorView('Only admin!');
                }

                Employee.findAll((err, data) => {
                    if (err) return HospitalView.errorView(err);
                    HospitalView.showEmployeeView(data);
                });
            }

            if (type === 'patient') {
                if (user.position !== 'dokter') {
                    return HospitalView.errorView('Only dokter!');
                }

                Patient.findAll((err, data) => {
                    if (err) return HospitalView.errorView(err);
                    HospitalView.showPatientView(data);
                });
            }
        });
    }

    static findPatientBy(key, value) {
        Employee.getCurrentUser((err) => {
            if (err) return HospitalView.errorView(err);

            Patient.findAll((err, data) => {
                if (err) return HospitalView.errorView(err);
    
                const found = data.filter(p => p[key] === value);
    
                HospitalView.findPatientView(found);
            });
        });
    }

    static help() {
        console.log(`
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>            
        `)
    }
}

module.exports = HospitalController;