import { error, Stack } from '@pnotify/core';
import { fetchCountries } from './fetchCountries';
import countryCard from '../templates/country-card.hbs';
import axios from 'axios';

console.log(axios);

const refs = {
  input: document.querySelector('.country-input'),
  debounce: require('lodash.debounce'),
};

refs.input.addEventListener('input', refs.debounce(searchInput, 500));

function searchInput(e) {
  e.preventDefault();

  console.log(fetchCountries());
}
// ========================================================
