//Variables for every generation
const firstGenData = { limit: 151, offset: 0 };
const secondGenData = { limit: 100, offset: 152 };
const thirdGenData = { limit: 135, offset: 251 };

async function startApp(apiInfo) {
  let { limit, offset } = apiInfo;
  let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  //Get the data from the api
  data = await getPokemons(apiUrl);
  data.map(async (pokemon) => await createCard(pokemon.name, pokemon.url));
}

//Get the <ol>
const container = document.querySelector('#pokemon-list');
//Get the buttons
const gen1Button = document.querySelector('.gen1-button');
const gen2Button = document.querySelector('.gen2-button');
const gen3Button = document.querySelector('.gen3-button');
//Add events listener for every button
gen1Button.addEventListener('click', () => startApp(firstGenData));
gen2Button.addEventListener('click', () => startApp(secondGenData));
gen3Button.addEventListener('click', () => startApp(thirdGenData));

//Create a new Li and change the inner text to the pokemon name
async function createCard(pokemon, pokemonDetailsUrl) {
  //Delete the previous list of pokemons
  container.innerHTML = '';
  //Create the elements
  const card = document.createElement('div');
  const createH2 = document.createElement('h2');
  const p = document.createElement('p');
  const type1p = document.createElement('p');
  const type2p = document.createElement('p');
  const img = document.createElement('img');
  const typesContainer = document.createElement('div');

  //Get pokemon individual info
  let data = await getPokemonInfo(pokemonDetailsUrl);
  let imgUrl = data.sprites.other.home.front_default;
  let types = data.types.map((type) => type.type.name);

  const [type1, type2] = types;

  const checkType2 = type2 ? type2 : '';

  //Attach the info
  card.className = 'card';
  type1p.className = type1;
  type2p.className = checkType2;
  typesContainer.className = 'types-container';
  createH2.innerText = pokemon;
  p.innerText = `pokedeck id #${data.id}`;
  type1p.innerText = type1;
  type2p.innerText = checkType2;
  img.src = imgUrl;
  img.width = 200;

  //Append the elements
  container.appendChild(card);
  card.appendChild(img);
  card.appendChild(createH2);
  card.appendChild(typesContainer);
  typesContainer.appendChild(type1p);
  typesContainer.appendChild(type2p);
  card.appendChild(p);
}

//Run the app
startApp(firstGenData);

async function getPokemons(apiUrl) {
  let response = await fetch(apiUrl);
  let data = await response.json();
  return data.results;
}

async function getPokemonInfo(pokemonDetailsUrl) {
  let response = await fetch(pokemonDetailsUrl);
  let data = await response.json();
  return data;
}
