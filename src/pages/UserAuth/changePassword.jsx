import { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { getApiBaseUrl } from '../../functions/api/getApi';
import CustomAlertMessage from '../../components/Misc/successPopup';
import '../classes.css';
// import { validatePassword } from '../../functions/security/validatePassword';

const ChangePassword = ({ currentUser }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentUser.isAdmin === "true") {
      console.log(bcrypt.compareSync(oldPassword, currentUser.userPassword))
      const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
      axios.put(`${getApiBaseUrl()}/api/User/${currentUser.userID}`, updatedUser).then(
        setShowAlert(true)
      )
    }
    else if (currentUser.isTherapist === "true") {
      console.log(bcrypt.compareSync(oldPassword, currentUser.therapistPassword))
      const updatedUser = { ...currentUser, therapistPassword: bcrypt.hashSync(newPassword, 10) };
      axios.put(`${getApiBaseUrl()}/api/Therapist/${currentUser.therapistID}`, updatedUser).then(
        setShowAlert(true)

      )
      console.log(currentUser)
    } else if (currentUser.isTherapist === "false") {
      console.log(bcrypt.compareSync(oldPassword, currentUser.userPassword))
      const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
      axios.put(`${getApiBaseUrl()}/api/User/${currentUser.userID}`, updatedUser).then(
        setShowAlert(true)
      )

    }
    else {
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
      <form onSubmit={handleSubmit}>
        <label>
          Old Password:
          <input className='password' type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
        </label>
        <label>
          New Password:
          <input className='password' type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </label>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
