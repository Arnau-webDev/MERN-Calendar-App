import React from "react";

const CalendarEvent = ({ event }) => {
    const { title, user } = event;

    return (
        <div className="mt-1">
            <span className="calendarEventTitle">{title}</span>
            <small> - {user.name}</small>
        </div>
    );
};

export default CalendarEvent;
