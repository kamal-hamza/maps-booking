import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

function Calender({ onDateSelect }) {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        if (onDateSelect) {
            onDateSelect(selectedDate);
        }
    };

    return (
        <div>
            <h2>Select a Date</h2>
            <Calendar 
                onChange={handleDateChange} 
                value={date} 
            />
            <p>Selected Date: {date.toDateString()}</p>
        </div>
    );
}

export default Calender;
