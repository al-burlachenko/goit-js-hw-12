import './css/styles.css';
import CountriesApiService from './js/countries-api-service';

import countriesListTpl from './templates/countriesList.hbs';
import countriesInfoTpl from './templates/countriesInfo.hbs';

const _ = require('lodash');
const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  inputField: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener('input', _.debounce(getCountryName, DEBOUNCE_DELAY));

// console.log(refs.countryInfo);
// refs.inputField.value=>

function getCountryName() {
  countriesApiService.query = refs.inputField.value.trim();
  // if (countryName === '') {
  //   return;
  // }
  // countriesApiService.fetchCountries().then(countries => {
  //   console.log(countries);
  //   appendCountryList(countries)
  // });

  countriesApiService.fetchCountries().then(countries => {
    clearCountryList();
    appendCountryList(countries)
    // console.log({countries});
  });

}

function appendCountryList(countries) {
  // refs.countryList.insertAdjacentHTML('beforeend', countriesInfoTpl(countries));
  refs.countryList.insertAdjacentHTML('beforeend', countriesListTpl(countries));

}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}
