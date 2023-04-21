import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { getApiBaseUrl } from '../../functions/api/getApi';
import './therapistCalendar.css';

const TherapistCalendar = (props) => {


    const therapistInfo = (props.therapistData.find((data) => data.therapistID === props.currentUser.therapistID))
    console.log(therapistInfo)
    const [availability, setAvailability] = useState(JSON.parse(therapistInfo.availability));
    console.log(availability)
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    const timeSlots = [
        '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    ];

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
        const isSelected = selectedTimeSlots.includes(index);
        let newSelectedTimeSlots = [];
        if (!isSelected) {
            newSelectedTimeSlots = [...selectedTimeSlots, index];
        } else {
            newSelectedTimeSlots = selectedTimeSlots.filter((i) => i !== index);
        }
        const startTime = timeSlots[index];
        const endTime = moment(startTime, 'h:mm A').add(30, 'minutes').format('h:mm A');
        const dayAvailability = availability[selectedDay] || [];
        const newAvailability = {
            ...availability,
            [selectedDay]: newSelectedTimeSlots.map((i) => ({
                start: timeSlots[i],
                end: moment(timeSlots[i], 'h:mm A').add(30, 'minutes').format('h:mm A'),
            })),
        };
        setAvailability(newAvailability);
        setSelectedTimeSlots(newSelectedTimeSlots);
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
        <div className='theraCal'>
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
                <h3>Available Time Slots:</h3>
                <div>
                    {timeSlots.map((slot, index) => {
                        const dayAvailability = availability[selectedDay] || [];
                        const isSelected = selectedTimeSlots.includes(index);
                        const isAvailable = !dayAvailability.some(
                            (timeSlot) => timeSlot.start === slot
                        );
                        return (
                            <button
                                key={index}
                                className="button2"

                                disabled={!isAvailable && isSelected}
                                onClick={() => handleTimeSlotSelection(index)}
                            >
                                {slot}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3>Selected Time Slots:</h3>
                <div className='time-slots-container'>
                    {availability[selectedDay]?.map((timeSlot, index) => (
                        <button
                            key={index}
                            className="button2"
                            onClick={() => handleRemoveTimeSlot(index)}
                        >
                            {timeSlot.start} - {timeSlot.end}
                        </button>
                    ))}
                </div>
            </div>

            <div className='submitBtn'>
                <button onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default TherapistCalendar;