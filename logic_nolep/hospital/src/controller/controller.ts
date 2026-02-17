import Employee from "../models/employee.js";
import Patient from "../models/patient.js";
import HospitalView from "../view/view.js";

class HospitalController {
    static register(username: string, password: string, role: string) {
        Employee.register(username, password, role, (err, data) => {
            if (err) {
                return HospitalView.errorView(err.message)
            }

            if (data) {
                return HospitalView.registerView(data)
            }
        });
    }

    static login(username: string, password: string) {
        Employee.login(username, password, (err, data) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            if (data) {
                return HospitalView.loginView(data);
            }
        });
    }

    static logout() {
        Employee.logout((err) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            return HospitalView.logoutView();
        })
    }

    static addPatient(args: string[]) {
        Employee.getCurrentUser((err, data) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            const employees = data as Employee[];
            const user: Employee | undefined = employees.find(u => u.login === true);

            if (user?.position !== 'dokter') {
                return HospitalView.errorView('Only dokter can add Patient!');
            }

            const id = Number(args[0]);
            const username = args[1] || '';
            const disease = args.slice(2);

            Patient.add(id, username, disease, (err, data) => {
                if (err) {
                    return HospitalView.errorView(err.message);
                }

                if (data) {
                    return HospitalView.addPatientView(data);
                }
            });
        });
    }

    static updatePatient(args: string[]) {
        Employee.getCurrentUser((err, data) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            const employees = data as Employee[];
            const user: Employee | undefined = employees.find(u => u.login === true);

            if (user?.position !== 'dokter') {
                return HospitalView.errorView('Only dokter can update Patient!');
            }
            
            const id = Number(args[0]);
            const username = args[1] || '';
            const disease = args.slice(2);

            Patient.update(id, username, disease, (err, data) => {
                if (err) {
                    return HospitalView.errorView(err.message);
                }

                if (data) {
                    HospitalView.updatePatientView(data);
                }
            });
        });
    }

    static deletePatient(args: string[]): void {
        Employee.getCurrentUser((err, data) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            const employees = data as Employee[];
            const user: Employee | undefined = employees.find(u => u.login === true);

            if (user?.position !== 'dokter') {
                return HospitalView.errorView('Only dokter can delete Patient!');
            }
            
            const id = Number(args[0]);

            Patient.delete(id, (err, data) => {
                if (err) {
                    return HospitalView.errorView(err.message);
                }

                if (data) {
                    return HospitalView.deletePatientView(id);
                }
            });  
        });
    }

    static show(type: string): void {
        Employee.getCurrentUser((err, data) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            const employees = data as Employee[];
            const user: Employee | undefined = employees.find(u => u.login === true);

            if (type === 'employee') {
                if (user?.position !== 'admin') {
                    return HospitalView.errorView('Only admin can see list of employee!');
                }
                
                Employee.findAll((err, data) => {
                    if (err) {
                        return HospitalView.errorView(err.message);
                    }

                    if (data) {
                        return HospitalView.showEmployeeView(data);
                    }
                })
            }

            if (type === 'patient') {
                if (user?.position !== 'dokter') {
                    return HospitalView.errorView('Only dokter can see list of patient!');
                }
                 Patient.findAll((err, data) => {
                    if (err) {
                        return HospitalView.errorView(err.message);
                    }

                    if (data) {
                        return HospitalView.showPatientView(data);
                    }
                 });
            }
        });
    }

    static findPatientBy(key: string, value: string): void {
        Employee.getCurrentUser((err, data) => {
            if (err) {
                return HospitalView.errorView(err.message);
            }

            Patient.findAll((err, data) => {
                if (err) {
                    return HospitalView.errorView(err.message);
                }

                const patients = data || [];
                const found = patients.filter(p => {
                    const val = p[key as keyof Patient];

                    if (Array.isArray(val)) {
                        return val.includes(value);
                    }
                    return String(val) === value;
                });
                return HospitalView.findPatientView(found);
            }); 
        });
    }

    static help() {
        console.log(`
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id>
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <username/id> <namePatient/idPatient>            
            `)
    }
}

export default HospitalController;