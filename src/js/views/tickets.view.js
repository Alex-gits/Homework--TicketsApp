import store from '../store/main.store';
import pageUi from '../config/ui.config';

function renderTickets() {
    const tickets = store.getters.getLastSearch();
    const container = pageUi.ticketsContainer;

    container.innerHTML = "";

    if (!Object.values(tickets).length) {
        emptyMsg(container);
    } else {
        ticketTemplate(tickets, container);
    }
}

function ticketTemplate(tickets, container) {

    Object.values(tickets).forEach(item => {
        const template = `
            <div class="col s12 m6">
                <div class="card ticket-card">
                    <div class="ticket-airline d-flex align-items-center">
                        <img src="${item.airline_logo}" class="ticket-airline-img"/>
                        <span class="ticket-airline-name">${item.airline_name}</span>
                    </div>
                    <div class="ticket-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                        <span class="ticket-city">${item.origin_name}</span>
                        <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                        <i class="medium material-icons">flight_land</i>
                        <span class="ticket-city">${item.destination_name}</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${item.departure_time}</span>
                        <span class="ticket-price ml-auto">$${item.price}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${item.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${item.flight_number}</span>
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('afterbegin', template);
    })
}

function emptyMsg(container) {
    const emptyMessage = `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено.
        </div>
    `;

    container.insertAdjacentHTML('afterbegin', emptyMessage);
}

export default { renderTickets };