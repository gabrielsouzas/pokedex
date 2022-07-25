const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

// Consumo da API POKEAPI
const fetchPokemon = async (pokemon) => {

    // Usa o await para aguardar a resposta do fetch antes de prosseguir
    // OBS: O await só pode ser usado em uma função assincrona
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);

    // Pega o resultado da API e extrai o JSON
    const data = await APIResponse.json();

    return data;

}

// Função que vai renderizar os dados na tela
const renderPokemon = async (pokemon) => {

    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';

}

// Event Listener do formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value);
})
