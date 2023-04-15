import axios from "axios";
import { getApiBaseUrl } from "../../functions/api/getApi";

const AdminCalendar = () => {


    function handleAdmin() {
        const body = {
            firstName: "Jeff",
            lastName: "Lucas",
            availability: "",
            emailAddress: "jeff.lucas@gmail.com",
            therapistPassword: "TestPass1!",
            isAdmin: "false",
            isTherapist: "true"
        }
        axios.post(`${getApiBaseUrl()}/api/Therapist`, body)
    }

    return (
        <div>
            hi admin
            <button onClick={handleAdmin}>Submit</button>
        </div>
    )
}

export default AdminCalendar;