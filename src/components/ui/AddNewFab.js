import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventClearActiveEvent } from "../../actions/events";
import { uiOpenModal } from "../../actions/ui";
import { calendarReducer } from "../../reducers/calendarReducer";
import { uiReducer } from "../../reducers/uiReducer";

const AddNewFab = () => {

    const uiDispatch = useDispatch(uiReducer);
    const calendarDispatch = useDispatch(calendarReducer);
    const { activeEvent } = useSelector(state => state.calendar);

    const handleModalOpen = () => {
        if (activeEvent) {
            calendarDispatch(eventClearActiveEvent());
        }

        uiDispatch(uiOpenModal());
    };

    return (
        <button className="btn btn-primary fab" onClick={handleModalOpen}>
            <i className="fas fa-plus"></i>
        </button>
    );
};

export default AddNewFab;
