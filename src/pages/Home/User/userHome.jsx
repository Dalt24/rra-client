import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import { getApiBaseUrl } from "../../../functions/api/getApi";
import { useNavigate } from 'react-router-dom'
import '../../classes.css';



const UserHome = ({ currentUser }) => {
    const navigate = useNavigate();
    const [futureAppointmentData, setFutureAppointmentData] = useState([])
    const [pastAppointmentData, setPastAppointmentData] = useState([])
    const [appointmentData, setAppointmentData] = useState([])

    useEffect(() => {
        if (currentUser !== null && currentUser !== undefined && currentUser.isTherapist === "false") {
            axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
                setPastAppointmentData(response.data?.filter((data) => data?.userID === currentUser.userID && moment(data?.appointmentStartDate).isBefore(moment())))
                setFutureAppointmentData(response.data?.filter((data) => data?.userID === currentUser.userID && moment(data?.appointmentStartDate).isAfter(moment())))
                setAppointmentData(response.data)
            });
        }
        else if (currentUser !== null && currentUser !== undefined && currentUser.isTherapist === "true") {
            axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
                setPastAppointmentData(response.data?.filter((data) => data?.therapistID === currentUser.therapistID && moment(data?.appointmentStartDate).isBefore(moment())))
                setFutureAppointmentData(response.data?.filter((data) => data?.therapistID === currentUser.therapistID && moment(data?.appointmentStartDate).isAfter(moment())))
                setAppointmentData(response.data)
            });
        }
    }, [currentUser])


    const handleCancel = (appointmentID) => {
        const arrrr = appointmentData.find((data) => data.appointmentID === appointmentID)
        arrrr.isCanceled = "true"
        axios.put(`${getApiBaseUrl()}/api/Appointment/${appointmentID}`, arrrr)
        navigate('/home', { replace: true })
    }


    return (<div>

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
                    <h3>{currentUser.firstName + " "}{currentUser.lastName}</h3>
                    
                    <h3>{currentUser.emailAddress}</h3>
                    <h3>{currentUser.phoneNumber}</h3>
                </div>

                <div className="col-md">
                    <h3>Upcoming Appointments</h3>
                    <ul >
                        {futureAppointmentData.filter((d) => d.isCanceled === "false").sort((a, b) => moment(a.appointmentStartDate) - moment(b.appointmentStartDate)).map((appointment) => (
                            <li key={appointment.appointmentID} >
                                <hr />
                                <div className="row">
                                    <span className="col-md-10">
                                        <div style={{ fontSize: "16px" }}>{moment(appointment.appointmentStartDate).format('dddd MMMM D, h:mm A')} - {moment(appointment.appointmentEndDate).format('h:mm A')}</div>
                                        <div>{appointment.locationAddress}</div>
                                        <div>{appointment.therapyType} with {appointment.therapistFirstName} {appointment.therapistLastName}</div>
                                    </span>

                                    <span className="col-md-2" style={{ paddingTop: "5%", marginLeft: "-4%" }}>
                                        <button className="handleCancel" key={appointment.appointmentID} onClick={() => { handleCancel(appointment.appointmentID) }}>Cancel</button>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md">
                    <h3>Past Appointments</h3>
                    <ul>
                        {pastAppointmentData.map((appointment) => (
                            <li key={appointment.appointmentID}>
                                <hr />
                                <div>{moment(appointment.appointmentStartDate).format('dddd MMMM D, h:mm A')} - {moment(appointment.appointmentEndDate).format('h:mm A')}</div>
                                <div>{appointment.locationAddress}</div>
                                <div>{appointment.therapyType} with {appointment.therapistFirstName} {appointment.therapistLastName}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    </div>)
}

export default UserHome;