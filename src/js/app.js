import '../css/style.css';
import './plugins';
import store from './store/main.store';
import form from './views/form.view';


store.actions.init().then(res => {
    const data = store.getters.getAutocompleteList(res);
    form.setAutocompleteData(data);
})