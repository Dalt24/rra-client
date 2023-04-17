import './profile.css';



// may ask Erin about having basic stats && reports on the user profile (# of appointments, # canceled, etc)
const Profile = ({ currentUser }) => {
    
    console.log(currentUser)
    // currentUser is an object with first + last name and the basic user info from registration


    // functions or variables can be declared above the return
    // everything inside of the return will be "rendered" when the page is selected
    return (
        <div>

            <h1 className="horribleBlue">HI PROFILE PAGE</h1>
            <div>{currentUser.firstName}</div>

        </div>)
}

export default Profile;