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
  const createDiv = document.createElement('div');
  const createH2 = document.createElement('h2');
const appendedDiv = getList.append(createDiv);
console.log(appendedDiv);
 appendedDiv.append(createH2);
return createH2.innerText = pokemon;
}


getPokemons();

