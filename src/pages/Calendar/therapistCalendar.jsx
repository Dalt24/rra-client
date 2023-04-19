import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { getApiBaseUrl } from '../../functions/api/getApi';

const TherapistCalendar = (props) => {

    const therapistInfo = (props.therapistData.find((data) => data.therapistID === props.currentUser.therapistID))
    console.log(therapistInfo)
    const [availability, setAvailability] = useState(JSON.parse(therapistInfo.availability));
    console.log(availability)
    const [selectedDay, setSelectedDay] = useState("Monday");

    const timeSlots = [        '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',    ];

    function handleSubmit() {
        const body = {
            firstName: "Therapist",
            lastName: "Therapist",
            availability: JSON.stringify(availability),
            emailAddress: "therapist.therapist@gmail.com",
            therapistPassword: therapistInfo.therapistPassword,
            isAdmin: "false",
            isTherapist: "true"
        }
        axios.put(`${getApiBaseUrl()}/api/Therapist/${props.currentUser.therapistID}`, body)
    }

    const handleTimeSlotSelection = (index) => {
        const dayAvailability = availability[selectedDay] || [];
        const startTime = timeSlots[index];
        const endTime = moment(startTime, 'h:mm A').add(30, 'minutes').format('h:mm A');
        const newAvailability = {
            ...availability,
            [selectedDay]: [
                ...dayAvailability,
                { start: startTime, end: endTime },
            ],
        };
        setAvailability(newAvailability);
    };

    const handleRemoveTimeSlot = (index) => {
        const dayAvailability = availability[selectedDay] || [];
        const newAvailability = {
            ...availability,
            [selectedDay]: dayAvailability?.filter((_, i) => i !== index),
        };
        setAvailability(newAvailability);
    };

    return (
        <>
            <div>
                <h3>Choose a day:</h3>
                <div>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <label key={day}>
                            <input
                                type="radio"
                                value={day}
                                checked={selectedDay === day}
                                onChange={() => setSelectedDay(day)}
                            />
                            {day}
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3>{selectedDay}</h3>
                <div>
                    {availability[selectedDay]?.length > 0 ? (
                        availability[selectedDay].map(({ start, end }, i) => (
                            <div key={i}>
                                {start} - {end}
                                <button onClick={() => handleRemoveTimeSlot(i)}>Remove</button>
                            </div>
                        ))
                    ) : (
                        <div>No availability set.</div>
                    )}
                </div>
                <div>
                    <select value="" onChange={(e) => handleTimeSlotSelection(e.target.value)}>
                        <option value="">Select a time slot...</option>
                        {timeSlots.map((time, index) => (
                        <option key={index} value={index}>
                            {time}
                        </option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Save Changes</button>
            </div>
        </div>
    </>
);
                        }
export default TherapistCalendar;