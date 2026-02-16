import fetch from "node-fetch";

//fungsi untuk mendapatkan data pokemon dengan promises
const getPokemonDataPromise = function (pokemonName) {
    let pokemon;

    //level 1 - Ambil data pokemon dasar
    return (
        getPokemonBaseData(pokemonName)
            //level2 - Set pokemon dasar dan lanjutkan
            .then((p) => {
                pokemon = p;
                return p;
            })
            //level 3 - Ambil tipe dan statistik Pokemon
            .then((pokemon) => Promise.all([getPokemonTypes(pokemon), getPokemonStats(pokemon)]))
            //gabungkan data tipe dan statistik ke dalam objek Pokemon
            .then((result) => mergeData(result))
    );

    function getPokemonBaseData(name) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was no ok")
                }
                return response.json();
            })
    }

    function getPokemonTypes(pokemon) {
        return fetch(pokemon.types[0].type.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
    }

    function getPokemonStats(pokemon) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
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

//contoh penggunaan
getPokemonDataPromise("pikachu")
    .then(pokemon => {
        console.log("Pokemon Data:", pokemon);
    })
    .catch(error => {
        console.error("Error fetching Pokemon data:", error)
    })