import Endpoints from './Endpoints';

export function fetchStops() {
    return fetch(Endpoints.STOPS)
        .then((res) => res.json())
        .then((res) => res.stops);
}

export function fetchStopInfo(id) {
    return fetch(`${Endpoints.STOP_INFO}/${id}`).then((res) => res.json());
}

export function fetchAllStopsInfo(stops) {
    return Promise.all(stops.map((s) => fetchStopInfo(s.id)));
}
