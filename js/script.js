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
      console.log(item);
    });
  }

  //  adds event listener to trigger previous code to add 'is visible'
  document.querySelector('#show__modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content.');
  });

  //  listener to close modal on esc key press
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal__container');
    if (
      e.key === 'Escape' &&
      modalContainer.classList.contains('is__visible')
    ) {
      hideModal();
    }

    //  listener to close modal on click outside modal
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) hideModal();
    });
  });

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
//  end code for IIFE componends

//  begins code for modal dialoge
function showDialog(title, text) {
  showModal(title, text);

  let modalContainer = document.querySelector('#modal__container');
  let modal = modalContainer.querySelector('.modal');
  //  creates confirm button
  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal__confirm');
  confirmButton.innerText = 'Confirm';
  //  creates cancel button
  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal__cancel');
  cancelButton.innerText = 'Cancel';
  //  appends created buttons
  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);
  //  confirms if enter is pressed
  confirmButton.focus();
}

//  begins coding for modal
//  creates all content for modal
let showModal = (title, text) => {
  let modalContainer = document.querySelector('#modal__container');

  //  clears all existing modal content
  modalContainer.innerHTML = '';

  //  adding all modal content
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal__close');
  closeButtonElement.innerText = 'Close';
  //  adds listeners to trigger hide modal
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  //  appends all created elements
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  //  add 'is visible' class
  modalContainer.classList.add('is__visible');
};

//  removes 'is visible' from modal__container
let hideModal = () => {
  let modalContainer = document.querySelector('#modal__container');
  modalContainer.classList.remove('is__visible');
};
//

/*  registration form currently not in use
// registration input/button code below
let form = document.querySelector('#register__form');
let email = document.querySelector('#email__input');
let password = document.querySelector('#pass__input');
//  password validation, looking for 8+ characters
let validatePassword = () => {
  let value = password.value;
  //  throws error if password field is left blank
  if (!value) {
    showErrorMessage(password, 'Password is a required field.');
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
*/
/*
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

//  form validation
let validateForm = () => {
  let isValidEmail = validateEmail();
  let isValidPassword = validatePassword();
  return isValidEmail && isValidPassword;
};

//  submit button event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm()) {
    alert('Success!!');
  }
});
*/
