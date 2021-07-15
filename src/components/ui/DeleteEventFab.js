import React from "react";
import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/events";
import { calendarReducer } from "../../reducers/calendarReducer";

const DeleteEventFab = () => {

    const calendarDispatch = useDispatch(calendarReducer);

    const handleDeleteEvent = () => {
        calendarDispatch(eventDeleted());
    };

    return (
        <button onClick={handleDeleteEvent} className="btn btn-danger fab-danger">
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    );
};

export default DeleteEventFab;
