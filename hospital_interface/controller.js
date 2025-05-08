let Patient = require("./patient");
let Employee = require("./employee")
let HospitalView = require("./view");

class HospitalController {
  static register(name, password, role, cb) {
    Employee.register(name, password, role, (err, objArr) => {
      if (err) {
        HospitalView.ErrorView(err);
      } else {
        HospitalView.registerView(objArr);
      }
    });
  }

  static login(name, password) {
    Employee.login(name, password, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        HospitalView.login(data, name, password, err)
      }
    })
  }

  static logout() {
    Employee.logout((err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Logout Succes')
      }
    })
  }

  // lanjutkan command yang lain
  static help() {
    HospitalView.help();
  }

  static show(arg, data) {
    if ( arg == 'employee' ) {
      Employee.findAll((err, obj) => {
        if ( err ) {
          HospitalView.err(err)
        } else {
          for ( let d of obj ) {
            if ( d.login == true && d.position == 'admin') {
              HospitalView.employeeView(obj)
            }
          }
        }
      })
    }

    if ( arg == 'patient' ) {
      Employee.findAll((err, obj) => {
        if ( err ) {
          console.log(err)
        } else {
          for ( let d of obj ) {
            if ( d.login == true && d.position == 'dokter' || d.login == true && d.position == 'admin' ) {
              Patient.findAll((err, data) => {
                if ( err ) {
                  console.log(err) 
                } else {
                  console.log(data)
                }
              })
            }
          }
        }
      }) 
    }
  }

  static addPatient(id, name, penyakit) {
    Employee.findAll((err, data) => {
      if ( err ) {
        console.log(err)
      } else {
        for( let d of data ) {
          if ( d.login == true && d.position == 'dokter' || d.login == true && d.position == 'admin' ) {
            Patient.add(id, name, penyakit, (err, data) => {
              if ( err ) {
                console.log(err)
              } else {
                HospitalView.addView(data)
              }
            })
          }
        }
      }
    })
  }

  static updatePatient(id, name, penyakit) {
    Employee.findAll((err, data) => {
      if ( err ) {
        console.log(err)
      } else {
        for ( let d of data ) {
          if ( d.login == true && d.position == 'dokter' || d.login == true && d.position == 'admin' ) {
            Patient.update(id, name, penyakit, (err, data) => {
              if ( err ) {
                console.log(err)
              } else {
                HospitalView.updateView(data)
              }
            })        
          }
        }
      }
    })
    
  }

  static deletePatient(arg) {
    Employee.findAll((err, data) => {
      if ( err ) {
        console.log(err)
      } else {
        for ( let d of data ) {
          if ( d.login == true && d.position == 'dokter' || d.login == true && d.position == 'admin' ) {
            Patient.delete(arg, (err, data) => {
              if ( err ) {
                console.log(err)
              } else {
                HospitalView.deleteView(err)
              }
            })        
          }
        }
      }
    })
    
  }

  static findPatient(arg) {
    Patient.find(arg)
  }
}


module.exports = HospitalController;