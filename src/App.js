import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import Menu from './pages/menu.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Notification from './pages/notifications.jsx'
import CalendarPage from './pages/Calendar/calendar.jsx'
import Home from './pages/Home/home.jsx'
import { getApiBaseUrl } from './functions/api/getApi.js'


function App() {

  const [data, setData] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [currentUser, setCurrentUser] = useState()
  const [therapistData, setTherapistData] = useState();
  const [futureAppointmentData, setFutureAppointmentData] = useState([])
  const [pastAppointmentData, setPastAppointmentData] = useState([])
  const [appointmentData, setAppointmentData] = useState([])

  useEffect(() => {
    axios.get(`${getApiBaseUrl()}/api/Therapist`).then((response) => {
      setTherapistData(response.data);
    });
    axios.get(`${getApiBaseUrl()}/api/User`).then((response) => {
      setData(response.data);
    });
  }, []);

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


  return (
    <>
      { // Loads Register Page, triggered when user clicks 'sign up' button on login page
        (isRegistered === false) && <Register registeredChanger={setIsRegistered} data={data} />
      }

      { // default Login Screen, Updates if the user is a valid user
        (isRegistered === true) &&
          (isLoggedIn === false) ?
          <>
            <Login
              setCurrentUser={setCurrentUser}
              loggedInChanger={setIsLoggedIn}
              registeredChanger={setIsRegistered}
              data={data}
              therapistData={therapistData}
            />
          </> :
          (isRegistered === true) && // default Home Screen, loads when user is Registered && Logged in Succesfully
          <>
            <Router>
              <Navbar />
              <Routes>
                <Route path='/' element={<Navigate replace to='/home' />} />
                <Route path='/home' element={
                  <Home
                    currentUser={currentUser}
                    futureAppointmentData={futureAppointmentData}
                    pastAppointmentData={pastAppointmentData}
                  />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/notifications' element={<Notification />} />
                <Route path='/calendar' element={
                  <CalendarPage
                    currentUser={currentUser}
                    therapistData={therapistData}
                    appointmentData={appointmentData}
                  />} />
              </Routes>
            </Router>
          </>
      }

    </>
  )
}

export default App
