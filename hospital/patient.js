let fs = require("fs");

class Patient {
  constructor(id, nama, penyakit) {
    this.id = id
    this.nama = nama
    this.penyakit = penyakit
  }

  static addPatient(id, nama, penyakit, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let obj = new Patient(id, nama, penyakit)
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        })
      }
    });
  }

  // lanjutkan method lain

  static updatePatient(id, nama, penyakit, cb) {
    this.findAll((err,data) => {
      if(err){
        console.log(err)
      }else {
        let obj = new Patient(id, nama, penyakit);
        let newData = data
        let found = false
        
        for(let i = 0; i <= data.length-1; i++){
          if(data[i].id === id){
            newData.splice(i,1,obj)
            found = true;
            break;       
          }
        }

        if(found){
          fs.writeFile("./patient.json", JSON.stringify(data), (err) =>{
            if(err){
              console.log(err)
            }else{
              cb(err, newData)
            }
          })
        }
      }
    })
  }

  static deletePatient(id, nama, cb) {
   this.findAll((err,data) => {
      if(err){
        console.log(err)
      }else{

       let newData = data
        let found = false
      
       for(let i = 0; i <= data.length-1 ; i++){
         if(data[i].id === id && data[i].nama === nama){
            newData.splice(i,1)
            found = true;
            break;
         }
        }

       let objArr = []
       objArr.push(newData)
       objArr.push(newData.length)

        if(found){
         fs.writeFile("./patient.json", JSON.stringify(data), (err) =>{
           if(err){
            console.log(err)
           }else{
            cb(err, objArr)
            }
          })
        }
      }
    })
  }

  static showPatient(cb){
    this.findAll((err,data) =>{
      if(err){
        console.log(err)
      }else{
        cb(data)
      }
    })
  }

  static findPatient(id,nama,cb){
    this.findAll((err,data) => {
      if(err){
        console.log(err)
      }else{
        let patient = null
        for(let i = 0; i < data.length; i++){
          if(data[i].id == id && data[i].nama == nama){
            patient = data[i]
          }
        }
        cb(err,patient)
      }
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