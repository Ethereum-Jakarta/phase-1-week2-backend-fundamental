let fs = require("fs");


class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static register(name, password, role, cb) {
    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(data)
        let obj = new Employee(name, password, role)
        let newData = data;
        newData.push(obj);
        let objArr = [];

        objArr.push(obj);
        objArr.push(newData.length);

        fs.writeFile("./employee.json", JSON.stringify(newData), (err) => {
          if (err) {
            console.log(err);
          } else {
            cb(err, objArr);
          }
        })
      }
    });
  }


  static login(name, password, cb, cb2) {
    this.findAll((err, data) => {
      if(err) {
        console.log(err);
      } else {

        this.deviceLogin((err, currentDevice) => {
          if(err) {
            console.log(err);
          } else {
            
            if (currentDevice.loginStatus === true) {
              cb2(currentDevice.currentUser.username);
            } else {
              // console.log(currentDevice)
              
              for(const current of data) {
                if (current.username === name && current.password === password) {
                  current.login = true;
                  currentDevice.loginStatus = true;
                  currentDevice.currentUser = current;

                  
                  // console.log(data);
        
                  fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      cb(err, current);
                    }
                  })
                }
              }
              fs.writeFile("./currentLogin.json", JSON.stringify(currentDevice), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          }
        })
      }
    });
  }

  static logout(cb) {
    this.deviceLogin((err, currentDevice) => {
      if (err) {
        console.log(err);
      } else {

        if(currentDevice.loginStatus !== true){
          console.log("Kamu perlu login terlebih dahulu!");
        } else {
          
          this.findAll((err, data) => {
            if(err) {
              console.log(err);
            } else {
              // console.log(currentDevice.currentUser.username)

              for(const current of data) {
                // console.log(current.username)
                if (
                  current.username === currentDevice.currentUser.username && 
                  current.password === currentDevice.currentUser.password
                ) {
                  
                  current.login = false;
                  currentDevice.loginStatus = false;
                  currentDevice.currentUser = null;

                  fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      cb(err, current);
                    }
                  })

                  fs.writeFile("./currentLogin.json", JSON.stringify(currentDevice), (err) => {
                    if (err) {
                      console.log(err);
                    }
                  });
                  break;
                }
              }
              
            }
          })
          

        }
      }
    })
  }

  static showEmployee(cb) {
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
                    if (role !== "admin") {
                        console.log("Hanya admin yang bisa mengakses perintah ini!");
                        return;
                    }
                    
                    cb(err, data)
                }
            })


          }
        });
}

  static findAll(cb) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
      }
    })
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

}



module.exports = Employee;