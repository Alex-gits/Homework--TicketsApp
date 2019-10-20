import '../css/style.css';
import './plugins';
import store from './store/main.store';
import formView from './views/form.view';
import ui from './config/ui.config';


const { form, origin, destination, departDatepicker, returnDatepicker } = ui;

document.addEventListener('DOMContentLoaded', e => {
    initApp();
    form.addEventListener('submit', e => {
        e.preventDefault();
        onFormSubmit();
    })

    async function initApp() {
        await store.actions.init();
        formView.setAutocompleteData(store.getters.getAutocompleteList());
    }

    function onFormSubmit() {
        const originValue = store.getters.getCityCodeByFullName(origin.value);
        const destinationValue = store.getters.getCityCodeByFullName(destination.value);
        const departDate = departDatepicker.value;
        const returnDate = returnDatepicker.value;
        const currencyType = ui.currency.value;

        store.actions.fetchTickets({
            origin: originValue,
            destination: destinationValue,
            depart_date: departDate,
            return_date: returnDate,
            currency: currencyType,
        })
    }
})

// функции, иницилизирующие добавление/удаление избранных тикетов

ui.ticketsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('add-favorite')) return;

    const ticketWrapper = e.target.closest('.ticket-wrapper');

    store.actions.addToFavoriteStorage(ticketWrapper.dataset.id);
})

ui.favoritesDropDown.addEventListener('click', e => {
    if (!e.target.classList.contains('delete-favorite')) return;

    const favoriteTicket = e.target.closest('.favorite-item');
    const faroviteId = favoriteTicket.dataset.id;

    store.actions.deleteFromFavorite(faroviteId);
    favoriteTicket.remove();
})