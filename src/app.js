import {register} from "./mvc/controller.js";

let command = process.argv[2];
let argument = process.argv.slice(3);
import * as HospitalMVC from './mvc/controller'

// HOSPITAL INTERFACE COMMAND
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id>
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>
*/

const help = `
register <username> <password> <jabatan> 
login <username> <password>
addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
deletePatient <id>
logout
show <employee/patient> 
findPatientBy: <name/id> <namePatient/idPatient>
`

if (typeof HospitalMVC[command] == "undefined") {
    console.log(help)
} else {
    console.log(JSON.stringify(HospitalMVC[command](...argument), null, 2));
}