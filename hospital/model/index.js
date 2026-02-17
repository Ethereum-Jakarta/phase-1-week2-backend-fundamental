import fs from "fs"

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
                let obj = new Employee(name, password, role)
                let newData = data;
                newData.push(obj);
                let objArr = [];

                objArr.push(obj);
                objArr.push(newData.length);
                fs.writeFile("./data/employee.json", JSON.stringify(newData), (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        cb(err, objArr);
                    }
                })
            }
        });
    }

    // lanjutkan method lain
    static login = (name, password, cb) => {
        this.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (!dataLogin.login) {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const loginData = new Employee(name, password)
                            const response = data

                            if (
                                loginData.username === (
                                    response.find(res => res.username === loginData.username) &&
                                    response.find(res => res.username === loginData.username).username
                                ) &&
                                loginData.password === (
                                    response.find(res => res.password === loginData.password) &&
                                    response.find(res => res.password === loginData.password).password
                                )
                            ) {
                                const userLogin = response.find(res => res.username === loginData.username)

                                if (userLogin) {
                                    userLogin.login = true
                                }

                                fs.writeFile("./data/employee.json", JSON.stringify(response), (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        cb(err, userLogin)
                                    }
                                })
                            } else {
                                cb(err, "Invalid Username or Password. Please try again!")
                            }
                        }
                    })
                } else {
                    cb('', "Multiple simultaneous logins with the other account are not allowed for security reasons. Please log out before logging in again.")
                }
            }
        })
    }

    static getUserLogin = (cb) => {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                const response = data
                const userLogin = response.find(res => res.login)
                if (userLogin) {
                    cb(err, userLogin)
                } else {
                    cb(err, "Please login first!")
                }
            }
        })
    }

    static logout = (cb) => {
        this.findAll((err, data) => {
            if (err) {
                console.log(err);
            } else {
                const response = data
                const userLogin = response.find(res => res.login)

                if (userLogin) {
                    userLogin.login = false

                    fs.writeFile("./data/employee.json", JSON.stringify(response), (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            cb(err, userLogin)
                        }
                    })
                } else {
                    cb(err, "Logout failed. You are not logged in.")
                }

            }
        })
    }

    static showEmployee = (cb) => {
        this.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (dataLogin.login && dataLogin.position.toLowerCase() === 'admin') {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const response = data

                            cb(err, response)
                        }
                    })
                } else {
                    cb('', "You don't have access.")
                }
            }
        })

    }

    static findAll(cb) {
        fs.readFile("./data/employee.json", "utf8", (err, data) => {
            if (err) {
                cb(err)
            } else {
                cb(err, JSON.parse(data));
            }
        })
    }


}

class Patient {
    constructor(id, name, disease1, disease2) {
        this.id = id
        this.name = name
        this.disease1 = disease1
        this.disease2 = disease2
    }

    static addPatient = (id, name, disease1, disease2, cb) => {
        Employee.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (dataLogin.position.login) {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const createData = new Patient(id, name, disease1, disease2)
                            const response = data;

                            if (createData.id !== (
                                response.find(res => res.id === createData.id) &&
                                response.find(res => res.id === createData.id).id)
                            ) {
                                response.push(createData);
                                let objArr = [];

                                objArr.push(createData);
                                objArr.push(response.length);
                                fs.writeFile("./data/patient.json", JSON.stringify(response), (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        cb(err, objArr);
                                    }
                                })
                            } else {
                                cb(err, "Id exist. Id must be unique")
                            }
                        }
                    })
                } else {
                    cb('', 'Please login first!')
                }
            }
        })
    }

    static updatePatient = (id, name, disease1, disease2, cb) => {
        Employee.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (dataLogin.login) {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const updateData = new Patient(id, name, disease1, disease2)
                            const response = data

                            if (
                                updateData.id === (
                                    response.find(res => res.id === updateData.id) &&
                                    response.find(res => res.id === updateData.id).id
                                )
                            ) {
                                const patient = response.find(res => res.id === updateData.id)

                                if (patient) {
                                    patient.name = updateData.name
                                    patient.disease1 = updateData.disease1
                                    patient.disease2 = updateData.disease2
                                }

                                fs.writeFile("./data/patient.json", JSON.stringify(response), (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        cb(err, patient)
                                    }
                                })
                            } else {
                                cb(err, "Invalid Id. Please try again!")
                            }
                        }
                    })
                } else {
                    cb('', 'Please login first!')
                }
            }
        })
    }

    static deletePatient = (id, name, disease1, disease2, cb) => {
        Employee.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (dataLogin.login) {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const deleteData = new Patient(id, name, disease1, disease2)
                            const response = data

                            if (
                                deleteData.id === (
                                    response.find(res => res.id === deleteData.id) &&
                                    response.find(res => res.id === deleteData.id).id
                                )
                            ) {
                                const patient = response.filter(res => res.id !== deleteData.id)

                                fs.writeFile("./data/patient.json", JSON.stringify(patient), (err) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        cb(err, patient)
                                    }
                                })
                            } else {
                                cb(err, "Invalid Id. Please try again!")
                            }
                        }
                    })
                } else {
                    cb('', 'Please login first!')
                }
            }
        })
    }

    static showPatient = (cb) => {
        Employee.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (dataLogin.login) {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const response = data

                            cb(err, response)
                        }
                    })
                } else {
                    cb('', 'Please login first!')
                }
            }
        })
    }

    static findPatientBy = (type, key, cb) => {
        Employee.getUserLogin((errDataLogin, dataLogin) => {
            if (errDataLogin) {
                console.log(errDataLogin);
            } else {
                if (dataLogin.login) {
                    this.findAll((err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const response = data

                            switch (type) {
                                case 'id':
                                    const findById = response.filter(res => res.id === key)
                                    if (findById) {
                                        cb(err, findById)
                                    } else {
                                        cb(err, "Id not found.")
                                    }
                                    break;
                                case 'name':
                                    const findByName = response.filter(res => res.name.toLowerCase() === key)
                                    if (findByName) {
                                        cb(err, findByName)
                                    } else {
                                        cb(err, "Name not found.")
                                    }
                                    break;
                                default:
                                    cb(err, "Invalid type. Expected id/name")
                                    break;
                            }
                        }
                    })
                } else {
                    cb('', 'Please login first!')
                }
            }
        })
    }

    static findAll = (cb) => {
        fs.readFile("./data/patient.json", "utf8", (err, data) => {
            if (err) {
                cb(err)
            } else {
                cb(err, JSON.parse(data));
            }
        })
    }
}

export { Employee, Patient }