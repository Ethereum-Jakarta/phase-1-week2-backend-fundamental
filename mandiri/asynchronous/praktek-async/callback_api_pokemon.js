import fetch from "node-fetch";

//fungi untuk mendapatkan data pokemn dengan callback
const getPokemonDataCallback = function (
    pokemonName, //Nama pokemon yang ingin diambil datanya
    callback, //Callback untuk menangani data berhasil
    callbackError, //Callback untuk menangani error
) {
    //Ambil data dari API pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            //misalnya kita ingin menambahkan beberapa data tambahan
            console.log(data)
            const pokemon = {
                id: data.id,
                name: data.name,
                types: data.types.map(typeInfo => typeInfo.type.name)
            }
            callback(pokemon)
        })
        .catch(error => {
            // Panggil callbackError jika terjadi error
            callbackError(error);
        })
}

//contoh penggunaan 
const handlePokemonData = (pokemon) => {
    console.log("Pokemon data:", pokemon)
}

const handleError = (error) => {
    console.error("Error fetching Pokemon data:", error)
}

//eksekusi fungsi dengan nama pokemon "pikachu"
getPokemonDataCallback("pikachu", handlePokemonData, handleError)