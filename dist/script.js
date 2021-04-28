let pokemonRepository = (function () {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function o(e) {
    t.push(e);
  }
  function n(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  return {
    add: o,
    getAll: function () {
      return t;
    },
    addListItem: function (t) {
      pokemonButtonCreator(t);
    },
    loadList: function () {
      return fetch(e)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          t.results.forEach(function (t) {
            o({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function (t) {
          console.error(t);
        });
    },
    loadDetails: n,
    showDetails: function (t) {
      n(t).then(function () {
        populateModal(t);
      });
    },
  };
})();
function isValidPokemon(t) {
  return ['name', 'height', 'types'].every(function (e) {
    return t.hasOwnProperty(e);
  });
}
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
let pokemonButtonCreator = (t) => {
  let e = $('.pokemon__list__container'),
    o = $('<li class="group-list-item"></li>'),
    n = $(
      '<button class="btn" data-toggle="modal" data-target="#modal">' +
        capitalizeFirstLetter(t.name) +
        '</button>'
    );
  $(n).click(() => pokemonRepository.showDetails(t)), e.append(o), o.append(n);
};
function capitalizeFirstLetter(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function populateModal(t) {
  let e = $('#modal__title'),
    o = $('#modal__types'),
    n = $('#modal__height'),
    a = $('#modal__image__container');
  e.empty(),
    o.empty(),
    n.empty(),
    a.empty(),
    $(e).text(capitalizeFirstLetter(t.name)),
    $(n).text('Height: ' + t.height),
    $(o).text('Type(s): ' + pokemonTypesFormatter(t)),
    $(a).append('<img src="' + t.imageUrl + '">');
}
let pokemonTypesFormatter = (t) =>
  t.types.map(
    (t) => ' ' + t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
  );
const searchBar = document.getElementById('search__input');
searchBar.addEventListener('keyup', (t) => {
  const e = t.target.value.toLowerCase(),
    o = pokemonRepository
      .getAll()
      .filter((t) => t.name.toLowerCase().includes(e));
  (pokemonList = $('.pokemon__list__container')),
    pokemonList.empty(),
    o.forEach((t) => {
      pokemonButtonCreator(t);
    });
});
