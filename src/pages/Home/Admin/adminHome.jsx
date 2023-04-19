import { useNavigate } from 'react-router-dom'

import Create from "./createAdmin.jsx"
import Edit from './editAdmin.jsx';


const AdminHome = ({data, therapistData, currentUser }) => {
    const navigate = useNavigate();
    return <div className='admin-container'>

        {/* <button type="submit" onClick={() => { 
            navigate('/create-admin' {replace: true})*/}
        {/* // }}><h3>Add Admin/PT</h3></button> */}
        <Create />
        <Edit therapistData={therapistData} userData={data} currentUser={currentUser}/>
        {/* <button type="submit" onClick={() => {
            navigate('/edit-admin', { replace: true })
        }}><h3>Edit Admin/PT</h3></button> */}
        <button className='btn-custom' type="submit" onClick={() => {
            navigate('/calendar', { replace: true })
        }}><h3>View PT Schedule</h3></button>

        <button className='btn-custom' type="submit" onClick={() => {
            navigate('/reports', { replace: true })
        }}><h3>Reports</h3></button>



    </div>
}

export default AdminHome;