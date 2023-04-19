import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar'
import { getApiBaseUrl } from "../../functions/api/getApi";
import './userCalendar.css';

const AdminCalendar = (props) => {

    // const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString());
    const [day, setDay] = useState(moment().format('dddd'));
    const [a, setA] = useState();
    const [therapist, setTherapist] = useState('');
    const [selectedIntervals, setSelectedIntervals] = useState([]);
    const [appointmentData, setAppointmentData] = useState([])




    useEffect(() => {
        if (props.currentUser !== null && props.currentUser !== undefined && props.currentUser.isTherapist === "false") {
            axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
                setAppointmentData(response.data)
            });
        }
        else if (props.currentUser !== null && props.currentUser !== undefined && props.currentUser.isTherapist === "true") {
            axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
                setAppointmentData(response.data)
            });
        }
    }, [props.currentUser])

    function onChange(date) {
        setDate(date);
        setDay(moment(date).format('dddd'));
    }


    function handleIntervalClick(interval) {
        if (selectedIntervals?.length === 0) {
            // If no intervals are selected, add the clicked interval to selectedIntervals
            setSelectedIntervals([interval]);
        } else if (selectedIntervals?.length === 1) {
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


    return <div>

        <span className="centerCalendar"><Calendar onChange={onChange} value={date} calendarType="US" /></span>

        <span className="centerCalendar">
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
        </span>

        <div className="centerTimeChoices">
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
                    const appointment = appointmentData.find(d => d.appointmentStartDate === appointmentDate._d.toISOString() && d.therapistID === therapist && d.isCanceled !== "true");
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
                    <span>
                        {timeIntervals.map((time, key) => {
                            return (
                                <button
                                    className="buttonStyling"
                                    key={key}
                                    onClick={() => handleIntervalClick(time)}
                                    style={{ background: selectedIntervals.includes(time) ? 'teal' : 'white'}}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </span>
                );
            })}</div>




    </div>
}

export default AdminCalendar;