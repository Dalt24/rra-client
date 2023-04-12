import React from "react";
// import axios from 'axios';


const Home = ({ currentUser }) => {
//     var test = JSON.parse('{"Monday":[{"start":"09:00 AM", "end":"12:00 PM"},{"start":"01:00 PM", "end":"05:00 PM"}],"Tuesday":[{"start":"01:00 PM", "end":"05:00 PM"}],"Wednesday":[],"Thursday":[{"start":"09:00 AM", "end":"12:00 PM"}],"Friday":[{"start":"01:00 PM", "end":"05:00 PM"}],"Saturday":[],"Sunday":[]}')
//     console.log(test)
//     var test2 = JSON.stringify(test)
//     console.log(test2)
//     console.log(currentUser)

//     const user = {
//   firstName: "dalli",
//   lastName: "dilli",
//   availability: test2,
//   emailAddress: "testemail@gmail.com",
//   therapistPassword: "false",
//   isAdmin: "false"
// }
//         axios.post(`https://localhost:7202/api/Therapist`, user)

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
                </div>
                <div className="col-md">
                    <h3>Upcoming Appointments</h3>
                    {/* map through cards showing all appointments after today */}
                </div>
                <div className="col-md">
                    <h3>Past Appointments</h3>
                    {/* map through cards showing all appointments before today */}
                </div>
            </div>
        </div>
    );
};

export default Home;