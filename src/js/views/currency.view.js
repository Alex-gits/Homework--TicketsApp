import ui from '../config/ui.config';

const money = ui.currency;
const currencyDictionary = {
    USD: '$',
    EUR: '€',
}

function getCurrencySymbol() {
    return currencyDictionary[money.value];
}

export default { getCurrencySymbol }