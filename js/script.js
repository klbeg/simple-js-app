// creates a function to validate wether 'pokemon' has
// specified keys
function isValidPokemon(pokemon) {
  //  creates array [name, height, type]
  //  to be checked against in functin(key)
  if (
    ['name', 'height', 'types'].every(function (key) {
      // checks properties(keys) of 'pokemon' against
      // array [name, height, types]
      return pokemon.hasOwnProperty(key);
    })
  ) {
    // pushes to pokemonRepository.getAll
    // via pokemonRepository.add
    pokemonRepository.add(pokemon);
    // if 'isValidPokemon' returns false,
    // 'invalie object' will be displayed
  } else {
    throw TypeError('Invalid object.');
  }
}

//  Creating pokemonRepository with 'add' and 'getAll' functionality
let pokemonRepository = (function () {
  let pokemonList = [];

  // pushes 'pokemon' to 'pokemonRepository.getAll()'
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  // lists out all pokemon in pokemonRepository
  function getAll() {
    return pokemonList;
  }
  // my assumption is that this resets the values of 'add' and 'getAll'
  // if I'm wrong, please let me know.
  return {
    add: add,
    getAll: getAll,
  };
})();

// 'isPokemonValid' will first validate entries and
// if truthy, will execute pokemonRepository.add
// adding the object to the repository
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

// creating function to nest pokemonList inside of
function outputListOfPokemon() {
  // create pokemonList to be used in forEach loop
  let pokemonList = pokemonRepository.getAll();

  // forEach loop to iterate over pokemonList
  pokemonList.forEach(function (pokemon) {
    //  to highlight tallest pokemon in list
    if (pokemon.height === 1.6) {
      document.write(
        pokemon.name +
          ' (height: ' +
          pokemon.height +
          " -  Wow, that's big!<br>"
      );
    } else {
      //  to display all other pokemon names and heights
      document.write(pokemon.name + ' (height: ' + pokemon.height + ')<br>');
    }
  });
}
//  calling output function
outputListOfPokemon();
