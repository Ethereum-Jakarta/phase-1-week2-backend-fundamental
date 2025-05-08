const fs = require('fs')

class Patient {
	constructor(id, nama, penyakit) {
		this.id = id;
		this.nama = nama;
		this.penyakit = penyakit
	}

	static add(id, nama, penyakit, cb) {
		this.findAll((err, data) => {
			if (err) {
				console.log(err)
			} else {
				let obj = new Patient(parseInt(id), nama, penyakit)
				let newData = data
				newData.push(obj)

				fs.writeFile('./patient.json', JSON.stringify(newData, null, 2), (err) => {
					if ( err ) {
						console.log(err)
					} else {
						cb(err, newData)
					}
				})
			}
		})
	}

	static update(id, name, penyakit, cb) {
		this.findAll((err, data) => {
			if ( err ) {
				console.log(err)
			} else {
				fs.readFile('./patient.json', 'utf-8', (err, data) => {
					if ( err ) {
						console.log(err)
					}

					const updatedData = JSON.parse(data)
					for ( let d of updatedData ) {
						if ( d.id == parseInt(id) ) {
							d.nama = name
							d.penyakit = penyakit
						}
					}

					fs.writeFile('./patient.json', JSON.stringify(updatedData, null, 2), (err, data) => {
						if (err) {
							console.log(err)
						} else {
							console.log('Update Success')
						}
					})
					
				})
			}
		})
	}

	static delete(arg, cb) {
		this.findAll((err, data) => {
			if ( err ) {
				console.log(err)
			} else {
				fs.readFile('./patient.json', 'utf-8', (err, data) => {
					if ( err ) {
						console.log(err)
					}

					const deleteData = JSON.parse(data)
					for ( let d of deleteData ) {
						if ( d.nama == arg || d.id == parseInt(arg) ) {
							delete d.id
							delete d.nama
							delete d.penyakit
						}
					}

					fs.writeFile('./patient.json', JSON.stringify(deleteData, null, 2), (err, data) => {
						if ( err ) {
							console.log(err)
						} else {
							cb(err, data)
						}
					})
				})
			}
		})
	}

	static find(arg, cb) {
		this.findAll((err, data) => {
			if ( err ) {
				console.log(err)
			} else {
				for ( let d of data ) {
					if ( d.nama == arg || d.id == parseInt(arg) ) {
						console.log(d)
					}
				}
			}
		})
	}

	static findAll(cb) {
		fs.readFile('./patient.json', 'utf-8', (err, data) => {
			if ( err ) {
				cb(err)
			} else {
				cb(err, JSON.parse(data))
			}
		})
	}
}

module.exports = Patient