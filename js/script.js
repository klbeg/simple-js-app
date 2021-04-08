//  pokemonRepository used to create list of pokemon
//  .add function for pushing to list
//  .getAll function to output list of pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  // pushes 'pokemon' to 'pokemonList'.
  // accessable via pokemonRepository.getAll
  function add(pokemon) {
    //  calls 'isValidPokemon' function to validate
    //  pending 'pokemon'
    if (isValidPokemon(pokemon)) {
      //  if 'pokemon' is valid, pushes to pokemonList
      pokemonList.push(pokemon);
    } else {
      // if 'pokemon' invaled, throws error message
      throw TypeError('Invalid object!');
    }
  }
  // outputs full list of pokemon
  function getAll() {
    return pokemonList;
  }
  // resets values for 'add' and 'getAll'
  return {
    add: add,
    getAll: getAll,
  };
})();

// checks for key values in pokemon and returns boolean
function isValidPokemon(pokemon) {
  // key values expected
  return ['name', 'height', 'types'].every(function (key) {
    return pokemon.hasOwnProperty(key);
  });
}
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

// appends 'li' > 'button{pokemon name}' to pokemon 'ul' in index.html
let pokemonButtonCreator = (pokemon) => {
  let pokemonListContainer = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  pokemonListContainer.appendChild(listItem);
  listItem.appendChild(button);
  button.innerText = pokemon.name;
};

// outputs complete list of pokemon names as 'list items > buttons'
// into a ul in index.html
function outputListOfPokemon() {
  let pokemonList = pokemonRepository.getAll();
  //  iterates over pokemonList and creates: li > button{pokemon's name}
  //  for each pokemon in list
  pokemonList.forEach(function (pokemon) {
    pokemonButtonCreator(pokemon);
  });
}

//  calling output function
outputListOfPokemon();
