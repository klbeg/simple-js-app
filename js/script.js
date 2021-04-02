//  Creating pokemonRepository with 'add' and 'getAll' functionality
let pokemonRepository = (function () {
  let pokemonList = [];

  //  'add' function, limited to objects only
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

// adding pokemon to pokemonRepository
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
