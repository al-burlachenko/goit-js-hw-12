const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export default class CountryApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries(name) {
    const url = `${BASE_URL}${this.searchQuery}?fields=name;capital;population;flag;languages`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(countries => {
        // console.log(countries);
        return countries;
      })
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
