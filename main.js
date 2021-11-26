//Fetch the information
//First generation
const apiUrlFirstGeneration =
  'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

async function getPokemons() {
  let response = await fetch(apiUrlFirstGeneration);
  let data = await response.json();
  console.log(data);
}

getPokemons();
