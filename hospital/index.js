let command = process.argv[2];
let argument = process.argv.slice(3);
let HospitalController = require('./MVC/controller');

// HOSPITAL INTERFACE COMMAND
/*
> node index.js register <username> <password> <jabatan> 
> node index.js login <username> <password>
> node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
> node index.js logout
> node index.js show <employee/patient> 
> node index.js findPatientBy: <name/id> <namePatient/idPatient>

NOTE :

1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
2. TIDAK BISA LOGIN BERSAMAAN.
3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.

*/

switch (command) {
  // Register
  case 'register':
    HospitalController.register(argument[0], argument[1], argument[2]);
    break;
  // Login
  case 'login':
    HospitalController.login(argument[0], argument[1]);
    break;
  // Menambahkan pasien
  case 'addPatient':
    HospitalController.addPatient(argument[0], argument[1], argument.slice(2));
    break;
  // Update pasien
  case 'updatePatient':
    HospitalController.updatePatient(
      argument[0],
      argument[1],
      argument.slice(2)
    );
    break;
  // Menghapus pasien
  case 'deletePatient':
    HospitalController.deletePatient(
      argument[0],
      argument[1],
      argument.slice(2)
    );
    break;
  // Logout
  case 'logout':
    HospitalController.logout();
    break;
  // Menampilkan pasien dan employee
  case 'show':
    HospitalController.show(argument[0]);
    break;
  // Mencari pasien dengan nama atau ID
  case 'findPatientBy':
    HospitalController.findPatientBy(argument[0], argument[1]);
    break;
  default:
    HospitalController.help();
    break;
}
