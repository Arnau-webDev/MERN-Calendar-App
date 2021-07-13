import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

import Navbar from "../ui/Navbar";
import { messages } from "../../helpers/calendarMessages.js";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

const events = [{
    title: "Cumpleaños del jefe",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    user: {
        _id: "123",
        name: "Arnau"
    }
}];

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

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

    const onDoubleClick = (e) => {
        console.log("Double");
        console.log(e);
    };

    const onSelectEvent = (e) => {
        console.log("Select");
        console.log(e);
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

            <CalendarModal />
        </div>
    );
};

export default CalendarScreen;
