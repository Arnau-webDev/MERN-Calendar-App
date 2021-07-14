import React, { useState } from "react";

import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";

import moment from "moment";
import { uiReducer } from "../../reducers/uiReducer";
import { uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { eventAddNew, eventClearActiveEvent } from "../../actions/events";
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

    const [dateStart, setDateStart] = useState(startDate.toDate());
    const [dateEnd, setDateEnd] = useState(endDate.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
        }
    }, [activeEvent, setFormValues]);

    const handleStartDateChange = (e) => {
        setFormValues({
            ...formValues,
            start: e
        });

        setDateStart(e);
    };

    const handleEndDateChange = (e) => {
        setFormValues({
            ...formValues,
            end: e
        });

        setDateEnd(e);
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
        console.log(formValues);
        calendarDispatch(eventAddNew({
            ...formValues,
            id: new Date(),
            user: {
                _id: "123",
                name: "Arnau"
            }
        }));

        setTitleValid(true);
        handleModalClose();
    };

    const handleModalClose = () => {
        setFormValues(initEvent);
        calendarDispatch(eventClearActiveEvent());
        uiDispatch(uiCloseModal());
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
                <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={hanldeSubmitForm}>

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={dateStart}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={dateEnd}
                            className="form-control"
                            minDate={dateStart}
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && " is-invalid "}`}
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={title}
                            onChange={hadleInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
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
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
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
