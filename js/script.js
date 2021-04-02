// main pokemon list object
let pokemonList = [
  {
    name: 'Ivysaur',
    height: 1,
    types: ['Grass', 'Poison'],
  },
  {
    name: 'Charmeleon',
    height: 1.1,
    types: ['Fire'],
  },
  {
    name: 'Ninetales',
    height: 1.1,
    types: ['Fire'],
  },
  {
    name: 'Tentacruel',
    height: 1.6,
    types: ['Water', 'Poison'],
  },
];

// forEach to iterate over pokemonList
pokemonList.forEach(function (pokemon) {
  //  to highlight tallest pokemon in list
  if (pokemon.height === 1.6) {
    document.write(
      pokemon.name + ' (height: ' + pokemon.height + " -  Wow, that's big!<br>"
    );
    //  to display all other pokemon names and heights
  } else {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')<br>');
  }
});
