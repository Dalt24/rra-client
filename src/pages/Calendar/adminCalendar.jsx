import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar'
import { getApiBaseUrl } from "../../functions/api/getApi";
import './userCalendar.css';

const AdminCalendar = (props) => {

    const [date, setDate] = useState(new Date().toISOString());
    const [day, setDay] = useState(moment().format('dddd'));
    const [a, setA] = useState();
    const [therapist, setTherapist] = useState('');
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




    return <div>

        <span style={{ marginTop: "10px" }} className="centerCalendar"><Calendar onChange={onChange} value={date} calendarType="US" /></span>

        <span className="centerCalendar" style={{ marginTop: "10px" }}>
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

        {/* <p>Appointments Available on {moment(date).format('MMMM Do YYYY')}</p> */}
        <div className="time-slots-container" style={{ marginTop: "10px" }}>
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
                                        className="button2"
                                        key={key}
                                        style={{
                                            background:"white"
                                        }}
                                    >
                                        {time}
                                    </button>
                                );
                            })}
                        </span>
                    );
                })}</div>



        {/* Change state Input to a dropdown of every state with search feature?? */}

    </div>
}

export default AdminCalendar;