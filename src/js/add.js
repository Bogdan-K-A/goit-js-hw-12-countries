import showError from './error.js';
import fetchCountries from './fetchCountries.js';
import countryCard from '../templates/country-card.hbs';
import countryList from '../templates/country-list.hbs';
import refs from './refs.js';
import debounce from 'lodash.debounce';

refs.input.addEventListener('input', debounce(searchInput, 500));

function searchInput(e) {
  e.preventDefault();

  const searchQuery = getQuery();

  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery)
    .then(data => {
      refs.cardInfo.innerHTML = '';
      if (data.length > 10) {
        return showError('Too many mathces found');
      } else if (data.length > 2 && data.length <= 10) {
        showCountriList(data);
      }
      showCountriCard(data);
    })
    .catch(error => {
      if (error === 404) {
        showError('No matches were found! Check your spelling.');
      } else {
        showError('Oops! Something went wrong. Try again.');
      }
    });
}

function getQuery() {
  return refs.input.value;
}

function showCountriList(data) {
  const countryListMarkup = countryList(data);
  refs.cardInfo.insertAdjacentHTML('beforeend', countryListMarkup);
}

function showCountriCard(data) {
  const cardCountryMarkup = countryCard(data[0]);
  refs.cardInfo.insertAdjacentHTML('beforeend', cardCountryMarkup);
}
