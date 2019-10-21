import api from "../services/api.service";
import { format } from 'date-fns';
import ticketsUi from '../views/tickets.view';

// состояние приложения
const state = {
    countries: {},
    cities: {},
    airlines: {},
    lastSearch: {},
};

// набор ф-й который возвращает нужные для контроллера данные
const getters = {
    getAutocompleteList() {
        return Object.values(state.cities).reduce((acc, city) => {
            acc[city.fullName] = null;
            return acc;
        }, {})
    },
    getCountryName(code) {
        return state.countries[code].name;
    },
    getCityCodeByFullName(fullName) {
        const city = Object.values(state.cities).find(city => city.fullName === fullName);
        return city ? city.code : '';
    },
    getLastSearch() {
        return state.lastSearch;
    }
};

// набор методов, которые нужны для влияния на состояние
const actions = {
    async init() {
        const [countries, cities, airlines] = await Promise.all([
            api.getCountries(),
            api.getCities(),
            api.getAirlines(),
        ]);
        state.countries = this.serializeCountries(countries);
        state.cities = this.serializeCities(cities);
        state.airlines = this.serializeAirlines(airlines);
    },
    async fetchTickets(params) {
        const response = await api.getTickets(params);

        Object.values(response.data).forEach(item => {
            item.airline_name = state.airlines[item.airline] ? state.airlines[item.airline].name : item.airline;
            item.origin_name = state.cities[item.origin].name;
            item.destination_name = state.cities[item.destination].name;
            item.airline_logo = state.airlines[item.airline] ? state.airlines[item.airline].logo : 'http://pics.avs.io/200/200/LO.png';
            item.departure_time = format(new Date(item.departure_at), 'dd MMM yyyy hh:mm');
            item.id = Math.random();
        });

        state.lastSearch = response.data;
        ticketsUi.renderTickets(); // функция из модуля tickets.view для создания разметки билетов/эмпти месседжа
    },
    serializeAirlines(airlines) {
        return airlines.reduce((acc, airline) => {
            airline.logo = `http://pics.avs.io/200/200/${airline.code}.png`;
            airline.name = airline.name || airline.name_translations.en;
            acc[airline.code] = airline;
            return acc;
        }, {})
    },
    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    },
    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            city.name = city.name || city.name_translations.en;
            const countryName = getters.getCountryName(city.country_code);
            const fullName = `${city.name}, ${countryName}`;
            acc[city.code] = {
                ...city,
                countryName,
                fullName
            };
            return acc;
        }, {});
    },
};

export default {
    state,
    getters,
    actions
};