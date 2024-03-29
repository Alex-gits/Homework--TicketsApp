import { getAutoCompleteInstance } from '../plugins/materialize';
import ui from '../config/ui.config';

function setAutocompleteData(data) {
    const { origin, destination } = ui;
    [origin, destination].forEach(el => {
        const instance = getAutoCompleteInstance(el);
        instance.updateData(data);
    });
}

export default { setAutocompleteData };