//  pokemonRepository used to create list of pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //  .add function for pushing to list
  function add(pokemon) {
    pokemonList.push(pokemon);
    //  calls 'isValidPokemon' function to validate
    //  pending 'pokemon'
    //  if 'pokemon' is valid, pushes to pokemonList
    // if 'pokemon' invalid, throws error message
    //if (isValidPokemon(pokemon)) {
    //} else {
    // throw TypeError('Invalid object!');
    //}
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
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
    console.log(pokemon);
  });
};

//  the following is unused code to be deleted
//  after 1.7 is complete and functioning properly
/*
//  pokemon added via pokemonRepository.add
//  after auto validating via isValidPokemon
pokemonRepository.add({
  name: 'Ivysaur',
  height: 1,
  types: ['Grass', 'Poison'],
});
pokemonRepository.add({
  name: 'Charmeleon',
  height: 1.1,
  types: ['Fire'],
});
pokemonRepository.add({
  name: 'Ninetales',
  height: 1.1,
  types: ['Fire'],
});
pokemonRepository.add({
  name: 'Tentacruel',
  height: 1.6,
  types: ['Water', 'Poison'],
});
*/
//  calling output function

//  outputs list of pokemon in form of '1button{name}'
//  function outputListOfPokemon() {
//  let pokemonList = pokemonRepository.getAll();
//  iterates over pokemonList and creates: li > button{pokemon's name}
//  for each pokemon in list
//  pokemonList.forEach(function (pokemon) {
//  pokemonButtonCreator(pokemon);
// });
//  }
//outputListOfPokemon();
