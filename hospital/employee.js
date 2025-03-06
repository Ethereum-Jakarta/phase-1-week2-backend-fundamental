let fs = require("fs");
const { log } = require("util");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

 

  static login(username, password, cb){
    this.findAll((err, data)=>{
        if(err){
            console.log(err);
        }else{
            
            const user = data.find((employee) => employee.username === username && employee.password === password);

            const login = data.find((employee) => employee.login === true);

            if(login){
                cb(`Already Login as ${login.username}, logout first`, null)
            }else{

                if (user) {
                    user.login = true; 
                    fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
                        if (err) {
                        console.log(err);
                        cb(err, null);
                        } else {
                        cb(null, user);
                        }
                });
                } else {
                    cb("Invalid username or password", null);
                }
                
            }

            

        }
    })

  }

  static logout(cb){
    this.findAll((err, data)=>{
        if(err){
            console.log(err);
        }else{
            const login = data.find((employee) => employee.login === true);


            if(login){
                
                    login.login = false; 
                    fs.writeFile("./employee.json", JSON.stringify(data), (err) => {
                        if (err) {
                        console.log(err);
                        cb(err, null);
                        } else {
                        cb(null, login);
                        }
                });
                
                
            }

        }
    })
  }

  static register(name, password, role, cb) {

    this.findAll((err, data) => {
      if (err) {
        console.log(err);
      } else {

        

        
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

  static showEmployee(cb){
    this.findAll((err,obj)=>{
      if(err){
        cb(err,null)
      }else{
        cb(null, obj)
      }
    })
  }

  // lanjutkan method lain

  static findAll(cb) {

    // if (!fs.existsSync("./employee.json")) {
    //     return cb(null, []);
    //   }

    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(err, JSON.parse(data));
        
      }
    })
  }
 

}



module.exports = Employee;