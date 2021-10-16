export default function fetchCountries(searchQuery) {
  let fetchQuery = fetch(`https://restcountries.com/v2/name/{searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      return error;
    });
  return fetchQuery;
}
