import { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { getApiBaseUrl } from '../../functions/api/getApi';

const ChangePassword = ({ currentUser }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();


    if (currentUser.isAdmin === "true") {
      console.log(bcrypt.compareSync(oldPassword, currentUser.userPassword))
      const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
      axios.put(`${getApiBaseUrl()}/api/User/${currentUser.userID}`, updatedUser)
    }
    else if (currentUser.isTherapist === "true") {
      console.log(bcrypt.compareSync(oldPassword, currentUser.therapistPassword))
      const updatedUser = { ...currentUser, therapistPassword: bcrypt.hashSync(newPassword, 10) };
      axios.put(`${getApiBaseUrl()}/api/Therapist/${currentUser.therapistID}`, updatedUser)
      console.log(currentUser)
    } else if (currentUser.isTherapist === "false") {
      console.log(bcrypt.compareSync(oldPassword, currentUser.userPassword))
      const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
      axios.put(`${getApiBaseUrl()}/api/User/${currentUser.userID}`, updatedUser)

    }
    else {
      alert('fail')
    }
    // if (bcrypt.compareSync(oldPassword, currentUser.userPassword)) {
    //   // Passwords match, update the user's password
    //   const updatedUser = { ...currentUser, userPassword: bcrypt.hashSync(newPassword, 10) };
    //   // TODO: Call a function to update the user in the database
    //   console.log(currentUser)
    //   console.log(updatedUser)
    //   console.log('Password updated User');
    // } else if (bcrypt.compareSync(oldPassword, currentUser.therapistPassword)) {
    // const updatedUser = { ...currentUser, therapistPassword: bcrypt.hashSync(newPassword, 10) };
    //   console.log(currentUser)
    //   console.log(updatedUser)
    //   console.log('Password updated Therapist');
    // }
    // else {
    //   // Passwords don't match, show an error message
    //   alert('Incorrect password');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Old Password:
        <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
      </label>
      <label>
        New Password:
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
      </label>
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;



// 
