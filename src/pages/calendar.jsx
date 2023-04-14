import { React,  useState} from "react";
import axios from 'axios';
import Calendar from 'react-calendar'
import moment from "moment/moment";
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import TherapistCalendar from "./Calendar/therapistCalendar";


const CalendarPage = ({ currentUser, appointmentData, therapistData }) => {
  // console.log(currentUser)
  // const apt = appointmentData.find((a) => a.a)
  var test = JSON.parse('{"Monday":[{"start":"08:30 AM","end":"09:00 AM"},{"start":"09:00 AM","end":"09:30 AM"}],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[],"Saturday":[],"Sunday":[]}')
  var test2 = JSON.stringify(test)


  const [date, setDate] = useState(new Date().toISOString());
  const [day, setDay] = useState(moment().format('dddd'));
  const [a, setA] = useState();
  const [therapist, setTherapist] = useState('');
  const [selectedIntervals, setSelectedIntervals] = useState([]);

  function onChange(date) {
    setDate(date);
    setDay(moment(date).format('dddd'));
  }

  function handleIntervalClick(interval) {
    if (selectedIntervals.length === 0) {
      // If no intervals are selected, add the clicked interval to selectedIntervals
      setSelectedIntervals([interval]);
    } else if (selectedIntervals.length === 1) {
      // If one interval is already selected, check if the clicked interval is the next 30-minute interval
      const selectedInterval = selectedIntervals[0];
      const nextInterval = moment(selectedInterval, 'h:mm A').add(30, 'minutes').format('h:mm A');
      const prevInterval = moment(selectedInterval, 'h:mm A').subtract(30, 'minutes').format('h:mm A');

      if (interval === nextInterval) {
        setSelectedIntervals([selectedInterval, interval]);
      } else if (interval === prevInterval) {
        setSelectedIntervals([interval, selectedInterval])
      } else {
        setSelectedIntervals([interval]);
      }
    } else {
      // If two intervals are already selected, reset selectedIntervals to contain only the clicked interval
      setSelectedIntervals([interval]);
    }
  }

  function handleSubmit() {

    const startDate = moment(date);
    const startTime = moment(selectedIntervals[0], 'h:mm A');

    const appointmentDate = startDate
      .hours(startTime.hours())
      .minutes(startTime.minutes());

    const endAptDate = moment(appointmentDate).add(30 * selectedIntervals.length, 'minutes')

    // console.log(appointmentDate._d)
    // console.log(endAptDate._d)

    var address = "1175 13th Street East, 1212A"
    const therapistInfo = (therapistData.find((data) => data.therapistID === therapist))

    const body = {
      userID: currentUser.userID,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      emailAddress: currentUser.emailAddress,
      locationAddress: address,
      therapistFirstName: therapistInfo.firstName,
      therapistLastName: therapistInfo.lastName,
      therapistID: therapistInfo.therapistID,
      appointmentStartDate: appointmentDate._d,
      appointmentEndDate: endAptDate._d,
      therapyType: ""
    }
    var aaa
    const testDate = appointmentData.find((data) => moment(data.appointmentStartDate)._d.toISOString() === startDate._d.toISOString())
    try { aaa = (moment(testDate.appointmentStartDate)._d.toISOString()) }
    catch { }
    console.log(startDate)
    if (aaa !== startDate._d.toISOString()) {
      axios.post('https://localhost:7202/api/Appointment', body)
    }
    else {
      console.log('Appoint Date Already Exists')
    }

  }


  function handleAdmin(){
    const body = {
      firstName: "Test",
      lastName: "Test",
      availability: test2,
      emailAddress: "test.test@gmail.com",
      therapistPassword: "TestPass1!",
      isAdmin: "false",
      isTherapist: "true"
    }
    axios.post('https://localhost:7202/api/Therapist', body)
  }

  if (currentUser.isAdmin === "false" && currentUser.isTherapist === "false") {
    return (
      <div>
        {console.log(therapistData)}
        <Calendar onChange={onChange} value={date} calendarType="US" />
        <select
          onChange={(e) => {
            setTherapist(e.target.value);
            console.log(e.target.value)
            // console.log(therapist)
            // console.log(therapistData)
            setA(JSON.parse(therapistData.find((t) => t.therapistID === therapist).availability))            // setA());
            console.log(a)
          }}
        >
          <option> -- Select a therapist -- </option>
          {therapistData.map((therapist) => (
            <option value={therapist.therapistID}>
              {therapist.firstName + ' ' + therapist.lastName}
            </option>
          ))}
        </select>
        <p>Appointments Available on {moment(date).format('MMMM Do YYYY')}</p>
            {/* {console.log(a)} */}
        {a !== undefined &&
          a[day]?.map((c) => {
            const startTime = moment(c.start, 'h:mm A');
            const endTime = moment(c.end, 'h:mm A');
            const timeIntervals = [];

            let currentTime = startTime;

            while (currentTime < endTime) {
              timeIntervals.push(currentTime.format('h:mm A'));
              currentTime.add(30, 'minutes');
            }

            return (
              <div>
                {timeIntervals.map((time, key) => (
                  <button key={key}
                    onClick={() => handleIntervalClick(time)}
                    style={{ background: selectedIntervals.includes(time) ? 'teal' : 'white' }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            );
          })}

        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  } else if (currentUser.isAdmin === "true") {





    return (<div>
      <>hi



      </>
      <button onClick={handleAdmin}>Submit</button>




    </div>)
  }
  else if (currentUser.isTherapist === "true") {
    return <TherapistCalendar />
  }
}

export default CalendarPage;