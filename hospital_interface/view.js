class HospitalView {
  static registerView(objArr) {
    console.log(`save data success. Total employee : ${objArr[1]}`)
  }

    // lanjutkan method lain
    static help() {
    	console.log('===========================')
      console.log('HOSPITAL INTERFACE COMMAND')
      console.log('===========================')
      console.log('node index.js register <username> <password> <jabatan>')
      console.log('node index.js login <username> <password>')
      console.log('node index.js addPatient <id> <namaPasien> <penyakit1> <penyakit2> ....')
      console.log('node index.js updatePatient <id> <namaPasien> <penyakit1> <penyakit2> ....')
      console.log('node index.js deletePatient <id> <namaPasien> <penyakit1> <penyakit2> ....')
      console.log('node index.js logout')
      console.log('node index.js show <employee/patient> ')
      console.log('node index.js findPatientBy: <name/id> <namePatient/idPatient>')
    }

    static employeeView(arr) {
      console.log(arr)
    }

    static patientView(data) {
      console.log(data)
    }

    static login(data, name, password, err) {
      if ( err ) {
        console.log(err)
      } else {
        for ( let d of data ) {
          if(d.username == name && d.password == password) {
            console.log(`Login Succes as ${d.position}`)
          }
        }
      }
    }

    static addView(objArr) {
      console.log(`save data success`)   
    }

    static updateView(data) {
      console.log(`Update success ${data}`)
    }

    static deleteView(err) {
      err ? console.log(err) : console.log('Delete Data Success')
    }

    static ErrorView(err) {
      console.log('Failed to save data')
    }
  }


  module.exports = HospitalView;