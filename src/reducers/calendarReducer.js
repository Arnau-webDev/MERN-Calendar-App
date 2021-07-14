import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [{
        title: "Cumpleaños del jefe",
        start: moment().toDate(),
        end: moment().add(2, "hours").toDate(),
        bgcolor: "#fafafa",
        user: {
            _id: "123",
            name: "Arnau"
        }
    }],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            console.log(action.payload);
            return {
                ...state,
                events: [action.payload, ...state.events]
            };
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            };
        default:
            return state;
    }
};