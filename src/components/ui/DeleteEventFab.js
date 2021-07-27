import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/events";
import { calendarReducer } from "../../reducers/calendarReducer";


const DeleteEventFab = () => {

    const calendarDispatch = useDispatch(calendarReducer);

    const handleDeleteEvent = () => {
        calendarDispatch(eventStartDelete());
    };

    return (

        <button
            onClick={handleDeleteEvent}
            className={"btn btn-danger fab-danger animate__animated animate__fadeIn"}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar Evento</span>
        </button>
    );
};

export default DeleteEventFab;
