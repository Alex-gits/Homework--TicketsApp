export default {
    form: document.forms['locationControls'],
    origin: document.getElementById('autocomplete-origin'),
    destination: document.getElementById('autocomplete-destination'),
    departDatepicker: document.getElementById('datepicker-depart'),
    returnDatepicker: document.getElementById('datepicker-return'),
    ticketsContainer: document.querySelector('.tickets-sections .row'),
    favoritesButton: document.querySelector('.dropdown-trigger'),
    favoritesDropDown: document.querySelector('#dropdown1'),
    deleteFavoriteButton: document.querySelector('.delete-favorite'),
    currency: document.getElementById('currency')
}