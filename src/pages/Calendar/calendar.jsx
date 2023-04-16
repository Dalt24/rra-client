import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import TherapistCalendar from "./therapistCalendar";
import UserCalendar from "./userCalendar";
import AdminCalendar from './adminCalendar';


const CalendarPage = (props) => {

  if (props.currentUser.isAdmin === "false" && props.currentUser.isTherapist === "false") {
    return <UserCalendar currentUser={props.currentUser} therapistData={props.therapistData}/>
  } else if (props.currentUser.isAdmin === "true") {
    return <AdminCalendar />
  }
  else if (props.currentUser.isTherapist === "true") {
    return <TherapistCalendar currentUser={props.currentUser} therapistData={props.therapistData} />
  }
}

export default CalendarPage;