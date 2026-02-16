const util = require('util');
const fs = require('fs');

//convert callback function to promise
const readFileAsync = util.promisify(fs.readFile);

//modern async/await pattern
async function processFile(params) {
    try {
        const data = await readFileAsync('data.text', "utf8");
        console.log(util.inspect(data, { depth: null })); // debug
    }
    catch (error) {
        console.error(util.format('Error: %s', error.message));
    }
}

/*
Fungsi	            Tujuan	                                Relevansi
util.format()	    Format teks/log seperti printf	        Mirip console.log, tapi bisa custom format
util.inspect()	    Debug object kompleks	                Menampilkan isi objek yang dalam atau nested
util.promisify()	Mengubah fungsi callback ke Promise	    Supaya bisa pakai async/await
util.types	        Pengecekan tipe khusus	                Untuk deteksi objek tertentu, misal Date atau RegExp
*/



