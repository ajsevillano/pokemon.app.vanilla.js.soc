//Variables for every generation
const firstGenData = { limit: 151, offset: 0 };
const secondGenData = { limit: 100, offset: 151 };
const thirdGenData = { limit: 135, offset: 251 };

async function startApp(apiInfo) {
  let { limit, offset } = apiInfo;
  let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  //Get the data from the api
  data = await getPokemons(apiUrl);
  //Delete the previous list of pokemons
  container.innerHTML = '';
  for (const pokemon of data) {
    await createCard(pokemon.name, pokemon.url);
  }
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
  //Create the elements
  const pokemonCard = document.createElement('div');
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
  pokemonCard.className = 'card';
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
  container.appendChild(pokemonCard);
  pokemonCard.appendChild(img);
  pokemonCard.appendChild(createH2);
  pokemonCard.appendChild(typesContainer);
  typesContainer.appendChild(type1p);
  typesContainer.appendChild(type2p);
  pokemonCard.appendChild(p);
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
