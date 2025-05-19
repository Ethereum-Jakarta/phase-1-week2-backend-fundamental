const fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id
    this.name = name
    this.diseases = diseases
  }

  static addPatient(id, name, diseases){
    return new Promise ((resolve, reject) => {
      this.findAll((err, data) => {
        if (err){
          console.log(err)
        } else {
          const duplicate = data.find(e => e.id === id)

          if(duplicate){
            return reject("Can't add patient : Id must be different to other")
          }

          let obj = new Patient(id, name, diseases)
          let objArr = []
          let newData = data;
          
          newData.push(obj)

          objArr.push(obj)
          objArr.push(newData.length)
          
          fs.writeFile("./patient.json", JSON.stringify(newData, null, 2), (err) => {
            if (err) {
              console.log(err)
            } else {
              resolve(objArr)
            }
          })

        }
      })
    })
  }

  static updatePatient(name, diseases) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err)
        }else {
          const foundPatient = data.find(e => e.name === name)

          if(!foundPatient){
            return reject("Can't update patient : Invalid name")
          }

          foundPatient.diseases = [...diseases]

          fs.writeFile("./patient.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
              console.log(err)
            } else {
              resolve(foundPatient)
            }
          })
        }
      })
    })
  }

  static deletePatient(id){
    return new Promise ((resolve, reject) => {
      this.findAll((err, data) => {
        if(err) {
          console.log(err)
        }else {
          const patient = data.find(e => e.id === id)

          if(!patient) {
            return reject("Can't delete patient : Invalid id")
          }

          const newPatient = data.filter(e => e.id !== id)

          fs.writeFile("./patient.json", JSON.stringify(newPatient, null, 2), (err) => {
            if (err) {
              console.log(err)
            } else {
              resolve(patient)
            }
          })
        }
      })
    })
  }

  static show() {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          reject(err)
        }else {
          resolve(data)
        }
      }) 
    })
  }

  static findPatientBy(option, input) {
    return new Promise((resolve, reject) => {
      this.findAll((err, data) => {
        if (err) {
          console.log(err)
        }else {
          const findBy = data.find(e => e.name === input || e.id === input)

          if(option === "name"){
            if(!findBy) {
              return reject(" Can't find patient name")
            }
            resolve(findBy)
          } else {
            if(!findBy) {
              return reject(" Can't find patient id")
            }
            resolve(findBy)
          }
        }
      }) 
    })
  }

  static findAll(cb) {
    fs.readFile("./patient.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
  }
}

 module.exports = Patient;

