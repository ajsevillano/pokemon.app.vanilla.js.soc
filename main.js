//Fetch the information
//First generation
const apiUrlFirstGeneration =
  'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

async function getPokemons() {
  let response = await fetch(apiUrlFirstGeneration);
  // data object with some information and the results
  let data = await response.json();
  let pokemonInfo = data.results;
  // console.log(pokemonInfo);
  pokemonInfo.map((pokemon) => createCard(pokemon.name, pokemon.url));
}

//Get the <ol>
const container = document.querySelector('#pokemon-list');

//Create a new Li and change the inner text to the pokemon name
async function createCard(pokemon, pokemonDetailsUrl) {
  //Create the elements
  const card = document.createElement('div');
  const createH2 = document.createElement('h2');
  const p = document.createElement('p');

  let jsonData = await getPokemonInfo(pokemonDetailsUrl);

  //Attach the info
  createH2.innerText = pokemon;
  p.innerText = jsonData;

  //Append the elements
  container.appendChild(card);
  card.appendChild(createH2);
  card.appendChild(p);
}

getPokemons();

async function getPokemonInfo(pokemonDetailsUrl) {
  let response = await fetch(pokemonDetailsUrl);
  let data = await response.json();
  return data.base_experience;
}
