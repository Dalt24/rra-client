import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const Home = ({ currentUser }) => {
        var test = JSON.parse('{"Monday":[{"start":"09:00 AM", "end":"12:00 PM"},{"start":"01:00 PM", "end":"05:00 PM"}],"Tuesday":[{"start":"01:00 PM", "end":"05:00 PM"}],"Wednesday":[],"Thursday":[{"start":"09:00 AM", "end":"12:00 PM"}],"Friday":[{"start":"01:00 PM", "end":"05:00 PM"}],"Saturday":[],"Sunday":[]}')
        console.log(test)
        var test2 = JSON.stringify(test)
        console.log(test2)

    const [appointmentData, setAppointmentData] = useState([])
    const [pastAppointmentData, setPastAppointmentData] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7202/api/Appointment`).then((response) => {
            setAppointmentData(response.data.filter((data) => data.userID === currentUser.userID && moment(data.appointmentStartDate).isAfter(moment())))
            setPastAppointmentData(response.data.filter((data) => data.userID === currentUser.userID && moment(data.appointmentStartDate).isBefore(moment())))
        });
    }, [currentUser]);
    if (currentUser.isAdmin === "false" && currentUser.isTherapist === "false") {
        return (
            <div className="container">

                <h1>
                    {"Welcome " + currentUser.firstName + " " + currentUser.lastName}
                    <br />
                    <br />

                </h1>
                <div className="row">
                    <div className="col-md">
                        <h3>User Information</h3>
                        {/* static user info from currentUser prop */}
                        <h3>{currentUser.firstName}</h3>
                        <h3>{currentUser.lastName}</h3>
                        <h3>{currentUser.emailAddress}</h3>
                        <h3>{currentUser.phoneNumber}</h3>
                    </div>
                    <div className="col-md">
                        <h3>Upcoming Appointments</h3>
                        <ul>
                            {appointmentData.map((appointment) => (
                                <li key={appointment.appointmentID}>
                                    {/* <div>{appointment.firstName} {appointment.lastName}</div> */}
                                    <hr />
                                    <div>{moment(appointment.appointmentStartDate).format('dddd MMMM D, h:mm A')} - {moment(appointment.appointmentEndDate).format('h:mm A')}</div>
                                    <div>{appointment.locationAddress}</div>
                                    <div>{appointment.therapistFirstName} {appointment.therapistLastName}</div>
                                </li>
                            ))}
                        </ul>
                        {/* map through cards showing all appointments after today */}
                    </div>
                    <div className="col-md">
                        <h3>Past Appointments</h3>
                        {/* map through cards showing all appointments before today */}
                        <ul>
                            {pastAppointmentData.map((appointment) => (
                                <li key={appointment.appointmentID}>
                                    {/* <div>{appointment.firstName} {appointment.lastName}</div> */}
                                    <hr />
                                    <div>{moment(appointment.appointmentStartDate).format('dddd MMMM D, h:mm A')} - {moment(appointment.appointmentEndDate).format('h:mm A')}</div>
                                    <div>{appointment.locationAddress}</div>
                                    <div>{appointment.therapistFirstName} {appointment.therapistLastName}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    else if (currentUser.isAdmin === "true")
    {
        return (<div>admin</div>)
    }
    else {
        return (<div>Therapist</div>)
    }
};

export default Home;