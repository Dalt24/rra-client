import { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { getApiBaseUrl } from '../../functions/api/getApi';
import CustomAlertMessage from '../../components/Misc/successPopup';
import '../classes.css';
import RRA_Logo from '../../images/RRA_Logo.png'

const ChangePassword = ({ currentUser }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  function handlePasswordFocus() {
    setShowPasswordPopup(true);
  }

  function handlePasswordPopupClose() {
    setShowPasswordPopup(false);
  }


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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bcrypt.hashSync(newPassword, 10) === currentUser.userPassword) {

      if (currentUser.isAdmin === "true") {
        const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
        axios.put(`${getApiBaseUrl()}/api/User/${currentUser.userID}`, updatedUser).then(
          setShowAlert(true)
        )
      }
      else if (currentUser.isTherapist === "true") {
        const updatedUser = { ...currentUser, therapistPassword: bcrypt.hashSync(newPassword, 10) };
        axios.put(`${getApiBaseUrl()}/api/Therapist/${currentUser.therapistID}`, updatedUser).then(
          setShowAlert(true)

        )
      } else if (currentUser.isTherapist === "false") {
        const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
        axios.put(`${getApiBaseUrl()}/api/User/${currentUser.userID}`, updatedUser).then(
          setShowAlert(true)
        )

      }
    }
    else {
      alert('Old Password is Incorrect!')
      setShowFailAlert(true)
    }
  };


  function handleAlertClose() {
    setShowAlert(false);
  }

  return (
    <div className='passwordContainer'>
      {showAlert && (
        <CustomAlertMessage
          message="Success! On next Login use your New Password!"
          type="success"
          onClose={handleAlertClose}
        />
      )}
      {showFailAlert && (
        <CustomAlertMessage
          message="Failed to update your password! Try again"
          type="warning"
          onClose={handleAlertClose}
        />
      )}
      <span>
        <form onSubmit={handleSubmit} className='login'>
          <img src={RRA_Logo} alt='RRA Logo Icon' style={{ marginTop: "-10%", display: "block", marginLeft: "auto", marginRight: "auto", width: "150px" }} />
          <label>
            Old Password:
            <input className='password' type="password" onFocus={handlePasswordFocus}
              value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          </label>
          {showPasswordPopup && (
            <Popup
              message="Password must contain 1 number, 1 uppercase letter, and 1 special character."
              onClose={handlePasswordPopupClose}
            />
          )}
          <label>
            New Password:
            <input className='password' type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          </label>
          <button type="submit">Change Password</button>
        </form>
      </span>
    </div>
  );
};

export default ChangePassword;
