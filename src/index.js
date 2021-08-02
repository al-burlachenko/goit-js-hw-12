import '../node_modules/normalize.css/normalize.css';
import './css/styles.css';
import CountriesApiService from './js/countries-api-service';
import Notiflix from 'notiflix';

import countriesListTpl from './templates/countriesList.hbs';
import countriesInfoTpl from './templates/countriesInfo.hbs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const countriesApiService = new CountriesApiService();

const refs = {
  inputField: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener('input', debounce(getCountryName, DEBOUNCE_DELAY));

function getCountryName() {
  const countryName = refs.inputField.value.trim();
  countriesApiService.query = countryName;
  if (countryName === '') {
    clearCountryList();
    return;
  }

  countriesApiService
    .fetchCountries()
    .then(countries => {

      let lang = [];
      if (countries.length === 1) {
        countries['0'].languages.map((item, i) => {
          i !== countries['0'].languages.length - 1
            ? (lang += item.name + ', ')
            : (lang += item.name);
        });
        countries['0'].lang = lang;
        appendCountryInfo(countries);
        return;
      }

      if (countries.length > 1 && countries.length < 10) {
        appendCountryList(countries);
        console.log('до 10');
        return;
      }

      if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

        return;
      }
    })
    .catch(() => Notiflix.Notify.warning('Oops, there is no country with that name'));
}

function appendCountryList(countries) {
  clearCountryList();

  refs.countryList.insertAdjacentHTML('beforeend', countriesListTpl(countries));
}

function appendCountryInfo(countries) {
  clearCountryList();
  
  refs.countryList.insertAdjacentHTML('beforeend', countriesInfoTpl(countries));
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}
