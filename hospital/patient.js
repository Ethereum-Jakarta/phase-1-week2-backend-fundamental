const fs = require("fs");

class Patient {
  constructor(id, nama, penyakit1, penyakit2) {
    this.id = id;
    this.nama = nama;
    this.penyakit1 = penyakit1;
    this.penyakit2 = penyakit2;
  }

  static addPatient(id, nama, penyakit1, penyakit2, callback) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      }
      let dataEmployee = data;
      let userLogin = dataEmployee.find((user) => user.login === true);
      if (!userLogin) {
        callback("silahkan login terlebih dahulu");
      }else if(userLogin.position.toLowerCase() !== "dokter") {
        callback("hanya dokter yang bisa menambah pasien");
      }else{
        this.findPatient((err, data) => {
          if (err) {
            console.log(err);
          }

          let dataPasien = data;
          let obj = new Patient(id, nama, penyakit1, penyakit2)
          dataPasien.push(obj)

          let objArr = []
          objArr.push(obj)
          objArr.push(dataPasien.length)

          fs.writeFile('./patient.json', JSON.stringify(dataPasien), (err) => {
            if(err){
                console.log(err)
            }else{
                callback(err, objArr)
            }
          })

        });
      }
    });
  }

  static updatePatient(id, nama, penyakit1, penyakit2, callback){
    this.findAll((err, data) => {
      if(err){
        console.log(err)
      }

      let dataEmployee = data
      let currentLogin = dataEmployee.find(user => user.login === true)
      if(!currentLogin){
        callback('silahkan login terlebih dahulu')
      }else if(currentLogin.position.toLowerCase() !== 'dokter'){
        callback('hanya dokter yang boleh memperbarui data pasien')
      }else{
        this.findPatient((err, data) => {
          if(err){
            console.log(err)
          }

          let dataPasien = data
          let targetPasien = dataPasien.find(user => user.id === id)
          if(!targetPasien){
            callback('tidak ada pasien dengan id tersebut')
          }else{
            targetPasien.nama = nama
            targetPasien.penyakit1 = penyakit1
            targetPasien.penyakit2 = penyakit2

            let newData = []
            newData.push(targetPasien)
            newData.push(dataPasien.length)

            fs.writeFile('./patient.json', JSON.stringify(dataPasien), err => {
              if(err){
                console.log(err)
              }else{
                callback(err, newData)
              }
            })
          }
        })
      }

    })
  }


  static deletePatient(id, nama, penyakit1, penyakit2, callback){
    this.findAll((err, data) => {
      if(err){
        console.log(err)
      }

      let dataEmployee = data
      let currentLogin = dataEmployee.find(user => user.login === true)
      if(!currentLogin){
        callback('silahkan login terlebih dahulu')
      }else if(currentLogin.position.toLowerCase() !== 'dokter'){
        callback('hanya dokter yang boleh menghapus data pasien')
      }else{
        this.findPatient((err, data) => {
          if(err){
            console.log(err)
          }

          let dataPasien = data
          let targetPasien = dataPasien.find(user => user.id === id && user.nama === nama)
          if(!targetPasien){
            callback('tidak ada pasien dengan data tersebut')
          }else{
            const newData = dataPasien.filter(user => user.id !== id)
            let dataTarget = []

            dataTarget.push(targetPasien)
            dataTarget.push(newData.length)

            fs.writeFile('./patient.json', JSON.stringify(newData), err => {
              if(err){
                console.log(err)
              }else{
                callback(err, dataTarget)
              }
            })
          }

        })
      } 
    })
  }

  static show(data, callback){
    this.findAll((err, value) => {
      if(err){
        console.log(err)
      }

      let dataEmployee = value
      let currentLogin = dataEmployee.find(user => user.login === true)
      if(currentLogin.position !== 'admin'){
        return callback('hanya admin yang boleh menggunakan command ini')
      }

      if(data === 'employee' || data === 'Employee'){
        this.findAll((err, value) => {
          if(err){
            console.log(err)
          }
  
          const dataEmployee = value
          callback(err, dataEmployee)
        })
      }else if(data === 'patient' || data === 'Patient'){
        this.findPatient((err, value) => {
          if(err){
            console.log(err)
          }
  
          const dataPasien = value
          callback(err, dataPasien)
        })
      }else{
        callback('tidak ada role tersebut')
      }

    })
    
  }

  static findPatientBy(type, searchBy, callback){
    this.findAll((err, data) => {
      if(err){
        console.log(err)
      }

      let dataEmployee = data
      let currentLogin = dataEmployee.find(user => user.login === true)
      if(!currentLogin){
        callback('silahkan login terlebih dahulu')
      }else if(currentLogin.position !== 'dokter'){
        callback('hanya dokter yang bisa melihat data pasien')
      }else{
        this.findPatient((err, value) => {
          if(err){
            console.log(err)
          }
          let dataPasien = value
          if(type === 'id'){
            let targetPasien = dataPasien.find(user => user.id === searchBy)
            callback(targetPasien)
          }else if(type === 'name'){
            let targetPasien = dataPasien.find(user => user.nama === searchBy)
            callback(targetPasien)
          }else{
            callback('tidak ditemukan pasien dengan keterangan tersebut')
          }
        })
      }
    })
  }

  static findPatient(callback) {
    fs.readFile("./patient.json", "utf-8", (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(err, JSON.parse(data));
      }
    });
  }

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        cb(err, JSON.parse(data));
      }
    });
  }
}

module.exports = Patient;
