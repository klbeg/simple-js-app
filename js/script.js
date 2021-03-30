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

// for loop to iterate over list
for (let i = 0; i <= pokemonList.length; i++) {
  // filters out tallest pokemon
  // and adds tag 'wow that's big'
  if (pokemonList[i].height === 1.6) {
    document.write(
      '<p>' +
        pokemonList[i].name +
        ' (height: ' +
        pokemonList[i].height +
        ") - Wow, that's <strong>big</strong>!!!</p>"
    );

    // outputs all other pokemon to list without tag
  } else {
    document.write(
      '<p>' +
        pokemonList[i].name +
        ' (height: ' +
        pokemonList[i].height +
        ')</p>'
    );
  }
}
