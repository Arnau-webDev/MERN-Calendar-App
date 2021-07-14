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
import { eventSetActive } from "../../actions/events";
import { calendarReducer } from "../../reducers/calendarReducer";
import AddNewFab from "../ui/AddNewFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

    const { events } = useSelector(state => state.calendar);

    const uiDispatch = useDispatch(uiReducer);
    const calendarDispatch = useDispatch(calendarReducer);

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log(event, start, end, isSelected);

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
                view={lastView}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            <CalendarModal />
        </div>
    );
};

export default CalendarScreen;
