const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

// Consumo da API POKEAPI
const fetchPokemon = async (pokemon) => {

    // Usa o await para aguardar a resposta do fetch antes de prosseguir
    // OBS: O await só pode ser usado em uma função assincrona
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // Verifica se o pokemon pesquisado foi encontrado
    if (APIResponse.status === 200) {
        // Pega o resultado da API e extrai o JSON
        const data = await APIResponse.json();
        return data;
    }
}

// Função que vai renderizar os dados na tela
const renderPokemon = async (pokemon) => {

    // Coloca um valor na tela para que o usuario saiba que esta aguardando a busca
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = "";

    // Aguarda o método de busca retornar um resultado da API
    const data = await fetchPokemon(pokemon);

    // Se existirem dados no data então coloca na tela
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
    }
}

// Event Listener do formulario
form.addEventListener('submit', (event) => {
    // Evita o refresh da pagina no envio do form
    event.preventDefault();
    // Chama a função que vai carregar o pokemon passando o valor do input
    renderPokemon(input.value.toLowerCase());
})

// Event Listener do botão Prev
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon-=1;
        renderPokemon(searchPokemon);
    }
})

// Event Listener do botão Next
buttonNext.addEventListener('click', () => {
    searchPokemon+=1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)
