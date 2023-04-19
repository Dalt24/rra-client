import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import classes from "../Navbar/classes.css"
import BellImg from "./images/bell-860.png"
import CalendarImg from "./images/calendar-icon-png-4110.png"
import MenuImg from "./images/menu-icon-19345.png"
import { useNavigate } from 'react-router-dom'
import moment from "moment"

export default function Navbar({ setIsLoggedIn, appointmentData, currentUser }) {
  return (
    <nav className="nav">
      <Link to="/home" className={classes.siteTitle}>
        Remote Rehab Association
      </Link>
      <ul>
        <CustomLink to="/calendar"><img src={CalendarImg} alt="Calendar Button Icon"></img></CustomLink>
        <CustomLink to="/notifications" appointmentData={appointmentData} currentUser={currentUser}><img src={BellImg} alt="Notification Bell Icon" /></CustomLink>
        <CustomLink to="/menu" setIsLoggedIn={setIsLoggedIn}><img src={MenuImg} alt="Menu Button Icon"></img></CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ setIsLoggedIn, appointmentData, currentUser, to, children, ...props }) {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogOut = () => {
    setIsMenuOpen(false);
    setIsLoggedIn(false);
    navigate('/', { replace: true })
    window.location.reload(false);
  };

  return (
    <li className={isActive ? "active" : ""}>
      {to === '/menu' ? (
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropBtn" onClick={handleMenuClick}>
            {children}
          </button>
          {isMenuOpen && (
            <div className="dropdown-content">
              <Link to="/user-profile">Profile</Link>
              <Link to="/help-page">Help</Link>
              <Link to="/change-password">Change Password</Link>
              <Link to="" onClick={handleLogOut}>Log Out</Link>
            </div>
          )}
        </div>
      ) : to === '/notifications' ? (
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropBtn" onClick={handleMenuClick}>
            {children}
          </button>
          {isMenuOpen && (
            <div className="dropdown-notification">
              <h3>Recent Changes</h3>
              {currentUser.userID && appointmentData.sort((b, a) => moment(a.appointmentStartDate) - moment(b.appointmentStartDate)).filter((data) => data?.userID === currentUser.userID).map((appointment, index) => (
                <div key={index}>
                  {(appointment.isCanceled === "true") ? <p>{appointment.therapyType + " On " + moment(appointment.appointmentStartDate).format('MMMM Do') + " Canceled"}</p>
                    : null}
                  {/* <p>{appointment.date}</p> */}
                </div>
              ))}
              {currentUser.therapistID && appointmentData.sort((b, a) => moment(a.appointmentStartDate) - moment(b.appointmentStartDate)).filter((data) => data?.therapistID === currentUser.therapistID  && moment(data?.appointmentStartDate).isAfter(moment())).map((appointment, index) => (
                <div key={index}>
                  {(appointment.isCanceled === "true") ? <p>{"Cancellation: " + appointment.firstName +" "+ appointment.lastName+ " On " + moment(appointment.appointmentStartDate).format('MMMM Do') + " "}</p>
                    : <p>{" New Appointment: " +appointment.firstName + " " + appointment.lastName + " " + moment(appointment.appointmentStartDate).format('MMMM Do YYYY')}</p>}
                  {/* <p>{appointment.date}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link to={to} {...props}>
          {children}
        </Link>
      )}
    </li>
  )
}