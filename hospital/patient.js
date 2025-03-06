let fs = require("fs");

class Patient {
  constructor(id, name, diseases) {
    this.id = id
    this.name = name
    this.diseases = diseases
  
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

  static findPatient(id, name, cb){
    this.findAll((err,obj)=>{
      if(err){
        cb(err)
      }else{
        let patient = null
        for (let i = 0; i < obj.length; i++) {
            if(obj[i].id == id && obj[i].name==name){
              patient = obj[i]
            }
          
        }
        cb(null, patient)
      }
    })
  }

  static addPatient(id, name, diseases, cb){
    this.findAll((err, data)=>{
      if(err){
        cb(err, null)
      }else{

        let obj = new Patient(id, name, diseases)
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
    })
  }

  static updatePatient(id, name, diseases, cb){
    this.findAll((err, data)=>{
      if(err){
        cb(err, null)
      }else{

        const user = data.find((patient)=>patient.id == id)

        
        if(user){
          user.name = name
          user.diseases = diseases

          fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
            if (err) {
              console.log(err);
              cb(err, null);
            } else {
              cb(null, user);
            }
          });

        }else {
          cb("Invalid data", null);
        }
          


      }
    })
  }

  static deletePatient(id, cb){
    this.findAll((err,data)=>{
      if(err){
        cb(err,null)
      }else{
        // const user = data.findIndex((patient)=>patient.id = id)

        // if(user > -1){
        //   data.splice(user,1)
        // }
        const newData = data.filter((patient) => patient.id !== id);

        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
            cb(err, null);
          } else {
            cb(null, newData);
          }
        });

      }
    })
  }

  static showPatient(cb){
    this.findAll((err,obj)=>{
      if(err){
        cb(err,null)
      }else{
        cb(null, obj)
      }
    })
  }

  


 

}



module.exports = Patient;