import React from "react";
import UserHome from "./userHome";
import AdminHome from "./adminHome";
import TherapistHome from "./therapistHome";

const Home = ({ currentUser, futureAppointmentData, pastAppointmentData }) => {
        // var test = JSON.parse('{"Monday":[{"start":"09:00 AM", "end":"12:00 PM"},{"start":"01:00 PM", "end":"05:00 PM"}],"Tuesday":[{"start":"01:00 PM", "end":"05:00 PM"}],"Wednesday":[],"Thursday":[{"start":"09:00 AM", "end":"12:00 PM"}],"Friday":[{"start":"01:00 PM", "end":"05:00 PM"}],"Saturday":[],"Sunday":[]}')
        // console.log(test)
        // var test2 = JSON.stringify(test)
        // console.log(test2)
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