import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const res = await fetchWithToken("events", event, "POST");
            const body = await res.json();

            console.log(body);

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                };

                dispatch(eventAddNew(event));
            }
        } catch (error) {
            console.log(error);
        }
    };
};


const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    };
};

export const eventSetActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    };
};

export const eventClearActiveEvent = () => {
    return {
        type: types.eventClearActiveEvent
    };
};

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            console.log(event);
            const res = await fetchWithToken(`events/${event.id}`, event, "PUT");
            const body = await res.json();

            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire("Error", body.msg, "error");
            }

        } catch (error) {
            console.log(error);
        }
    };
};

const eventUpdated = (event) => {
    return {
        type: types.eventUpdated,
        payload: event
    };
};

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { activeEvent } = getState().calendar;

        try {
            const res = await fetchWithToken(`events/${activeEvent.id}`, {}, "DELETE");
            const body = await res.json();

            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }

        console.log(activeEvent);
    };
};

const eventDeleted = () => {
    return {
        type: types.eventDeleted,
    };
};

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const res = await fetchWithToken("events");
            const body = await res.json();
            const events = prepareEvents(body.events);

            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    };
};

const eventLoaded = (events) => {
    return {
        type: types.eventLoaded,
        payload: events
    };
};

export const eventClearLogout = () => {
    return {
        type: types.eventClearAll
    };
};