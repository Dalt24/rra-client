import moment from "moment";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { getApiBaseUrl } from "../../../functions/api/getApi";
import '../../classes.css';

const TherapistHome = ({ currentUser, futureAppointmentData, pastAppointmentData }) => {
    const navigate = useNavigate();



    const handleCancel = (appointmentID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this appointment?")
        if (confirmDelete) {
            const arrrr = futureAppointmentData.find((data) => data.appointmentID === appointmentID)
            arrrr.isCanceled = "true"
            axios.put(`${getApiBaseUrl()}/api/Appointment/${appointmentID}`, arrrr)
            navigate('/home', { replace: true })
        }
    }

    return (<div>

        <div className="container">
            <div className="head">
                <span className="header">{"Welcome " + currentUser.firstName + " " + currentUser.lastName}</span>
                <br />
                <br />

            </div>
            <div className="row">
                <div className="col-md user" style={{minHeight:"100px"}}>


                    {/* static user info from currentUser prop */}
                    <button className="handleCancel" type="submit" onClick={() => {
                        navigate('/calendar', { replace: true })
                    }}><h3>Click to Update Schedule</h3></button>

                </div>
                <div className="col-md user">
                    <h3>Upcoming Appointments</h3>
                    <ul>
                        {futureAppointmentData.filter((appointment) => appointment.isCanceled !== "true").sort((a, b) => moment(a.appointmentStartDate) - moment(b.appointmentStartDate)).map((appointment) => {
                            const appointmentStartDate = moment(appointment.appointmentStartDate);
                            const isToday = appointmentStartDate.isSame(moment(), 'day');
                            return (
                                <li key={appointment.appointmentID}>
                                    <hr />
                                    <div className="row">
                                        <span className="col-md-10">
                                            <div>
                                                {appointmentStartDate.format('dddd MMMM D, h:mm A')} -{' '}
                                                {moment(appointment.appointmentEndDate).format('h:mm A')}
                                            </div>
                                            {isToday && <div>{appointment.locationAddress}</div>}
                                        <div>{appointment.therapyType} for {appointment.firstName} {appointment.lastName}</div>

                                        </span>
                                        <span className="col-md-2" style={{ paddingTop: "2%", marginLeft: "-5%" }}>
                                            <button className="handleCancel" key={appointment.appointmentID} onClick={() => { handleCancel(appointment.appointmentID) }}>Cancel</button>
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {/* map through cards showing all appointments after today */}
                </div>
                <div className="col-md user">
                    <h3>Past Appointments</h3>
                    {/* map through cards showing all appointments before today */}
                    <ul>
                        {pastAppointmentData.sort((b, a) => moment(a.appointmentStartDate) - moment(b.appointmentStartDate)).map((appointment) => (
                            <li key={appointment.appointmentID}>
                                {console.log(appointment)}
                                {/* <div>{appointment.firstName} {appointment.lastName}</div> */}
                                <hr />
                                <div>{moment(appointment.appointmentStartDate).format('dddd MMMM D, h:mm A')} - {moment(appointment.appointmentEndDate).format('h:mm A')}</div>
                                {/* <div>{appointment.locationAddress}</div> */}
                                <div>{appointment.firstName} {appointment.lastName}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    </div>)
}

export default TherapistHome;