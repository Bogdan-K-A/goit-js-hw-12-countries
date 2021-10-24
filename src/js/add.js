import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import refs from './refs.js';
const { searchForm } = refs;

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));

/* -----------------------------функция инпута приносит данные ---------------------------- */

function onSearch(e) {
  e.preventDefault();
  let searchQuery = e.target.value;
  renderCountri();
  if (!searchQuery) return;

  fetchCountries(searchQuery)
    .then(data => {
      const dataLen = data.length;
      if (dataLen === 1) {
        const cardMarkup = countryCardTpl(data);
        renderCountri(cardMarkup);
        return;
      }
      if (dataLen <= 10) {
        const cardMarkup = countryListTpl(data);
        renderCountri(cardMarkup);
        return;
      }

      if (dataLen > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
        return;
      }
    })
    .catch(error => {
      error({
        text: error,
      });
    })
    .finally(() => {
      clearInput();
    });
}

/* ---------------------------- рендерит разметку --------------------------- */
function renderCountri(markup = '') {
  // const cardMarkup = countryCardTpl(data);
  refs.cardInfo.innerHTML = markup;
}

// function renderCountryList(data) {
//   const cardMarkup = countryListTpl(data);
//   refs.cardInfo.innerHTML = cardMarkup;
// }
/* ---------------------------- очистка инпута --------------------------- */
function clearInput() {
  refs.searchForm.value = '';
}
