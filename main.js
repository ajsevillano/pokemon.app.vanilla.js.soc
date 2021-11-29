//Fetch the information
//First generation
const apiUrlFirstGeneration =
  'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

async function startApp() {
  data = await getPokemons();
  await Promise.all(
    data.map(async (pokemon) => {
      await createCard(pokemon.name, pokemon.url);
    })
  );
  //Solution 2
  // data.map(async (pokemon) => createCard(pokemon.name, pokemon.url));
  // await Promise.all(
  // Solution 1
  //   data.map(async (pokemon) => await createCard(pokemon.name, pokemon.url))
  // );
}

//Get the <ol>
const container = document.querySelector('#pokemon-list');

//Create a new Li and change the inner text to the pokemon name
async function createCard(pokemon, pokemonDetailsUrl) {
  //Create the elements
  const card = document.createElement('div');
  const createH2 = document.createElement('h2');
  const p = document.createElement('p');
  const typeP = document.createElement('p');
  const img = document.createElement('img');

  //Get pokemon individual info
  let data = await getPokemonInfo(pokemonDetailsUrl);
  let imgUrl = data.sprites.other.home.front_default;
  let types = data.types.map((type) => type.type.name);

  const [type1, type2] = types;

  const checkType2 = type2 ? `- ${type2}` : '';

  //Attach the info
  card.className = 'card';
  createH2.innerText = pokemon;
  p.innerText = `pokedeck id #${data.id}`;
  typeP.innerText = `${type1} ${checkType2}`;
  img.src = imgUrl;
  img.width = 200;

  //Append the elements
  container.appendChild(card);
  card.appendChild(img);
  card.appendChild(createH2);
  card.appendChild(p);
  card.appendChild(typeP);
}

//Run the app
startApp();

async function getPokemons() {
  let response = await fetch(apiUrlFirstGeneration);
  let data = await response.json();
  return data.results;
}

async function getPokemonInfo(pokemonDetailsUrl) {
  let response = await fetch(pokemonDetailsUrl);
  let data = await response.json();
  return data;
}
