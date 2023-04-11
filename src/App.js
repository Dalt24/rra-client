import React, { useState } from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate }from 'react-router-dom'
import Menu from './pages/menu.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Notification from './pages/notifications.jsx'
import CalendarPage from './pages/calendar.jsx'
import Home from './pages/home.jsx'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [currentUser, setCurrentUser] = useState()
  return (
    <>

      { // Loads Register Page, triggered when user clicks 'sign up' button on login page
        (isRegistered === false) && <Register registeredChanger={setIsRegistered}/> 
      }

      { // default Login Screen, Updates if the user is a valid user
        (isRegistered === true) &&
        (isLoggedIn === false) ?
        <> 
            <Login
              setCurrentUser={setCurrentUser}
              loggedInChanger={setIsLoggedIn}
              registeredChanger={setIsRegistered}
            />
          </> :
          (isRegistered === true) && // default Home Screen, loads when user is Registered && Logged in Succesfully
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Navigate replace to='/home' />} />
              <Route path='/home' element={<Home currentUser={currentUser}/>} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/notifications' element={<Notification />} />
              <Route path='/calendar' element={<CalendarPage currentUser={currentUser} />} />
            </Routes>
          </Router>
          </>
      }

    </>
  )
}

export default App
