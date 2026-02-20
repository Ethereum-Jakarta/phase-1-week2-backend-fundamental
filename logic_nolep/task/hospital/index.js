let command = process.argv[2];
let argument = process.argv.slice(3);
import HospitalController from "./controller.js";

// HOSPITAL INTERFACE COMMAND
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <patientName> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <patientName> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> 
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy <patientName/id>

NOTE :
1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
2. TIDAK BISA LOGIN BERSAMAAN.
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.

*/

const main = async () => {
    switch (command) {
        case "register":
            await HospitalController.register(argument[0], argument[1], argument[2]);
            break;
        
        // buatlah semua command
        case "login": 
            await HospitalController.login(argument[0], argument[1]);
            break;

        case "logout":
            await HospitalController.logout();
            break;

        case "addPatient":
            const [name, ...disease] = argument
            await HospitalController.addPatient(name, disease);
            break;
        
        case "updatePatient":
            const [id, newName, ...newDisease] = argument
            await HospitalController.updatePatient(id, newName, newDisease);
            break;

        case "deletePatient":
            await HospitalController.deletePatient(argument[0]);
            break;

        case "show":
            await HospitalController.show(argument[0]);
            break;
        
        case "findPatientBy":
            await HospitalController.findPatientBy(argument[0]);
            break;

        default:
            HospitalController.help();
            break;
    }
}

main()