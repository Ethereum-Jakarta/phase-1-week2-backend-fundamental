import fs from 'fs';
import path from 'path';

type FetchCallback = (error: Error | null, data?: Patient[]) => void;
const filePath = path.resolve(process.cwd(), 'src', 'db', 'patient.json');

class Patient {
    id: number;
    username: string;
    disease: string[];

    constructor(id: number, username: string, disease: string[]) {
        this.id = id;
        this.username = username;
        this.disease = disease;
    }

    static findAll(cb: FetchCallback): void {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return cb(err);
            }

            try {
                cb(null, JSON.parse(data));
            } catch (err) {
                cb(new Error('File corrupt or invalid JSON format'));
            }
        });
    }

    static saveAll(data: Patient[], cb: FetchCallback): void {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, data);
        });
    }

    static add(id: number, username: string, disease: string[], cb: FetchCallback): void {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patientsData: Patient[] = data || [];

            const isExists: Patient | undefined = patientsData.find(p => p.id === id);
            if (isExists) {
                return cb(new Error('ID already exists!'));
            }

            const newPatient: Patient = new Patient(id, username, disease);
            patientsData.push(newPatient);

            this.saveAll(patientsData, (err) => {
                if (err) {
                    return cb(err);
                }
                cb(null, patientsData);
            });
        });
    }

    static update(id: number, username: string, disease: string[], cb: FetchCallback): void {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patientsData: Patient[] = data || [];
            const index = patientsData.findIndex(p => p.id === id);

            if (index === -1) {
                return cb(new Error(`Patient with ID ${id} not found `));
            }
            
            const target = patientsData[index];

            if (target) {
                target.username = username;
                target.disease = disease;

                this.saveAll(patientsData, (err) => {
                    if (err) {
                        return cb(err);
                    }
                    cb(null, [target]);
                });
            }
        });
    }

    static delete(id: number, cb: FetchCallback): void {
        this.findAll((err, data) => {
            if (err) {
                return cb(err);
            }

            const patientsData: Patient[] = data || [];
            const index = patientsData.filter(p => p.id !== id);

            if (index.length === patientsData.length) {
                return cb(new Error(`Patient with ID ${id} not found `));
            }
            
            this.saveAll(index, (err) => {
                if (err) {
                    return cb(err)
                } 
                cb(null, index);
            })
        })
    }
}

export default Patient;