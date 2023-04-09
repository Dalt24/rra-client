import {React, useState, useEffect } from 'react';
import axios from 'axios';
import { validatePassword } from '../functions/security/validatePassword';
import { validateEmail } from '../functions/security/validateEmail';
import './classes.css';

const Login = ({ loggedInChanger, registeredChanger }) => {
  const [userEmail, setUserEmail] = useState("");
  const [passWordOne, setPassWordOne] = useState("");
  const [data, setData] = useState();

    useEffect(() => {
    axios.get(`https://localhost:7202/api/User`).then((response) => {
      setData(response.data);
    });
    }, []);

  
  const handleLogin = () => {
    // axios logic, check if userEmail is in database && verify password
    const currUser = data.find((user) => user.emailAddress === userEmail)
    // if login credentials don't match DB set loggedInChanger(false)
    // if login is successful set loggedInChanger(true)
    if (currUser !== null && currUser !== undefined)
    {
      if (currUser.userPassword === passWordOne)loggedInChanger(true)
      else loggedInChanger(false)
    }
    // set what user is Logged In to pull the respective credentials & appointment data
  };


  return (
    <div>
      <form className="form">
        <input id="emailInput" onChange={e => validateEmail(e.target.value) ? setUserEmail(e.target.value) : ( (event) => { event.className="passwordInput" })} type="text" placeholder="Email" />
        <input onChange={e => validatePassword(e.target.value) ? setPassWordOne(e.target.value) : ( () => e.className = "passwordInput")} type="password" placeholder="Password" />
        <button type="submit" onClick={() => { validatePassword(passWordOne) && handleLogin() }}>Login</button>
        <button className="container" onClick={() => registeredChanger(false)}>Don't Have an Account? Sign Up</button>
      </form>

      {userEmail && <><h1>UserEmail Access: {userEmail}</h1></>}
      {passWordOne && <><h1>passWordOne Access: {passWordOne}</h1></>}
    </div >

  );
};

export default Login;