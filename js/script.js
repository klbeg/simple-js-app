// checks for key values in pokemon and returns boolean
function isValidPokemon(pokemon) {
  // key values expected
  return ['name', 'height', 'types'].every(function (key) {
    return pokemon.hasOwnProperty(key);
  });
}

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
console.log(pokemonRepository.getAll());
