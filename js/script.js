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

//  email validation looking for '@' symbol and a '.'
let validateEmail = () => {
  let value = email.value;
  //  throws error if email field is left blank
  if (!value) {
    showErrorMessage(email, 'You must enter a valid email address');
    return false;
  }
  //  throws error if email doesn't contain '@' symbol
  if (value.indexOf('@') === -1) {
    showErrorMessage(email, 'You must enter a valid email address');
    return false;
  }
  //  if there's no errors, email is valid
  showErrorMessage(email, null);
  return true;
};

//  password validation, looking for 8+ characters
let validatePass = () => {
  let value = password.value;
  //  throws error if password field is left blank
  if (!value) {
    showErrorMessage(passord, 'Password is a required field.');
    return false;
  }
  //  throws error if password is less than 8 characters
  if (value.length < 8) {
    showErrorMessage(
      password,
      'Your pasword needs to be at least 8 characters long.'
    );
    return false;
  }
  //  if there's no errors, password is valid
  showErrorMessage(password, null);
  return true;
};

//  default error messsage for email/pass validation
let showErrorMessage = (input, message) => {
  let container = input.parentElement;
  let error = container.querySelector('.error__message');
  //  if an error currently exists, remove it
  if (error) {
    container.removeChild(error);
  }
  //  if a message exists, adds div containing error message
  if (message) {
    let error = document.createElement('div');
    error.classList.add('error__message');
    error.innerText = message;
    container.appendChild(error);
  }
};
