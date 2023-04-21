import { React, useState} from 'react';
import { validatePassword } from '../../functions/security/validatePassword';
import './classes.css';
import RRA_Logo from '../../images/RRA_Logo.png'
var bcrypt = require('bcryptjs');

const Login = ({ loggedInChanger, registeredChanger, setCurrentUser, data, therapistData }) => {
  const [userEmail, setUserEmail] = useState("");
  const [passWordOne, setPassWordOne] = useState("");
  const handleLogin = (e) => {
    // axios logic, check if userEmail is in database && verify password by checking the hash against the input
    const currUser = data.find((user) => user.emailAddress === userEmail)
    const currUserTherapist = therapistData.find((user) => user.emailAddress === userEmail)
    if (currUser !== null && currUser !== undefined && bcrypt.compareSync(passWordOne, currUser.userPassword) === true) {
      setCurrentUser(currUser)
      loggedInChanger(true)
    }
    else if (currUserTherapist !== null && currUserTherapist !== undefined  && bcrypt.compareSync(passWordOne, currUserTherapist.therapistPassword) === true) {
      setCurrentUser(currUserTherapist)
        loggedInChanger(true)
    }// Need a failed to login modal / temp screen
    else {
      loggedInChanger(false)
      alert('fail')
    }
    // set what user is Logged In to pull the respective credentials & appointment data
    // global state with logged in Users Data so we can match the userID to other 'data'
  };
  // margin-top: 20px;
  // display: block;
  // margin-left: auto;
  // margin-right: auto;
  // width: 150px;
  return (
    <div>
      <form className="form login">
        <img src={RRA_Logo} alt='RRA Logo Icon' style={{ marginTop: "-10%", display: "block", marginLeft: "auto", marginRight: "auto", width: "150px" }} />
        <span style={{backgroundColor:"#50a3a2"}}>
        <input id="emailInput"  onChange={e => setUserEmail(e.target.value)} type="text" placeholder="Email" />
        <input onChange={e => validatePassword(e.target.value) ? setPassWordOne(e.target.value) : (() => e.className = "passwordInput")} type="password" placeholder="Password" />
        <button type="submit" onClick={e => { validatePassword(passWordOne) && handleLogin()}}>Login</button>
        <button onClick={() => registeredChanger(false)}>Don't Have an Account? Sign Up</button>
          </span>
      </form>
    </div >
  );
};

export default Login;