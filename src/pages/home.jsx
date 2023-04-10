import React from "react";


const Home = ({ currentUser }) => {
    console.log(currentUser)
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