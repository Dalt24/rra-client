import './help.css'

const Help = ({currentUser}) => {
    // largely a subjective page, should just be professional and well written (why I'm not doing it HAhahaha.....I need sleep)
    // https://ipage.com/blog/what-a-website-help-page-need/




    // functions or variables can be declared above the return
    // everything inside of the return will be "rendered" on the page selected
    return (
        <div className='helpDiv'>

            <h2>How To Navigate RRA</h2>

            <h3>Login Page</h3>
            <ul>
                <li>Enter your email and password to login</li>
                <li>To create a new account click create account</li>
                <li>Enter the required information into the fields provided</li>
                <li>After finishing the account creation you will be directed back to the login</li>
            </ul>
            <h3>Scheduling an Appointment</h3>
            <ul>
                <li>To schedule an appointment click the calendar on the top right of the page</li>
                <li>After clicking the calendar you can select a date</li>
                <li>Following the date you can select a physical therapist and see their available times</li>
                <li>After selecting the time you want hit submit</li>
                <li>A form will pop up asking you to pick your therapy type and enter in your address</li>
                <li>After entering your information please hit confirm</li>
            </ul>
            <h3>Notifications</h3>
            <ul>
                <li>To check notifications click the bell at the top</li>
                <li>A drop down will display with recent changes to your appointments</li>
            </ul>
            <h3>Canceling and Viewing Appointments</h3>
            <ul>
                <li>To view previous and upcoming appointments open the home page</li>
                <li>Your upcoming appointments will be listed in the middle and your previous appointments on the right</li>
                <li>To cancel an appointment simply click the cancel button next to the appointment that you would like to cancel</li>
            </ul>
            <h2>Contact Us:</h2>
            <a href='mailto:Support@rratuscaloosa.com'><h4>Support@rratuscaloosa.com</h4></a>
            <h4>205-867-5309</h4>

        </div>)
}


export default Help;