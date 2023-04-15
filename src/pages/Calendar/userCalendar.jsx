import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar'

const UserCalendar = (props) => {
    const [date, setDate] = useState(new Date().toISOString());
    const [day, setDay] = useState(moment().format('dddd'));
    const [a, setA] = useState();
    const [therapist, setTherapist] = useState('');
    const [selectedIntervals, setSelectedIntervals] = useState([]);
    const [appointmentData, setAppointmentData] = useState([])
    const [therapyType, setTherapyType] = useState();
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [zipCode, setZipCode] = useState()

    useEffect(() => {
        if (props.currentUser !== null && props.currentUser !== undefined && props.currentUser.isTherapist === "false") {
            axios.get(`https://localhost:7202/api/Appointment`).then((response) => {
                setAppointmentData(response.data)
            });
        }
        else if (props.currentUser !== null && props.currentUser !== undefined && props.currentUser.isTherapist === "true") {
            axios.get(`https://localhost:7202/api/Appointment`).then((response) => {
                setAppointmentData(response.data)
            });
        }
    }, [props.currentUser])

    function onChange(date) {
        setDate(date);
        setDay(moment(date).format('dddd'));
    }

    function handleIntervalClick(interval) {
        if (selectedIntervals.length === 0) {
            // If no intervals are selected, add the clicked interval to selectedIntervals
            setSelectedIntervals([interval]);
        } else if (selectedIntervals.length === 1) {
            // If one interval is already selected, check if the clicked interval is the next 30-minute interval
            const selectedInterval = selectedIntervals[0];
            const nextInterval = moment(selectedInterval, 'h:mm A').add(30, 'minutes').format('h:mm A');
            const prevInterval = moment(selectedInterval, 'h:mm A').subtract(30, 'minutes').format('h:mm A');

            if (interval === nextInterval) {
                setSelectedIntervals([selectedInterval, interval]);
            } else if (interval === prevInterval) {
                setSelectedIntervals([interval, selectedInterval])
            } else {
                setSelectedIntervals([interval]);
            }
        } else {
            // If two intervals are already selected, reset selectedIntervals to contain only the clicked interval
            setSelectedIntervals([interval]);
        }
    }

    function handleSubmit() {
        const startDate = moment(date);
        const startTime = moment(selectedIntervals[0], 'h:mm A');
        const appointmentDate = startDate
            .hours(startTime.hours())
            .minutes(startTime.minutes());
        const endAptDate = moment(appointmentDate).add(30 * selectedIntervals.length, 'minutes')
        var locationCombo = address + " " + city + ", " + state + " " + zipCode 
        const therapistInfo = (props.therapistData.find((data) => data.therapistID === therapist))

        const body = {
            userID: props.currentUser.userID,
            firstName: props.currentUser.firstName,
            lastName: props.currentUser.lastName,
            emailAddress: props.currentUser.emailAddress,
            locationAddress: locationCombo,
            therapistFirstName: therapistInfo.firstName,
            therapistLastName: therapistInfo.lastName,
            therapistID: therapistInfo.therapistID,
            appointmentStartDate: appointmentDate._d,
            appointmentEndDate: endAptDate._d,
            therapyType: therapyType
        }
        var aaa
        const testDate = appointmentData.find((data) => moment(data.appointmentStartDate)._d.toISOString() === startDate._d.toISOString() && props.currentUser.userID === data.userID)
        try { aaa = (moment(testDate.appointmentStartDate)._d.toISOString()) }
        catch { }
        // console.log(startDate)
        if (aaa !== startDate._d.toISOString()) {
            axios.post('https://localhost:7202/api/Appointment', body)
        }
        else {
            alert('Appointment Time Already Reserved!')
        }
    }

    const typesOfTherapy = ['Acupuncture', 'Stretching', 'Finish these', 'temp 2', 'temp 3'];

    return <div>
        <Calendar onChange={onChange} value={date} calendarType="US" />
        <select
            onChange={(e) => {
                const therapistID = e.target.value;
                setTherapist(therapistID);
                const selectedTherapist = props.therapistData.find((t) => t.therapistID === therapistID);
                setA(JSON.parse(selectedTherapist.availability));
            }}
        >
            <option> -- Select a therapist -- </option>
            {props.therapistData.map((therapist) => (
                <option value={therapist.therapistID}>
                    {therapist.firstName + ' ' + therapist.lastName}
                </option>
            ))}
        </select>

        <select
            onChange={(e) => {
                setTherapyType(e.target.value)
            }}
        >
            <option> -- Select a Therapy Type -- </option>
            {typesOfTherapy.map((type) => (
                <option value={type}>
                    {type}
                </option>
            ))}
        </select>
        <p>Appointments Available on {moment(date).format('MMMM Do YYYY')}</p>
        {a !== undefined &&

            a[day]?.map((c) => {
                const startTime = moment(c.start, 'h:mm A');
                const endTime = moment(c.end, 'h:mm A');
                const timeIntervals = [];
                let currentTime = startTime;
                const startDate = moment(date);
                let cnt = 0

                while (currentTime < endTime) {

                    const appointmentDate = (startDate
                        .hours(currentTime.hours())
                        .minutes(currentTime.minutes()));

                    const appointment = appointmentData.find(d => d.appointmentStartDate === appointmentDate._d.toISOString() && d.therapistID === therapist);
                    if (appointment && cnt === 0) {
                        currentTime.add(1, 'hours');
                        cnt++
                    }
                    else {
                        timeIntervals.push(currentTime.format('h:mm A'));
                        currentTime.add(30, 'minutes');
                    }
                }

                return (
                    <div>
                        {timeIntervals.map((time, key) => {
                            return (
                                <button key={key}
                                    onClick={() => handleIntervalClick(time)}
                                    style={{ background: selectedIntervals.includes(time) ? 'teal' : 'white' }}
                                >
                                    {time}
                                </button>
                            );
                        })}

                    </div>
                );
            })}
        <input id="addressInput" onChange={e => setAddress(e.target.value) }type="text" placeholder="Street Address" />
        <input id="cityInput" onChange={e => setCity(e.target.value) }type="text" placeholder="City" />
        <input id="stateInput" onChange={e => setState(e.target.value) }type="text" placeholder="State" />
        <input id="zipCodeInput" onChange={e => setZipCode(e.target.value) }type="text" placeholder="Zip Code" />

        <button onClick={handleSubmit}>Submit</button>
    </div>
}

export default UserCalendar;