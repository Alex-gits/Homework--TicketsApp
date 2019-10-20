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

        store.actions.fetchTickets({
            origin: originValue,
            destination: destinationValue,
            depart_date: departDate,
            return_date: returnDate
        })
    }
})
