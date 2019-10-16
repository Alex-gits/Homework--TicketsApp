import api from '../services/api.service';

const state = {
    countries: {},
    cities: {},
    airlines: {},
};

const getters = {
    getAutocompleteList() {
        const citiesArray = state.cities;
        const countriesArray = state.countries;

        const citiesAndCountriesArray = citiesArray.map(cityObj => {
            return ({ [`${cityObj.name || cityObj.name_translations.en}, ${countriesArray[cityObj.country_code]}`]: null })
        });

        const citiesAndCountriesObject = citiesAndCountriesArray.reduce(function (acc, item) {

            for (let [key, value] of Object.entries(item)) {
                acc[`${key}`] = value;
            }

            return acc;
        }, {});

        return citiesAndCountriesObject;
    }
};

const actions = {
    async init() {
        const [countries, cities, airlines] = await Promise.all([
            api.getCountries(),
            api.getCities(),
            api.getAirlines()
        ]);

        state.countries = countries.reduce(function (acc, item) {
            acc[item.code] = item.name || item.name_translations.en

            return acc;
        }, {});

        state.cities = cities;

        state.airlines = airlines;
    }
};

export default {
    state, getters, actions
}