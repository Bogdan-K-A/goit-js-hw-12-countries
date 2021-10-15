import countryCardTpl from '../templates/country-card.hbs';

let url = `https://restcountries.com/v2/name/peru`;
fetch(url)
  .then(response => {
    // console.log(response);
    return response.json();
  })
  .then(country => {
    console.log(country);
    const marcup = countryCardTpl(country);
    console.log(marcup);
  })
  .catch(error => {
    console.log(error);
  });

// https://restcountries.com/v2/name/{name}// возвращает страну при написании
// https://restcountries.com/v2/name/peru // возврашает одну страну
// https://restcountries.com/v2/name/united // возвращает количество стран
