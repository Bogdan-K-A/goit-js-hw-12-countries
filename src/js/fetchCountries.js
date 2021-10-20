import { alert } from '@pnotify/core';
import axios from 'axios';

export default function fetchCountries(searchQuery) {
  return axios
    .get(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(result => {
      if (result.status === 404) {
        alert({
          type: 'error',
          text: 'No matches find',
        });
      }
      return result;
    })
    .catch(error => error);
}
