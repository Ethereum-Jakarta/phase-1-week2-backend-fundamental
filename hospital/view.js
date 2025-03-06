class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }

    static ErrorView(err){
        console.log(`${err}`)
    }

    static forbiddenView(){
        console.log(`only admin have the power`)
    }

    static loginView(username, password){
        console.log(`login success {"username":${username},"password":${password}}`);
    }

    static addPatient(objArr){
        console.log(`add data patient success {"id":${objArr[0].id},"name":${objArr[0].name},"diseases":${objArr[0].diseases}. Total patient : ${objArr[1]}`)
    }

    static updatePatient(objArr){
        console.log('update data patient success: ', objArr);
        
    }

    static deletePatient(id){
        console.log('delete data patient success: ', id);
    }

    static logoutView(data){
        console.log(`logout as ${data.username}`);
    }

    static showPatient(data){
        console.log('patient: ', data);
        
    }

    static showEmployee(data){
        console.log('employee: ', data);
        
    }

    static findPatient(data){
        console.log('patient: ', data.id ," ", data.name, " ", data.diseases);
    }
    

    static helpView(){
        console.log(
            `
       
            // HOSPITAL INTERFACE COMMAND
            
            v node index.js register <username> <password> <jabatan> 
            v node index.js login <username> <password>
            v node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            v node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            v node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....
            v node index.js logout
            v node index.js show <employee/patient> 
            > node index.js findPatientBy: <name/id> <namePatient/idPatient>
            
            NOTE :
            
            1. HANYA DOKTER SAJA YANG BOLEH PAKAI COMMAND CRUD PATIENT.
            2. TIDAK BISA LOGIN BERSAMAAN.
            3. HANYA ADMIN SAJA YANG BISA MELIHAT SEMUA DATA EMPLOYEE.
            
            
            `
        )
    }
}


module.exports = HospitalView;