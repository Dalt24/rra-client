import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { getApiBaseUrl } from '../../functions/api/getApi';
import './therapistCalendar.css';

const TherapistCalendar = (props) => {


    const therapistInfo = (props.therapistData.find((data) => data.therapistID === props.currentUser.therapistID))
    const [availability, setAvailability] = useState(JSON.parse(therapistInfo.availability));
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    const timeSlots = [
        '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
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
                <h3  className='time-slots-container' style={{marginTop:"10px"}}>Choose a day</h3>
                <span className='choice'>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <label key={day}>
                            <input
                                className='choice'
                                type="radio"
                                value={day}
                                checked={selectedDay === day}
                                onChange={() => setSelectedDay(day)}
                            />
                            {day}
                        </label>
                    ))}
                        </span>
            </div>

            <div className='selected'>
                <h3 className='time-slots-container'>Available Time Slots</h3>
                <div  className='time-slots-container'>
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

            <div className='selected'>
                <h3 className='time-slots-container'>Selected Time Slots</h3>
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

            <div className='submitContainer'>
                <button  className='submitBtn' onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
};

export default TherapistCalendar;