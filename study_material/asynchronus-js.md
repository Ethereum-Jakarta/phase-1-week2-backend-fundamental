# Asynchronous Javascript
Selama ini code kalian berjalan synchronous (berurutan), kita akan belajar senjata powerful JS yaitu Asynchronous.

## Asynchronous JavaScript

![image](https://github.com/user-attachments/assets/8e70ee5d-2a75-40d9-adaa-102bd7489084)

JavaScript adalah bahasa pemrograman yang berjalan di lingkungan satu utas (single-threaded), yang berarti ia hanya dapat melakukan satu tugas pada suatu waktu. Namun, JavaScript memiliki dukungan untuk operasi asynchronous yang memungkinkan eksekusi tugas lain tanpa menghentikan jalannya program utama. Operasi asynchronous sangat penting dalam pengembangan web modern, terutama ketika berhadapan dengan operasi jaringan, I/O, dan tugas yang membutuhkan waktu lama.

1. **Synchronous vs. Asynchronous**

**Synchronous (Blocking)**:
Dalam operasi synchronous, setiap tugas dieksekusi satu per satu secara berurutan. Ketika suatu tugas sedang berjalan, program akan terhenti dan tidak dapat melanjutkan ke tugas berikutnya hingga tugas saat ini selesai.
```js
Contoh:
console.log('1');
console.log('2');
console.log('3');
```
Output: 1, 2, 3 (dieksekusi berurutan)

**Asynchronous (Non-Blocking)**:
Dalam operasi asynchronous, tugas-tugas yang membutuhkan waktu lama atau bergantung pada eksternal seperti jaringan atau berkas, dieksekusi secara terpisah. Program utama tetap berjalan tanpa harus menunggu tugas tersebut selesai.

Contoh:
```js
console.log('1');
setTimeout(() => {
  console.log('2');
}, 1000);
console.log('3');
```
Output: 1, 3, 2 (2 ditunda selama 1 detik)

<br/>

## Perbandingan Callbacks, Promise, dan Async & Await

### 1. **Callbacks**:

![image](https://github.com/user-attachments/assets/b44c9b0a-9afb-4f67-88d8-62244d1d7d40)

Callback adalah sebuah fungsi yang dilewatkan sebagai argumen ke dalam fungsi lain dan dijalankan setelah fungsi tersebut selesai. Saat menulis panggilan balik (Callback), kita akan mendapatkan serangkaian panggilan bersarang. Hal ini mudah dilihat ketika kita melihat kode di bawah ini karena semuanya cenderung mengarah ke kanan. Pergeseran ini juga dikenal sebagai "Piramida Kehancuran".

Contoh dengan API Pokemon dan Callback:

```js
const fetch = require('node-fetch');

// Fungsi untuk mendapatkan data Pokémon dengan callback
const getPokemonDataCallback = function(
  pokemonName, // Nama Pokémon yang ingin diambil datanya
  callback,    // Callback untuk menangani data berhasil
  callbackError // Callback untuk menangani error
) {
  // Ambil data dari API Pokémon
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Misalnya kita ingin menambahkan beberapa data tambahan (contoh: jenis Pokémon)
      const pokemon = {
        id: data.id,
        name: data.name,
        types: data.types.map(typeInfo => typeInfo.type.name)
      };

      // Panggil callback dengan data Pokémon
      callback(pokemon);
    })
    .catch(error => {
      // Panggil callbackError jika terjadi error
      callbackError(error);
    });
};

// Contoh penggunaan
const handlePokemonData = (pokemon) => {
  console.log('Pokemon data:', pokemon);
};

const handleError = (error) => {
  console.error('Error fetching Pokémon data:', error);
};

// Eksekusi fungsi dengan nama Pokémon 'pikachu'
getPokemonDataCallback('pikachu', handlePokemonData, handleError);

```

**Penjelasan:**
  1. **`getPokemonDataCallback(pokemonName, callback, callbackError)`**:
     - Mengambil data Pokémon berdasarkan nama dari API menggunakan `fetch`.
     - Menyusun data Pokémon ke dalam objek dengan ID, nama, dan jenis Pokémon.
     - Memanggil `callback` dengan data Pokémon jika berhasil.
     - Memanggil `callbackError` jika terjadi kesalahan.
    
  2. **`handlePokemonData(pokemon)`**:
     - Callback untuk menangani data yang berhasil diambil dari API.
     - Mencetak data Pokémon ke konsol.
    
  3. **`handleError(error)`**:
     - Callback untuk menangani error jika terjadi kesalahan dalam permintaan.
    
  4. **Eksekusi**:
     - Memanggil getPokemonDataCallback dengan nama Pokémon 'pikachu' dan menangani data serta error sesuai dengan callback yang diberikan.


### 2. **Promises**:

![image](https://github.com/user-attachments/assets/0c776ca6-c232-44de-9b1e-f4a8bbeead94)

Promises adalah pola yang lebih modern untuk mengelola operasi asynchronous. Sebuah Promise merepresentasikan nilai yang mungkin tersedia sekarang, nanti, atau tidak sama sekali. Promise memiliki tiga status: pending, fulfilled, atau rejected. Ini berbeda dengan teknik allback di mana setiap panggilan dilakukan satu per satu. Promise.all memungkinkan Anda mengambil data hero dan menggunakannya untuk membuat dua panggilan: satu untuk pesanan dan satu untuk perwakilan akun. Ketika keduanya telah memberikan respons, kode tersebut beralih ke then berikutnya.

Contoh dengan API Pokémon dan Promises:
```js
const fetch = require('node-fetch');

// Fungsi untuk mendapatkan data Pokémon dengan Promises
const getPokemonDataPromise = function(pokemonName) {
  let pokemon;

  // Level 1 - Ambil data Pokémon dasar
  return (
    getPokemonBaseData(pokemonName)
      // Level 2 - Set Pokémon dasar dan lanjutkan
      .then((p) => {
        pokemon = p;
        return p;
      })
      // Level 3 - Ambil tipe dan statistik Pokémon
      .then((pokemon) => Promise.all([getPokemonTypes(pokemon), getPokemonStats(pokemon)]))
      // Gabungkan data tipe dan statistik ke dalam objek Pokémon
      .then((result) => mergeData(result))
  );

  function getPokemonBaseData(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  function getPokemonTypes(pokemon) {
    return fetch(pokemon.types[0].type.url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  function getPokemonStats(pokemon) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  }

  function mergeData(result) {
    const [types, stats] = result;
    if (types) {
      pokemon.types = types;
    }
    if (stats) {
      pokemon.stats = stats;
    }
    return pokemon;
  }
};

// Contoh penggunaan
getPokemonDataPromise('pikachu')
  .then((pokemon) => {
    console.log('Pokemon data:', pokemon);
  })
  .catch((error) => {
    console.error('Error fetching Pokémon data:', error);
  });

```

*** Penjelasan** 

  1. getPokemonDataPromise(pokemonName):
    - Mengambil data Pokémon berdasarkan nama menggunakan getPokemonBaseData.
    - Mengambil data tipe dan statistik Pokémon secara bersamaan menggunakan Promise.all.
    - Menggabungkan data tipe dan statistik ke dalam objek Pokémon dengan mergeData.

  2. getPokemonBaseData(name):
    - Mengambil data dasar Pokémon (misalnya ID dan nama) dari API.
  
  3. getPokemonTypes(pokemon):
    - Mengambil data tipe Pokémon dari API menggunakan URL tipe yang diperoleh dari data dasar.

  4. getPokemonStats(pokemon):
    - Mengambil data statistik Pokémon dari API menggunakan ID Pokémon.

  5. mergeData(result):
    - Menggabungkan data tipe dan statistik ke dalam objek Pokémon.

  6. Contoh Penggunaan:
    - Mengambil data Pokémon untuk 'pikachu' dan menangani hasil atau error.


### 3. **Async/Await**:

![image](https://github.com/user-attachments/assets/2bc19aeb-c073-4bc5-9bf2-74fd830ba89a)

Async/Await adalah pendekatan modern yang memungkinkan penulisan kode asynchronous dengan gaya yang mirip dengan kode synchronous. Ini berdasarkan Promise.

Contoh dengan API Pokemon dan Async&Await:
```JS
const axios = require('axios');

const apiUrl = 'https://pokeapi.co/api/v2'; // URL dasar API Pokémon

// Mengambil data Pokémon dasar
const getPokemonAsync = async function(pokemonName) {
  try {
    const response = await axios.get(`${apiUrl}/pokemon/${pokemonName}`);
    return response.data;
  } catch (error) {
    handleAxiosErrors(error, 'Pokemon');
  }
};

// Mengambil data tipe Pokémon
const getPokemonTypesAsync = async function(pokemon) {
  try {
    // Mengambil tipe Pokémon dari data dasar
    const types = await Promise.all(
      pokemon.types.map(async (typeInfo) => {
        const response = await axios.get(typeInfo.type.url);
        return response.data;
      })
    );
    return types;
  } catch (error) {
    handleAxiosErrors(error, 'Types');
  }
};

// Mengambil statistik Pokémon
const getPokemonStatsAsync = async function(pokemon) {
  try {
    // Mengambil statistik Pokémon dari data dasar
    const response = await axios.get(`${apiUrl}/pokemon/${pokemon.id}`);
    return response.data.stats;
  } catch (error) {
    handleAxiosErrors(error, 'Stats');
  }
};

// Fungsi untuk menangani kesalahan dari axios
function handleAxiosErrors(error, context) {
  console.error(`Error fetching ${context}:`, error);
}

// Fungsi utama untuk mengambil data Pokémon lengkap
const getPokemonDataAsync = async function(pokemonName) {
  try {
    const pokemon = await getPokemonAsync(pokemonName);
    const types = await getPokemonTypesAsync(pokemon);
    const stats = await getPokemonStatsAsync(pokemon);
    // Gabungkan data
    return {
      ...pokemon,
      types,
      stats
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

// Contoh penggunaan
getPokemonDataAsync('pikachu')
  .then((pokemon) => {
    console.log('Pokemon data:', pokemon);
  })
  .catch((error) => {
    console.error('Error fetching Pokémon data:', error);
  });
```

**Penjelasan**
  1. getPokemonAsync(pokemonName):
    - Mengambil data dasar Pokémon berdasarkan nama.
     
  3. getPokemonTypesAsync(pokemon):
    - Mengambil data tipe Pokémon menggunakan URL tipe yang terdapat dalam data Pokémon.
     
  4. getPokemonStatsAsync(pokemon):
    - Mengambil statistik Pokémon menggunakan ID Pokémon dari data dasar.
     
  5. handleAxiosErrors(error, context):
    - Menangani kesalahan dari axios dengan mencetak pesan kesalahan.
     
  6. getPokemonDataAsync(pokemonName):
    - Mengambil data lengkap Pokémon dengan memanggil fungsi-fungsi sebelumnya dan menggabungkan data.

  7. Contoh Penggunaan:
    - Mengambil data Pokémon untuk 'pikachu' dan mencetak hasilnya.


## Bonus

**Set Timeout Function**:

setTimeout adalah sebuah fungsi dalam JavaScript yang digunakan untuk menunda eksekusi suatu fungsi atau blok kode selama waktu tertentu. Fungsi ini sering digunakan untuk mensimulasikan operasi yang memakan waktu seperti mengambil data dari server, melakukan tugas berat, atau menjalankan suatu tugas setelah beberapa saat.

Pada dasarnya, setTimeout menerima dua argumen:
Fungsi atau kode yang akan dieksekusi setelah waktu tertentu.
Waktu (dalam milidetik) sebagai waktu penundaan sebelum eksekusi.

Contoh penggunaan setTimeout:
```JS
setTimeout(() => {
  console.log('This code will be executed after 1000 milliseconds (1 second).');
}, 1000);
```


Dalam konteks tugas yang diberikan, setTimeout digunakan untuk mensimulasikan pengambilan data dari server atau operasi lain yang memerlukan waktu. Ini memungkinkan kita untuk menggambarkan penggunaan pendekatan asynchronous dalam JavaScript, di mana kita dapat melanjutkan eksekusi kode lain sementara menunggu operasi selesai. 

Operasi asynchronous sangat penting dalam lingkungan JavaScript, terutama dalam pengembangan aplikasi web yang cenderung berkomunikasi dengan server, melakukan I/O, dan menjalankan tugas yang memakan waktu. Penggunaan pendekatan asynchronous memastikan bahwa aplikasi tetap responsif dan tidak terjebak dalam blok yang menghambat jalannya program.
