import fs from 'fs/promises'

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.login = false;
  }

  static async register(username, password, role) {
    const data = await this.findAll()

    const activeUser = data.find(u => u.login === true) 
    if (activeUser) {
        throw new Error(`Logout dahulu sebelum register!`)
    }

    if (role !== 'dokter' && role !== 'admin') {
        throw new Error(`Role harus dokter atau admin!`)
    }

    const existingUser = data.find(u => u.username === username)
    if (existingUser) {
      throw new Error(`Username sudah terdaftar!`)
    }

    const user = new Employee(username, password, role)
    const newData = [...data, user]
    
    await fs.writeFile('./employee.json', JSON.stringify(newData))

    return { 
      username: user.username, 
      password: user.password, 
      role: user.position, 
      total: newData.length 
    }
  }

  // lanjutkan method lain
  static async isUserLoggedIn() {
    const data = await this.findAll()
    return data.find(u => u.login === true)
  }

  static async login(username, password) {
    const data = await this.findAll()

    const activeUser = await this.isUserLoggedIn()
    if (activeUser) {
        throw new Error(`${activeUser.username} sedang login! Logout dahulu...`)
    }

    const user = data.find(u => u.username === username && u.password === password)

    if (!user) {
        throw new Error(`Username atau password salah!`)
    }

    user.login = true
    await fs.writeFile('./employee.json', JSON.stringify(data))

    return user
  }

  static async logout() {
    const data = await this.findAll()

    const user = data.find(u => u.login === true)
    if (!user) {
        throw new Error(`Tidak sedang login di akun manapun`)
    }

    user.login = false
    await fs.writeFile('./employee.json', JSON.stringify(data))

    return user
  }

  static async show() {
    return await this.findAll()
  }

  static async findAll() {
    try {
        const data = await fs.readFile('./employee.json', 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        if (error) {
            await fs.writeFile('./employee.json', JSON.stringify([]))
            return []
        }

        throw error
    }
  }
}

export default Employee