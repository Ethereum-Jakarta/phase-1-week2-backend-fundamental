let fs = require("fs");

class Patient {
    constructor(id, name, disease) {
      this.id = id;
      this.name = name;
      this.disease = [...disease];
    }

    static addPatient(id, patientName, disease, cb) {
        this.findAll((err, data) => {
              if (err) {
                console.log(err);
              } else {
                
                this.deviceLogin((err, currentDevice) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let loginStatus = currentDevice.loginStatus;
                        if(loginStatus !== true) {
                            console.log("Kamu perlu login terlebih dahulu!");
                            return;
                        }    
                        
                        let role = currentDevice.currentUser.position;
                        if (role !== "dokter") {
                            console.log("Hanya dokter yang bisa mengakses perintah ini!");
                            return;
                        }
                        
                        for(const key of data) {
                            if(key.id == id){
                                console.log("id sudah terdaftar!")
                                return;
                            } 
                        }
        
                        // console.log(data)
                        let obj = new Patient(id, patientName, disease)
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
            });
    }

    static updatePatient(id, patientName, disease, cb) {
        this.findAll((err, data) => {
              if (err) {
                console.log(err);
              } else {
                
                this.deviceLogin((err, currentDevice) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let loginStatus = currentDevice.loginStatus;
                        if(loginStatus !== true) {
                            console.log("Kamu perlu login terlebih dahulu!");
                            return;
                        }    
                        
                        let role = currentDevice.currentUser.position;
                        if (role !== "dokter") {
                            console.log("Hanya dokter yang bisa mengakses perintah ini!");
                            return;
                        }
                        
                        let indexCurrent = null;
                        for(const key of data) {
                            if(key.id == id && key.name == patientName){
                                indexCurrent = data.indexOf(key);
                                break;
                            } 
                        }

                        if(indexCurrent === null) {
                            console.log("Data tidak ditemukan!");
                            return;
                        }
        
                        data[indexCurrent].disease = disease;
                
                        fs.writeFile("./patient.json", JSON.stringify(data), (err) => {
                          if (err) {
                            console.log(err);
                          } else {
                            // console.log(data[indexCurrent])
                            cb(err, data[indexCurrent]);
                          }
                        })

                    }
                })


              }
            });
    }

    static deletePatient(id, patientName, cb) {
        this.findAll((err, data) => {
              if (err) {
                console.log(err);
              } else {
                
                this.deviceLogin((err, currentDevice) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let loginStatus = currentDevice.loginStatus;
                        if(loginStatus !== true) {
                            console.log("Kamu perlu login terlebih dahulu!");
                            return;
                        }    
                        
                        let role = currentDevice.currentUser.position;
                        if (role !== "dokter") {
                            console.log("Hanya dokter yang bisa mengakses perintah ini!");
                            return;
                        }
                        
                        let indexCurrent = null;
                        for(const key of data) {
                            if(key.id == id && key.name == patientName){
                                indexCurrent = data.indexOf(key);
                                break;
                            } else if(key.id == id ){
                              indexCurrent = data.indexOf(key);
                              break;
                          } 
                        }

                        if(indexCurrent === null) {
                            console.log("Data tidak ditemukan!");
                            return;
                        }
                        let temp = data[indexCurrent];
                        let newData = data.filter((_, index) => index !== indexCurrent)
                
                        fs.writeFile("./patient.json", JSON.stringify(newData), (err) => {
                          if (err) {
                            console.log(err);
                          } else {
                            cb(err, temp);
                          }
                        })

                    }
                })


              }
            });
    }

    static showPatient(cb) {
      this.findAll((err, data) => {
            if (err) {
              console.log(err);
            } else {
              
              this.deviceLogin((err, currentDevice) => {
                  if (err) {
                      console.log(err);
                  } else {
                      let loginStatus = currentDevice.loginStatus;
                      if(loginStatus !== true) {
                          console.log("Kamu perlu login terlebih dahulu!");
                          return;
                      }    
                      
                      let role = currentDevice.currentUser.position;
                      if (role !== "dokter") {
                          console.log("Hanya dokter yang bisa mengakses perintah ini!");
                          return;
                      }
                      
                      cb(err, data)
                  }
              })


            }
          });
    }

    static findPatient(nameId, cb) {
      this.findAll((err, data) => {
            if (err) {
              console.log(err);
            } else {
              
              this.deviceLogin((err, currentDevice) => {
                  if (err) {
                      console.log(err);
                  } else {
                      let loginStatus = currentDevice.loginStatus;
                      if(loginStatus !== true) {
                          console.log("Kamu perlu login terlebih dahulu!");
                          return;
                      }    
                      
                      let role = currentDevice.currentUser.position;
                      if (role !== "dokter") {
                          console.log("Hanya dokter yang bisa mengakses perintah ini!");
                          return;
                      }

                      let indexCurrent = null;
                      for(const key of data) {
                          if(key.id == nameId){
                              indexCurrent = data.indexOf(key);
                              break;
                          } else if (key.name == nameId){
                              indexCurrent = data.indexOf(key);
                              break;
                          }
                      }
                      if (indexCurrent === null) {
                          console.log("Data tidak ditemukan!");
                          return;
                      }

                      let temp = data[indexCurrent];
                      
                      cb(err, temp)
                  }
              })


            }
          });
    }

    static deviceLogin(cb) {
        fs.readFile("./currentLogin.json", "utf8", (err, data) => {
          if(err) {
            cb(err)
          } else {
            cb(err, JSON.parse(data))
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