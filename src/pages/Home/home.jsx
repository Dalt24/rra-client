import React from "react";
import UserHome from "./User/userHome";
import AdminHome from "./Admin/adminHome";
import TherapistHome from "./Therapist/therapistHome";

const Home = ({ currentUser, futureAppointmentData, pastAppointmentData }) => {
    console.log(currentUser)
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
    else return <div>Not A User, Reload & Log in Again</div>
};

export default Home;