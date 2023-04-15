import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";
import { getApiBaseUrl } from "../../functions/api/getApi";
const UserHome = ({currentUser}) => {

  const [futureAppointmentData, setFutureAppointmentData] = useState([])
  const [pastAppointmentData, setPastAppointmentData] = useState([])

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined && currentUser.isTherapist === "false") {
      axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
        setPastAppointmentData(response.data?.filter((data) => data?.userID === currentUser.userID && moment(data?.appointmentStartDate).isBefore(moment())))
        setFutureAppointmentData(response.data?.filter((data) => data?.userID === currentUser.userID && moment(data?.appointmentStartDate).isAfter(moment())))
      });
    }
    else if (currentUser !== null && currentUser !== undefined && currentUser.isTherapist === "true") {
      axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
        setPastAppointmentData(response.data?.filter((data) => data?.therapistID === currentUser.therapistID && moment(data?.appointmentStartDate).isBefore(moment())))
        setFutureAppointmentData(response.data?.filter((data) => data?.therapistID === currentUser.therapistID && moment(data?.appointmentStartDate).isAfter(moment())))
      });
    }
  }, [currentUser])



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
                    <h3>{currentUser.firstName}</h3>
                    <h3>{currentUser.lastName}</h3>
                    <h3>{currentUser.emailAddress}</h3>
                    <h3>{currentUser.phoneNumber}</h3>
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

export default UserHome;