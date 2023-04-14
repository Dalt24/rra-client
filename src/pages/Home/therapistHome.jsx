import moment from "moment";
import { useNavigate } from 'react-router-dom'
// import CalendarPage from "../calendar";
import './classes.css';

const TherapistHome = ({ currentUser, futureAppointmentData, pastAppointmentData }) => {
    const navigate = useNavigate();
    return (<div>

        <div className="container">
            <h1>
                {"Welcome " + currentUser.firstName + " " + currentUser.lastName}
                <br />
                <br />

            </h1>
            <div className="row">
                <div className="col-md">

                    <h3>Click to Update Schedule</h3>
                    {/* static user info from currentUser prop */}
                    <button type="submit" onClick={() => {
                        navigate('/calendar', {replace: true})
                }}>Login</button>

                </div>
                <div className="col-md">
                    <h3>Upcoming Appointments</h3>
                    <ul>
                        {futureAppointmentData.map((appointment) => (
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

    </div>)
}

export default TherapistHome;