import { Link, useMatch, useResolvedPath } from "react-router-dom"
import classes from "../Navbar/classes.css"
import BellImg from "./images/bell-860.png"
import CalendarImg from "./images/calendar-icon-png-4110.png"
import MenuImg from "./images/menu-icon-19345.png"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/home" className={classes.siteTitle}>
        Remote Rehab Association
      </Link>
      <ul>
        <CustomLink to="/calendar"><img src={CalendarImg} alt="Calendar Button Icon"></img></CustomLink>
        <CustomLink to="/notifications"><img src={BellImg} alt="Notification Bell Icon" /></CustomLink>
        <CustomLink to="/menu"><img src={MenuImg} alt="Menu Button Icon"></img></CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}