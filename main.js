//Fetch the information
//First generation
const apiUrlFirstGeneration =
  'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

async function getPokemons() {
  let response = await fetch(apiUrlFirstGeneration);
  // data object with some information and the results
  let data = await response.json();
  let pokemonInfo = data.results;
  console.log(pokemonInfo);
  pokemonInfo.map((pokemon) => writeLi(pokemon.name));
}

//Get the <ol>
const getList = document.querySelector('#pokemon-list');

//Create a new Li and change the inner text to the pokemon name
function writeLi(pokemon) {
  const createLi = document.createElement('li');
  createLi.innerText = pokemon;
  return getList.append(createLi);
}

getPokemons();
