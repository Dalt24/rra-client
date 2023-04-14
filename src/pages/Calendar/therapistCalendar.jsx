import React, { useState } from 'react';
import axios from 'axios';


const TherapistCalendar = () => {
            const [availability, setAvailability] = useState({
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
            });
    
    const [aa, setAA] = useState()
    

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
        '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
        '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
        '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    ];


    function handleSubmit() {
        console.log(availability)
        // setAA(JSON.stringify(availability))
        // console.log(availability)
        const body = {
            firstName: "Therapist",
            lastName: "Therapist",
            availability: JSON.stringify(availability),
            emailAddress: "therapist.therapist@gmail.com",
            therapistPassword: "TestPass1!",
            isAdmin: "false",
            isTherapist: "true"
        }
        // console.log(JSON.stringify(availability))
        // axios.post('https://localhost:7202/api/Therapist', body)
    }

    // I think I'm displaying the wrong availability to the user / storing it to the wrong therapistID,
    // compare user -> calendar -> dropdown availability to DB



        const handleTimeSlotSelection = (day, index) => {
            const [startTime, endTime] = timeSlots.slice(index, index + 2);
            setAvailability(prevAvailability => ({
                ...prevAvailability,
                [day]: [
                    ...prevAvailability[day],
                    { start: startTime, end: endTime },
                ],
            }));
        };

        const handleRemoveTimeSlot = (day, index) => {
            setAvailability(prevAvailability => ({
                ...prevAvailability,
                [day]: prevAvailability[day].filter((_, i) => i !== index),
            }));
        };

        return (
            <>
                {daysOfWeek.map(day => (
                    <div key={day}>
                        <h3>{day}</h3>
                        <div>
                            {availability[day].length > 0 ? (
                                availability[day].map(({ start, end }, i) => (
                                    <div key={i}>
                                        {start} - {end}
                                        <button onClick={() => handleRemoveTimeSlot(day, i)}>Remove</button>
                                    </div>
                                ))
                            ) : (
                                <div>No availability set.</div>
                            )}
                        </div>
                        <select onChange={(e) => handleTimeSlotSelection(day, e.target.selectedIndex)}>
                            <option value="">Select a time slot...</option>
                            {timeSlots.map((time, i) => (
                                <option key={i} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                ))}
                {availability && <button onClick={handleSubmit}>Submit</button>}
                
                <pre>{JSON.stringify(availability)}</pre>
            </>
        );
    };
export default TherapistCalendar;
