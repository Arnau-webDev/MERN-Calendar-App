import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import Navbar from "../ui/Navbar";
import { messages } from "../../helpers/calendarMessages.js";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { useDispatch, useSelector } from "react-redux";
import { uiReducer } from "../../reducers/uiReducer";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActiveEvent, eventSetActive } from "../../actions/events";
import { calendarReducer } from "../../reducers/calendarReducer";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);

    const uiDispatch = useDispatch(uiReducer);
    const calendarDispatch = useDispatch(calendarReducer);

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    const eventStyleGetter = () => {
        const style = {
            backgroundColor: "#367CCF7",
            borderRadius: "0px",
            opacity: 0.8,
            display: "block",
        };

        return {
            style
        };
    };

    const onDoubleClick = () => {
        uiDispatch(uiOpenModal());
    };

    const onSelectEvent = (e) => {
        calendarDispatch(eventSetActive(e));
    };

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem("lastView", e);
    };

    const onSelectSlot = () => {
        calendarDispatch(eventClearActiveEvent());

        const allEvents = document.querySelectorAll(".rbc-event");
        allEvents.forEach((event) => {
            event.classList.remove("rbc-selected");
        });
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {activeEvent && <DeleteEventFab />}

            <CalendarModal />
        </div>
    );
};

export default CalendarScreen;
