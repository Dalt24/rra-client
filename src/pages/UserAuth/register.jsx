import React, { useState } from "react";
import axios from "axios";
import {validatePassword, comparePassword} from "../../functions/security/validatePassword";
import { validateEmail } from "../../functions/security/validateEmail";
import { getApiBaseUrl } from "../../functions/api/getApi";
import "../classes.css";
var bcrypt = require("bcryptjs");

const Register = ({ registeredChanger, data }) => {
  const [userEmail, setUserEmail] = useState("");
  const [passWordOne, setPassWordOne] = useState("");
  const [passWordOneConfirmation, setPassWordOneConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const Popup = ({ message, onClose }) => {

    return (
      <div className="popup">
        <p>{message}</p>
        <button style={{ width: "100px" }} onClick={onClose}>
          OK
        </button>
      </div>
    );
  };

  const handleRegister = () => {

    const isValidEmail = validateEmail(userEmail);
    const isValidPassOne = validatePassword(passWordOne);
    const isValidPassTwo = validatePassword(passWordOneConfirmation);
    const isMatchingPass = comparePassword(passWordOne, passWordOneConfirmation);
    const isDuplicateEmail = data.find((user) => user.emailAddress === userEmail);

    const user = {
      lastName: lastName,
      emailAddress: userEmail,
      phoneNumber: phoneNumber,
      userPassword: bcrypt.hashSync(passWordOne, bcrypt.genSaltSync()),
      isAdmin: "false",
      isTherapist: "false",
    };

    if (isDuplicateEmail === undefined) {
      isValidEmail &&
        isValidPassOne &&
        isValidPassTwo &&
        isMatchingPass &&
        phoneNumber &&
        firstName &&
        lastName
        ? axios
          .post(`${getApiBaseUrl()}/api/User`, user)
          .then(registeredChanger(true))
        : registeredChanger(false);
    }

  };

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  function handlePasswordFocus() {
    setShowPasswordPopup(true);
  }

  function handlePasswordPopupClose() {
    setShowPasswordPopup(false);
  }

  return (
    <div>
      <form className="form login">
        <input
          type="text"
          id="firstNameInput"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          id="lastNameInput"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          id="phoneNumberInput"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number xxx-xxx-xxxx"
        />
        <input
          id="emailInput"
          onChange={(e) => setUserEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          type="password"
          onFocus={handlePasswordFocus}
          onChange={(e) => setPassWordOne(e.target.value)}
          email="firstPass"
          placeholder="Password"
        />
        {showPasswordPopup && (
          <Popup
            message="Password must contain 1 number, 1 uppercase letter, and 1 special character."
            onClose={handlePasswordPopupClose}
          />
        )}
        <input
          type="password"
          onChange={(e) => setPassWordOneConfirmation(e.target.value)}
          email="secondPass"
          placeholder="Confirm Password"
        />

        <button
          type="submit"
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </button>
      </form>

      {userEmail && (
        <>
          <h1>UserEmail Access: {userEmail}</h1>
        </>
      )}

      {passWordOne && (
        <>
          <h1>passWordOne Access: {passWordOne}</h1>
        </>
      )}
    </div>
  );
};

export default Register;