let fs = require("fs");

class Patient {
// login = this.login
  constructor(id, nama, penyakit) {
    this.id = id
    this.name = nama
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
  static updatePatient(id, nama, penyakit, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let index = -1
        for(let d=0;d<data.length;d++){
            if(data[d].id==id){
                index = d
            }
        }
        // console.log(index)
        if(index==-1){
            cb("Id tidak ditemukan")
        } else{
            data[index].name = nama
            data[index].penyakit = penyakit
            // console.log(data)
            fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
              if (err) {
                console.log(err);
              } else {
                cb(err, data[index]);
              }
            })
        }


      }
    });
  }
  static deletePatient(id, nama, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let index = -1
        for(let d=0;d<data.length;d++){
            if(data[d].id==id){
                index = d
                break
            }
        }
        // console.log(index)
        if(index==-1){
            cb("Id tidak ditemukan")
        } else{
            let spliced = data.splice(index,index)
            // console.log(data)
            fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
              if (err) {
                console.log(err);
              } else {
                cb(err, spliced);
              }
            })
        }


      }
    });
  }
  static findPatientBy(arg1, arg2, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        let index = -1
        if(arg1=="id"||arg1=="name"){
            for(let d=0;d<data.length;d++){
                if(arg1=="id"){
                    if(data[d].id==arg2){
                        index = d
                        break
                    }
                } else {
                    if(data[d].name==arg2){
                        index = d
                        break
                    }
                } 
            }
        } else {
            cb("Kode command tidak sesuai pilih 'id' atau 'name'")
        }
        // console.log(index)
        if(index==-1){
            cb(arg1+" tidak ditemukan")
        } else{
            cb(err,data[index])
        }


      }
    });
  }




  // lanjutkan method lain

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