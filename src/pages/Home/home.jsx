import React from "react";
import UserHome from "./userHome";
import AdminHome from "./adminHome";
import TherapistHome from "./therapistHome";

const Home = ({ currentUser, futureAppointmentData, pastAppointmentData }) => {

    if (currentUser.isAdmin === "false" && currentUser.isTherapist === "false") {
        return (
            <UserHome
                currentUser={currentUser}
                futureAppointmentData={futureAppointmentData}
                pastAppointmentData={pastAppointmentData}
            />);
    }
    else if (currentUser.isAdmin === "true") {
        return (
            <AdminHome
                currentUser={currentUser}
                futureAppointmentData={futureAppointmentData}
                pastAppointmentData={pastAppointmentData}
            />)
    }
    else if(currentUser.isTherapist === "true"){
        return (
            <TherapistHome
                currentUser={currentUser}
                futureAppointmentData={futureAppointmentData}
                pastAppointmentData={pastAppointmentData}
            />)
    }
    else return <div>No User, Reload & Log in Again</div>
};

export default Home;