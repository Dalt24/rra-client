import React, { useState } from 'react'
import Navbar from './components/Navbar/navbar.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate }
  from 'react-router-dom'
import Menu from './pages/menu.jsx'
import Login from './pages/login.jsx'
import Notification from './pages/notifications.jsx'
import Calendar from './pages/calendar.jsx'
import Home from './pages/home.jsx'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      {isLoggedIn === false ?
        <>
          <Login loggedInChanger={setIsLoggedIn}/>
        </> :
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Navigate replace to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/notifications' element={<Notification />} />
              <Route path='/calendar' element={<Calendar />} />
            </Routes>
          </Router>
        </>}
    </>
  )
}

export default App
