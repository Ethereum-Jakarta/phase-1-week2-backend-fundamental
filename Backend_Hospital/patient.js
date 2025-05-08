let Employee = require("./employee");
const { error } = require("console");
let fs = require("fs");

class Patient{
    constructor(id, nama, penyakit){
        this.id = id;
        this.nama = nama;
        this.penyakit = penyakit;
    }

    static addPatient(id, nama, penyakit,cb){
        this.findAll((err, data) => {
            if(err){
                console.log(err);
            }
            else{
                let obj = new Patient(id, nama, penyakit)
                let newData = data;
                newData.push(obj);
                let receipt = obj;
                
                fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      cb(err, receipt);
                    }
                  })
            }
        })
        
    }

    static updatePatient(id, nama, penyakit,cb){
        this.findAll((err, data) => {
            if(err){
                console.log(err);
            }
            else{
              let newData = data;
              let index = 0
              let obj;
              for(let i = 0; i < data.length;i++){
                  if(data[i].id === id){
                    obj = new Patient(id, nama, penyakit);
                    index = i;
                    break;
                  }
                }
                newData.splice(index, 1, obj)

                fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    cb(err, obj);
                  }
                })
                
            }
        })
    }

    static deletePatient(id, nama, penyakit,cb){
      this.findAll((err, data) => {
        if(err){
          console.log(err);
      }
      else{
        let newData = data;
        let index = 0
        let obj;
        for(let i = 0; i < data.length;i++){
            if(data[i].id === id || data[i].username == nama){
              obj = data[i];
              index = i;
              break;
            }
          }
        newData.splice(index, 1)
        
        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, obj);
          }
        })
      }
      })
    }

    static show(cb){
      this.findAll((err, data) => {
        if(err){
          console.log(err);
        }
        else{
          let receipt = {};
          let temp;
          for(let i = 0; i < data.length; i++){
            receipt[data[i].nama] = {
              id: data[i].id,
              riwayat_penyakit: []
            }

            for(let j = 0; j < data[i].penyakit.length;j++){
              temp = data[i].penyakit;
              receipt[data[i].nama].riwayat_penyakit.push(temp[j])
            }
          }
          cb(receipt)
        }
      })
    }

    static findPatientBy(id, nama, cb){
      this.findAll((err, data) => {
        if(err){
          console.log(err);
        }
        else{
          let hasil = null
          for(let i = 0; i < data.length;i++){
            if(data[i].nama == nama && data[i].id == id){
              hasil = data[i]
            }
            else if(data[i].nama == id && data[i].id == nama){
              hasil = data[i]
            }
          }
          cb(err, hasil)
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