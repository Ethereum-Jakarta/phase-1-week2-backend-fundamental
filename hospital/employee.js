const { error } = require("console");
let fs = require("fs/promises");
const HospitalView = require("./view");

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

static async register(username, password, position) {
    try {
        const countData = await this.findAll()

         let obj = new Employee(username, password, position)
         let newData = countData
         newData.push(obj)
        // countData.push(obj)

         let objArr = []
         objArr.push(obj)
         objArr.push(newData.length)

           await fs.writeFile("./employee.json", JSON.stringify(newData))
          return objArr
    } catch(err) {
        console.log(err.message)
    }
}

static async login(username, password){
    try{
        const countData = await this.findAll()

        let loginInformation = null;
        let anybodyLogin = false;

        for (let key of countData){
            if (key.login){
                anybodyLogin = true
                break
            }

            if (key.username === username && key.password !== password){
                console.log('INVALID PASSWORD!')
            }  else if (key.password === password && key.username !== username){
                console.log('INVALID USERNAME')
            } 

            if (key.username === username && key.password === password){
                key.login = true
                loginInformation = key
                break
                // console.log(loginInformation)
            }
        }

        if (anybodyLogin) {
            console.log('Someone is already login!');
            return null; 
        }

        if (loginInformation === null){
            console.log('YOU MUST Register!')
        }

        await fs.writeFile("./employee.json", JSON.stringify(countData))
        return loginInformation
    } catch(err){
        console.log(err.message)
    }
}

static async logout(){
    try {
        const countData = await this.findAll()

        let countLogout = false
       for (let key of countData){
        if (key.login === true){
           key.login = countLogout
        }
        await fs.writeFile("./employee.json", JSON.stringify(countData))
       return key
       }

    } catch(err) {
        console.log(err.message)
    }
}

static async show(){
    try {
        const countData = await this.findAll()

    let isAdminFound = false;

    for (let i = 0; i < countData.length; i++){
        if (countData[i].position === 'admin' || countData[i].position === 'Admin'){
            isAdminFound = true;
            return countData[i];
        }
    }

    if (!isAdminFound) {
        console.log('You are not admin! Only admin has access.');
    }

    } catch(err){
        console.log(err.message)
    }
}


static async validationPosition(){
    try {
        const countData = await this.findAll()

        for (let i = 0; i < countData.length; i++){
            if (countData[i].login === true){
                return countData[i]
            }
        }
        return null

    }catch(err){
        console.log(err.message)
    }
}

  // lanjutkan method lain

static async findAll(){
    try {
       const countDataJson = await fs.readFile("./employee.json", "utf8",(error) => {
            console.log(error)

        })
        const changeData = JSON.parse(countDataJson)
            return changeData
    } catch(err) {
        console.log(err.message)
    }
}
 
}



module.exports = Employee;