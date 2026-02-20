import fs from 'fs/promises'
import crypto from 'crypto'

class Patient {
    constructor(name, disease) {
        this.id = crypto.randomUUID()
        this.name = name
        this.disease = disease
    }

    static async addPatient(name, disease) {
        const data = await this.findAll()

        const patient = new Patient(name, disease)
        const newData = [...data, patient]
            
        await fs.writeFile('./patient.json', JSON.stringify(newData))
        
        return {
            id: patient.id,
            name: patient.name,
            disease: patient.disease
        } 
    }

    static async updatePatient(id, newName, newDisease) {
        const data = await this.findAll()

        const index = data.findIndex(p => p.id === id)
        if (index < 0) {
            throw new Error(`Pasien tidak ditemukan!`)
        }

        const selectedPatient = data[index]

        if (newName) {
            selectedPatient.name = newName 
        }

        if (newDisease) {
            selectedPatient.disease = newDisease
        }

        await fs.writeFile('./patient.json', JSON.stringify(data))

        return selectedPatient
    }

    static async deletePatient(id) {
        const data = await this.findAll()

        const index = data.findIndex(p => p.id === id)
        if (index < 0) {
            throw new Error(`Pasien tidak ditemukan!`)
        }

        const deletedPatient = data[index]
        data.splice(index, 1)

        await fs.writeFile('./patient.json', JSON.stringify(data))

        return deletedPatient
    }

    static async show() {
        return await this.findAll()
    }

    static async findPatientBy(input) {
        const data = await this.findAll()

        const patient = data.find(p => p.id === input || p.name === input)

        if (!patient) {
            throw new Error(`Pasien tidak ditemukan!`)
        }

        return patient
    }

    static async findAll() {
        try {
            const data = await fs.readFile('./patient.json', 'utf-8')
    
            return JSON.parse(data)
        } catch (error) {
            if (error) {
                await fs.writeFile('./patient.json', JSON.stringify([]))
                return []
            }
    
            throw error
        }
      }
}


export default Patient