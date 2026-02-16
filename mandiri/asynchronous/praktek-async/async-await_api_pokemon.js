import axios from "axios";

const apiUrl = 'https://pokeapi.co/api/v2'; // URL dasar API Pokémon

//Mengambil data pokemon dasar
const getPokemnonAsync = async function (pokemonName) {
    try {
        const response = await axios.get(`${apiUrl}/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        handleAxiosErrors(error, 'Pokemon');
    }
};

//mengambil data tipe pokemon
const getPokemonTypeAsync = async function (pokemon) {
    try {
        //mengambil tipe pokemon dari data dasar
        const types = await Promise.all(
            pokemon.types.map(async (typeInfo) => {
                const response = await axios.get(typeInfo.type.url);
                return response.data;
            })
        )
        return types;
    } catch (error) {
        handleAxiosErrors(error, "Types")
    }
}

//mengambil statistik pokemon
const getPokemonStatsAsync = async function (pokemon) {
    try {
        //mengambil statistik pokemon dari data dasar
        const response = await axios.get(`${apiUrl}/pokemon/${pokemon.id}`)
        return response.data;
    } catch (error) {
        handleAxiosErrors(error, "Stats");
    }
}

//fungsi untuk menangani kesalahan dari axios
function handleAxiosErrors(error, context) {
    console.error(`Error fetching ${context}:`, error)
}

//fungsi utama untuk mengambil data pokemon lengkap
const getPokemonDataAsync = async function (pokemonName) {
    try {
        const pokemon = await getPokemnonAsync(pokemonName);
        const types = await getPokemonTypeAsync(pokemon);
        const stats = await getPokemonStatsAsync(pokemon);

        //gabungkan data
        return {
            ...pokemon,
            types,
            stats
        }
    } catch (error) {
        console.log(`Error fetching pokemon data:`, error)
    }
}

//contoh penggunaan
getPokemonDataAsync('pikachu')
    .then((pokomen) => {
        console.log("Pokemon data:", pokomen);
    })
    .catch((error) => {
        console.error('Error fetching pokemon data:', error)
    })