import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validatePassword, comparePassword } from '../functions/security/validatePassword';
import { validateEmail } from '../functions/security/validateEmail';
import './classes.css';

const Register = ({registeredChanger}) => {
    const [userEmail, setUserEmail] = useState("");
    const [passWordOne, setPassWordOne] = useState("");
    const [passWordOneConfirmation, setPassWordOneConfirmation] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [data, setData] = useState();
    
      useEffect(() => {
    axios.get(`https://localhost:7202/api/User`).then((response) => {
      setData(response.data);
    });
      }, []);
  
    const handleRegister = () => {
      const isValidEmail = validateEmail(userEmail)
      const isValidPassOne = validatePassword(passWordOne)    
      const isValidPassTwo = validatePassword(passWordOneConfirmation)    
      const isMatchingPass = comparePassword(passWordOne, passWordOneConfirmation)
      
      const isDuplicateEmail = data.find((user) => user.emailAddress === userEmail)
        // isValidEmail === false && (alert('Invalid Email'))
        // isValidPassOne === false && (alert('Invalid Password'))
        // isValidPassTwo === false && (alert('Invalid Conformation Password'))
        // isMatchingPass === false && (alert("Passwords Don't Match"))


        const user = {
            firstName: firstName,
            lastName: lastName,
            emailAddress: userEmail,
            phoneNumber: phoneNumber,
            userPassword: passWordOne,
            isAdmin: "false",
            isTherapist: "false"
      }
      
      if (isDuplicateEmail === undefined)
      {
        isValidEmail && isValidPassOne && isValidPassTwo && isMatchingPass && phoneNumber && firstName && lastName ?(
            axios.post(`https://localhost:7202/api/User`, user).then(registeredChanger(true))):(registeredChanger(false))
      }
        
        //need to check if email already exists in the system
        
        // if login credentials don't match DB set loggedInChanger(false)
        // if login is successful set loggedInChanger(true)    
  };


  return (
    <div>
      <form className="form">
        <input type="text" id="firstNameInput" onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" id="lastNameInput" onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="text" id="phoneNumberInput" onChange={e => setPhoneNumber(e.target.value)}placeholder="Phone Number xxx-xxx-xxxx" />
              
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