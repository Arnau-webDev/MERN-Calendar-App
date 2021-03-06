import React, { useState } from "react";

import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";

import moment from "moment";
import { uiReducer } from "../../reducers/uiReducer";
import { uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from "../../actions/events";
import { calendarReducer } from "../../reducers/calendarReducer";
import { useEffect } from "react";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
Modal.setAppElement("#root");

const startDate = moment().minutes(0).seconds(0).add(1, "hour");
const endDate = moment().minutes(0).seconds(0).add(3, "hour");

const initEvent = {
    title: "",
    notes: "",
    start: startDate.toDate(),
    end: endDate.toDate()
};

const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const uiDispatch = useDispatch(uiReducer);
    const calendarDispatch = useDispatch(calendarReducer);

    // const [dateStart, setDateStart] = useState(startDate.toDate());
    // const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        });

        // setDateStart(e);
    };

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        });

        // setDateEnd(e);
    };

    const hadleInputChange = (e) => {
        const { target } = e;

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const hanldeSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire("Error", "La fecha fin debe de ser mayor a la fecha de inicio", "error");
            return;
        }

        if (title.trim().length < 2) {
            setTitleValid(false);
            return;
        }

        // TODO: Realizar grabacion BD
        if (activeEvent) {
            calendarDispatch(eventStartUpdate(formValues));
        } else {
            calendarDispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        handleModalClose();
    };

    const handleModalClose = () => {
        setFormValues(initEvent);
        uiDispatch(uiCloseModal());

        setTimeout(() => {
            calendarDispatch(eventClearActiveEvent());
        }, 210);

        const allEvents = document.querySelectorAll(".rbc-event");
        allEvents.forEach((event) => {
            event.classList.remove("rbc-selected");
        });
    };

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onRequestClose={handleModalClose}
                closeTimeoutMS={200}
                style={customStyles}
                contentLabel="Example Modal"
                className="modal"
                overlayClassName="modal-fondo"
            >
                {activeEvent ? <h1 className="modalH1"> Edit event </h1> : <h1 className="modalH1"> New event </h1>}

                <hr />
                <form className="container" onSubmit={hanldeSubmitForm}>

                    <div className="form-group">
                        <label>Starting date</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={start}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Final date</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={end}
                            className="form-control"
                            minDate={start}
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Title and Notes</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && " is-invalid "}`}
                            placeholder="T??tulo del evento"
                            name="title"
                            autoComplete="off"
                            value={title}
                            onChange={hadleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted ml-1">A short description</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={hadleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted ml-1">Aditional information</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>

            </Modal>
        </>
    );
};

export default CalendarModal;
