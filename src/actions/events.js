import { types } from "../types/types";

export const eventAddNew = (event) => {
    console.log("Entro");
    return {
        type: types.eventAddNew,
        payload: event
    };
};

export const eventSetActive = (event) => {
    console.log("Entro event");
    console.log(event);
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