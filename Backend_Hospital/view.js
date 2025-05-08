class HospitalView {
    static registerView(objArr) {
        console.log(`save data success {"username":${objArr[0].username},"password":${objArr[0].password},"role":${objArr[0].position}. Total employee : ${objArr[1]}`)
    }
    
    // lanjutkan method lain
    static loginView(data){
        console.log(`Login telah sukses, selamat datang ${data.position} ${data.username}`)
    }

    static loginChecked(){
        console.log("anda telah login")
    }

    static addPatientSuccess(receipt){
        console.log(`Pasien dengan nama ${receipt.nama} telah terdaftar dengan id ${receipt.id} dan riwayat penyakit ${receipt.penyakit}`)
    }

    static updatePatientSuccess(receipt){
        console.log(`Pasien dengan id ${receipt.id} telah diubah menjadi nama ${receipt.nama} dan riwayat penyakit ${receipt.penyakit}`)
    }

    static deletePatientSuccess(receipt){
        console.log(`Pasien dengan id ${receipt.id}, nama ${receipt.nama} dan riwayat penyakit ${receipt.penyakit} telah berhasil dihapus`)
    }

    static logoutView(logoutData){
        console.log(` ${logoutData.position} ${logoutData.username} anda telah keluar`)
    }

    static employeeShow(receipt){
        console.log(`Daftar Karyawan: \n${receipt}`)
    }

    static patientShow(receipt){
        console.log(`Daftar Pasien : ${receipt}`)
    }

    static findPatientView(data){
        if(data){
            console.log(data)
        }
        else{
            console.log("Data tidak ditemukan")
        }
    }

}


module.exports = HospitalView;