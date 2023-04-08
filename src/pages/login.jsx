import React, { useState } from 'react';
import { validatePassword } from '../functions/security/validatePassword';
import { validateEmail } from '../functions/security/validateEmail';
import './classes.css';

const Login = ({ loggedInChanger, isRegisteredChanger }) => {
  const [userEmail, setUserEmail] = useState("");
  const [passWordOne, setPassWordOne] = useState("");
  
  const handleLogin = () => {

    // axios logic, check if userEmail is in database && verify password
    loggedInChanger(true)
  };


  return (
    <div>
      <form className="form">
        <input id="emailInput" onChange={e => validateEmail(e.target.value) ? setUserEmail(e.target.value) : ( (event) => { event.className="passwordInput" })} type="text" placeholder="Email" />
        <input  type="password" onChange={e => validatePassword(e.target.value) ? setPassWordOne(e.target.value) : ( () => e.className = "passwordInput")} Email="firstPass" placeholder="Password" />
        <button type="submit" onClick={() => { validatePassword(passWordOne) && handleLogin() }}>Login</button>
        <button className="container" onClick={() => isRegisteredChanger(false)}>Don't Have an Account? Sign Up</button>
      </form>

      {userEmail && <><h1>UserEmail Access: {userEmail}</h1></>}
      {passWordOne && <><h1>passWordOne Access: {passWordOne}</h1></>}
    </div >

  );
};

export default Login;