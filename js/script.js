//  IIFE
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
  //  turns pokemon item into button and appends
  function addListItem(pokemon) {
    pokemonButtonCreator(pokemon);
  }
  //  loads poke.api > turns to json, then creates object
  //  with name & detailsUrl.  pushes to pokemonList
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
  //  uses detailsUrl to acces sprite, height and type of
  //  each pokemon.
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
  //  console logs pokemon details (sprite, height, types)
  function showDetails(item) {
    loadDetails(item).then(function () {
      // call function to display items in modal
      populateModal(item);
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

//  begin code for IIFE components

//  loads data via loadList(), adds to pokemonList, then
//  creates button for each pokemon via .addListItem()
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

//  creates a button for each item in pokemonRepository
//  when clicked, button opens modal
let pokemonButtonCreator = (pokemon) => {
  let pokemonListContainer = $('.pokemon__list__container');
  let listItem = $('<li class="group-list-item"></li>');
  let button = $(
    '<button class="btn" data-toggle="modal" data-target="#modal">' +
      capitalizeFirstLetter(pokemon.name) +
      '</button>'
  );
  //  on click, calls showDetails to grab pokemon details and push them
  //  to populateModal function
  $(button).click(() => pokemonRepository.showDetails(pokemon));

  //  appends 'li' and 'button' to 'ul'

  pokemonListContainer.append(listItem);
  listItem.append(button);
};
//  end code for IIFE componends

function capitalizeFirstLetter(item) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}
function populateModal(item) {
  let modalTitle = $('#modal__title');
  let modalTypes = $('#modal__types');
  let modalHeight = $('#modal__height');
  let modalImageContainer = $('#modal__image__container');
  modalTitle.empty();
  modalTypes.empty();
  modalHeight.empty();
  modalImageContainer.empty();

  $(modalTitle).text(capitalizeFirstLetter(item.name));
  $(modalHeight).text('Height: ' + item.height);
  $(modalTypes).text('Type(s): ' + pokemonTypesFormatter(item));
  $(modalImageContainer).append('<img src="' + item.imageUrl + '">');
  console.log(item.imageUrl);
}
let pokemonTypesFormatter = (item) => {
  return item.types.map(
    (types) =>
      ' ' + types.type.name.charAt(0).toUpperCase() + types.type.name.slice(1)
  );
};

// creating searchbar feature
const searchBar = document.getElementById('search__input');

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  const filteredCharacters = pokemonRepository.getAll().filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchString);
  });
  pokemonList = $('.pokemon__list__container');
  pokemonList.empty();
  filteredCharacters.forEach((pokemon) => {
    pokemonButtonCreator(pokemon);
  });
});
