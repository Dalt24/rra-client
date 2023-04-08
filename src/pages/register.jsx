import React, { useState } from 'react';
import { validatePassword, comparePassword } from '../functions/security/validatePassword';
import { validateEmail } from '../functions/security/validateEmail';
import './classes.css';

const Register = ({registeredChanger }) => {
    const [userEmail, setUserEmail] = useState("");
    const [passWordOne, setPassWordOne] = useState("");
    const [passWordOneConfirmation, setPassWordOneConfirmation] = useState("");
    
  
    const handleRegister = () => {
        const isValidEmail = validateEmail(userEmail)
        const isValidPassOne = validatePassword(passWordOne)    
        const isValidPassTwo = validatePassword(passWordOneConfirmation)    
        const isMatchingPass = comparePassword(passWordOne, passWordOneConfirmation)

        isValidEmail === false && (alert('Invalid Email'))
        isValidPassOne === false && (alert('Invalid Password'))
        isValidPassTwo === false && (alert('Invalid Conformation Password'))
        isMatchingPass === false && (alert("Passwords Don't Match"))



        isValidEmail && isValidPassOne && isValidPassTwo && isMatchingPass ? <>{registeredChanger(true)}</> : <>{registeredChanger(false) }</>
        

    // axios logic, check if userEmail is in database && verify password

    // if login credentials don't match DB set loggedInChanger(false)
    // if login is successful set loggedInChanger(true)
    
    // set what user is Logged In to pull the respective credentials & appointment data
        // (userEmail === "dcw.dalton@gmail.com" && comparePassword(passWordOne, passWordOneConfirmation) === true) ? <>{registeredChanger(true) +  alert('Registered Succesfully, Return to Login Page')}</> : registeredChanger(false)
    
  };


  return (
    <div>
      <form className="form">
        <input id="emailInput" onChange={e =>  setUserEmail(e.target.value) } type="text" placeholder="Email" />
        <input type="password" onChange={e =>  setPassWordOne(e.target.value) } email="firstPass" placeholder="Password" />
        <input  type="password" onChange={e => setPassWordOneConfirmation(e.target.value)} email="secondPass" placeholder="Confirm Password" />
              
        <button type="submit" onClick={() => { handleRegister() }}>Register</button>
      </form>

      {userEmail && <><h1>UserEmail Access: {userEmail}</h1></>}
      {passWordOne && <><h1>passWordOne Access: {passWordOne}</h1></>}
    </div >

  );
};

export default Register;