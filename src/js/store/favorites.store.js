import store from './main.store'
import favorite from '../views/favorites.view';
import currencyUi from '../views/currency.view'

const favorites = {};

// добавление/удаление избранных объектов в "хранилище"
const favoritesActions = {
    addToFavoriteStorage(id) {
        const currencyType = currencyUi.getCurrencySymbol();

        Object.values(store.state.lastSearch).forEach(item => {
            if (favorites[item.id]) return;

            if (id == item.id) {
                favorites[item.id] = item;
                favorite.renderFavorite(item, currencyType);
            }
        })
    },
    deleteFromFavorite(id) {
        Object.values(favorites).forEach(item => {
            if (id == item.id) {
                delete favorites[id];
            }
        })
    }
}

export default { favoritesActions }