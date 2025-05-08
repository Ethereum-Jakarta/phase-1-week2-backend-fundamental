const { count, error } = require("console");
let fs = require("fs/promises");

class Patient {
    constructor(id, name, disease){
        this.id = id
        this.name = name
        this.disease = disease
    }

    static async addPatient(id, namePatient, disease){
        try {
            const countData = await this.findAll()
            // const countDataEmploye = await this.findDataEmployee()

                    let obj = new Patient(id, namePatient, disease)

                     if (obj.id.length < 8){
                        console.log('Minimum ID 8 Number')
                    } else {
                        let newData = countData
                        newData.push(obj)
    
                        let objPatient = []
                        objPatient.push(obj)
                        objPatient.push(newData.length)
    
                        await fs.writeFile("./patient.json", JSON.stringify(newData))
                        return objPatient
                    }
        } catch(err){
            console.log(err.message)
        }
    }

    static async updatePatient(id, namePatient, disease){
        try {
          const countData = await this.findAll()

          const searchIndex = countData.findIndex((patient) =>{
            return patient.id === id && patient.name === namePatient
          })

          if (searchIndex !== -1){
            countData[searchIndex].disease = disease
            await fs.writeFile("./patient.json", JSON.stringify(countData))
            return countData[searchIndex]
          } else {
            console.log('Invalid ID OR NAME!')
          }

    } catch(err){
        console.log(err.message)
    }
}

static async deletePatient(id, namePatient){
    try {
        const countData = await this.findAll()
        let newData = countData

        for(let i = 0; i < countData.length; i++){
            if (countData[i].id === id && countData[i].name === namePatient){
                newData.splice(i, 1)
            }
        }
        await fs.writeFile("./patient.json", JSON.stringify(newData))
            return newData
    } catch(err){
        console.log(err.message)
    }
}

static async show(){
    try {
        const countData = await this.findAll()

        return countData
    } catch(err){
        console.log(err.message)
    }
}

static async findPatientBy(id, namePatient){
    try {
        const countData = await this.findAll()

        const findPatient = countData.find((patient) => {
            return patient.id === id && patient.name === namePatient || patient.id === namePatient && patient.name === id 
        })

         if (findPatient) {
            return findPatient
         } else {
            console.log('ID or Name Patient is Not Found')
         }
        
    } catch(err){
        console.log(err.message)
    }
}

static async findDataEmployee(){
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



    static async findAll(){
        try {
           const countDataJson = await fs.readFile("./patient.json", "utf8",(error) => {
                console.log(error)
    
            })
            const changeData = JSON.parse(countDataJson)
                return changeData
        } catch(err) {
            console.log(err.message)
        }
    }
}

module.exports = Patient