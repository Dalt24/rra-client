import { React, useEffect, useState } from "react";
import axios from 'axios';
import Calendar from 'react-calendar'
import moment from "moment/moment";
import 'react-calendar/dist/Calendar.css';
import './calendar.css';


const CalendarPage = (currentUser) => {

  const currUser = currentUser.currentUser
  const [data, setData] = useState([]);
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

      if (interval === nextInterval) {
        setSelectedIntervals([selectedInterval, interval]);
      } else {
        setSelectedIntervals([interval]);
      }
    } else {
      // If two intervals are already selected, reset selectedIntervals to contain only the clicked interval
      setSelectedIntervals([interval]);
    }
  }

  function handleSubmit() {
    // console.log('Selected Intervals:', selectedIntervals);
    // let startDate = moment(date);
    // let endDate = startDate.add(moment(selectedIntervals[0]))
    // console.log(endDate)
    // console.log(moment(date) + (moment(selectedIntervals[0])))
    const startDate = moment(date);
    const startTime = moment(selectedIntervals[0], 'h:mm A');

    const appointmentDate = startDate
    .hours(startTime.hours())
    .minutes(startTime.minutes());
    
    const endAptDate = moment(appointmentDate).add(30*selectedIntervals.length, 'minutes')
    
      console.log(appointmentDate)
      console.log(endAptDate)
  }

  useEffect(() => {
    axios.get(`https://localhost:7202/api/Therapist`).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <select
        onChange={(e) => {
          setTherapist(e.target.value);
          setA(JSON.parse((data.find((data) => data.therapistID === e.target.value)).availability));
        }}
      >
        <option> -- Select a therapist -- </option>
        {data.map((therapist) => (
          <option value={therapist.therapistID}>
            {therapist.firstName + ' ' + therapist.lastName}
          </option>
        ))}
      </select>
      <Calendar onChange={onChange} value={date} calendarType="US" />
      <p>Appointments Available on {moment(date).format('MMMM Do YYYY')}</p>

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
              {timeIntervals.map((time) => (
                <button
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
}

export default CalendarPage;