//  pokemonRepository used to create list of pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //  .add function for pushing to list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //  .getAll function to access full list of pokemon
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    pokemonButtonCreator(pokemon);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // returns all values
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//  checks for key values in pokemon and returns boolean
//  called in pokemonRepository.add function
function isValidPokemon(pokemon) {
  // key values expected
  return ['name', 'height', 'types'].every(function (key) {
    return pokemon.hasOwnProperty(key);
  });
}

//  appends 'li' > 'button{pokemon name}' to pokemon 'ul' in index.html
//  adds event listener to log the pokemon object in the console
let pokemonButtonCreator = (pokemon) => {
  //  targets 'ul' creates 'li' and 'button'
  let pokemonListContainer = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  //  appends 'li' and 'button' to 'ul'
  pokemonListContainer.appendChild(listItem);
  listItem.appendChild(button);
  button.innerText = pokemon.name;
  //  event listener for button click
  button.addEventListener('click', function () {
    pokemonRepository.showDetails(pokemon);
  });
};

// registration input/button code below
let email = document.querySelector('#email__input');
let password = document.querySelector('#pass__input');
let submit = document.querySelector('#submit__button');

let validateEmail = () => {
  let value = email.value;
  let hasAtSign = value.indexOf('@') > -1;
  let hasDot = value.indexOf('.') > -1;
  return value && hasAtSign && hasDot;
};
