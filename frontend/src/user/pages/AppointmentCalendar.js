// src/components/AppointmentCalendar.js

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import styles
import './Dashboard.css';
const AppointmentCalendar = ({ appointments }) => {
    // Function to add a class to dates with appointments
    const tileClassName = ({ date }) => {
        const dateString = date.toISOString().split('T')[0]; // Format date for comparison

        // Check if any appointment matches the date
        if (appointments.some(appointment => new Date(appointment.date).toISOString().split('T')[0] === dateString)) {
            return 'has-appointment'; // Class name for dates with appointments
        }
        return null; // No special class for dates without appointments
    };

    return (
        <div className="calendar-container">
            <h3>Your Appointments</h3>
            <Calendar
                tileClassName={tileClassName}
                // Additional props can be passed if needed
                onClickDay={(value) => {
                    const dateString = value.toISOString().split('T')[0]; // Get the clicked date
                    const appointmentsOnDate = appointments.filter(appointment => 
                        new Date(appointment.date).toISOString().split('T')[0] === dateString
                    );

                    // Display appointments for the selected date
                    if (appointmentsOnDate.length > 0) {
                        alert(`Appointments on ${dateString}:\n` + 
                              appointmentsOnDate.map(app => `${app.time} - Patient: ${app.patient}`).join('\n'));
                    } else {
                        alert(`No appointments on ${dateString}`);
                    }
                }}
            />
        </div>
    );
};

export default AppointmentCalendar;
