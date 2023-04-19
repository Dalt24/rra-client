import './profile.css';






// may ask Erin about having basic stats && reports on the user profile (# of appointments, # canceled, etc)

const Profile = ({ currentUser }) => {

    // currentUser is an object with first + last name and the basic user info from registration

    // functions or variables can be declared above the return

    // everything inside of the return will be "rendered" when the page is selected

    return (

        <div>
            <h1 className='moveDown'>Profile Page</h1>

            <div className='centerText'>

                <table className='centerTable'>

                    <tr>

                        <th className='tablePadding'><b>First Name</b></th>

                        <th className='tablePadding'><b>Last Name</b></th>

                        <th className='tablePadding'><b>Email</b></th>

                        {currentUser.phoneNumber && <th className='tablePadding'><b>Phone Number</b></th>}

                    </tr>

                    <tr>

                        <td className='tablePadding1'>{currentUser.firstName}</td>

                        <td className='tablePadding1'>{currentUser.lastName}</td>

                        <td className='tablePadding1'>{currentUser.emailAddress}</td>

                        <td className='tablePadding1'>{currentUser.phoneNumber}</td>

                    </tr>

                </table>

            </div>




        </div>)

}




export default Profile;