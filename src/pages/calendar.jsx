import { React, useEffect, useState } from "react";
import axios from 'axios';
import Calendar from 'react-calendar'
import moment from "moment/moment";
import 'react-calendar/dist/Calendar.css';
import './calendar.css';


const CalendarPage = (currentUser) => {

  const currUser = currentUser.currentUser
  const [data, setData] = useState();
  const [date, setDate] = useState(new Date().toISOString())

  function onChange(date) {
    // change results based on calendar date click
    setDate(date)
    console.log(date)
    console.log(new Date())
  }
  useEffect(() => {
    axios.get(`https://localhost:7202/api/Appointment`).then((response) => {
      setData(response.data);
    });
  }, []);


  return (
    <div>
      <Calendar onChange={onChange} value={date} calendarType="US" />
      <p>Selected Date is {moment(date).format('MMMM Do YYYY')}</p>
    </div >
  );
};

export default CalendarPage;