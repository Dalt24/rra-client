import React, { useState } from 'react';
import { validatePassword } from '../functions/security/validatePassword';
import { validateEmail } from '../functions/security/validateEmail';
import './classes.css';

const Login = ({ loggedInChanger, registeredChanger }) => {
  const [userEmail, setUserEmail] = useState("");
  const [passWordOne, setPassWordOne] = useState("");
  
  const handleLogin = () => {
    // axios logic, check if userEmail is in database && verify password

    // if login credentials don't match DB set loggedInChanger(false)
    // if login is successful set loggedInChanger(true)

    // set what user is Logged In to pull the respective credentials & appointment data
    (userEmail === "dcw.dalton@gmail.com" && passWordOne === "TestPass1!") ? loggedInChanger(true) : loggedInChanger(false)
  };


  return (
    <div>
      <form className="form">
        <input id="emailInput" onChange={e => validateEmail(e.target.value) ? setUserEmail(e.target.value) : ( (event) => { event.className="passwordInput" })} type="text" placeholder="Email" />
        <input  type="password" onChange={e => validatePassword(e.target.value) ? setPassWordOne(e.target.value) : ( () => e.className = "passwordInput")} email="firstPass" placeholder="Password" />
        <button type="submit" onClick={() => { validatePassword(passWordOne) && handleLogin() }}>Login</button>
        <button className="container" onClick={() => registeredChanger(false)}>Don't Have an Account? Sign Up</button>
      </form>

      {userEmail && <><h1>UserEmail Access: {userEmail}</h1></>}
      {passWordOne && <><h1>passWordOne Access: {passWordOne}</h1></>}
    </div >

  );
};

export default Login;