import moment from "moment";
import { useState, useEffect } from "react";
import axios from "axios";
import Calendar from 'react-calendar'
import { getApiBaseUrl } from "../../functions/api/getApi";
// import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import './userCalendar.css';

const UserCalendar = (props) => {
    const typesOfTherapy = ['Stretching', 'Conditioning', 'Cryotherapy', 'Strengthening', 'Surgical rehabilitation'];

    // const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString());
    const [day, setDay] = useState(moment().format('dddd'));
    const [a, setA] = useState();
    const [therapist, setTherapist] = useState('');
    const [selectedIntervals, setSelectedIntervals] = useState([]);
    const [appointmentData, setAppointmentData] = useState([])
    const [therapistName, setTherapistName] = useState()

    function ConfirmAppointmentModal() {
        const [show, setShow] = useState(false);
        const [address, setAddress] = useState("");
        const [city, setCity] = useState("");
        const [state, setState] = useState("");
        const [zipCode, setZipCode] = useState("");
        const [therapyType, setTherapyType] = useState("");

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleSubmit = (e) => {
            e.preventDefault();
            const startDate = moment(date);
            const startTime = moment(selectedIntervals[0], 'h:mm A');
            const appointmentDate = startDate
                .hours(startTime.hours())
                .minutes(startTime.minutes());
            const endAptDate = moment(appointmentDate).add(30 * selectedIntervals?.length, 'minutes')
            var locationCombo = address + " " + city + ", " + state + " " + zipCode
            const therapistInfo = (props.therapistData.find((data) => data.therapistID === therapist))

            const body = {
                userID: props.currentUser.userID,
                firstName: props.currentUser.firstName,
                lastName: props.currentUser.lastName,
                emailAddress: props.currentUser.emailAddress,
                locationAddress: locationCombo,
                therapistFirstName: therapistInfo.firstName,
                therapistLastName: therapistInfo.lastName,
                therapistID: therapistInfo.therapistID,
                appointmentStartDate: appointmentDate._d,
                appointmentEndDate: endAptDate._d,
                therapyType: therapyType
            }

            axios.post(`${getApiBaseUrl()}/api/Appointment`, body).then(
                // navigate('/', { replace: true })
                console.log('finished post')
            )
            handleClose()
        };

        return (
            <>
                    <Button  onClick={handleShow} className="button">
                        Submit
                    </Button>

                    <Modal show={show} onHide={handleClose} className="modalFont">
                        <Modal.Header style={{ padding: 0 }} className="modalHeader">
                            <Modal.Title>
                                <div>{therapistName}</div>
                                <div>{getDate()}</div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="formStyling">
                                <Form.Group controlId="therapyType">
                                    <Form.Label>Therapy Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) => {
                                            setTherapyType(e.target.value);
                                        }}
                                    >
                                        <option> -- Select a Therapy Type -- </option>
                                        {typesOfTherapy.map((type) => (
                                            <option value={type} key={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Label>Street Address</Form.Label>
                                <Form.Control
                                    style={{textAlign: "center"}}
                                        type="text"
                                        placeholder="Enter street address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="state">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="zipCode">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter zip code"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </Form.Group>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} className="button">
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmit} className="button">
                                        Confirm
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
            </>
        );
    }


    useEffect(() => {
        if (props.currentUser !== null && props.currentUser !== undefined && props.currentUser.isTherapist === "false") {
            axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
                setAppointmentData(response.data)
            });
        }
        else if (props.currentUser !== null && props.currentUser !== undefined && props.currentUser.isTherapist === "true") {
            axios.get(`${getApiBaseUrl()}/api/Appointment`).then((response) => {
                setAppointmentData(response.data)
            });
        }
    }, [props.currentUser])


    const getDate = () => {
        const startDate = moment(date);
        const startTime = moment(selectedIntervals[0], 'h:mm A');
        const appointmentDate = startDate
            .hours(startTime.hours())
            .minutes(startTime.minutes());

        const endAptDate = moment(appointmentDate).add(30 * selectedIntervals?.length, 'minutes')

        return appointmentDate.format('dddd h:mm A').toString() + " - " + endAptDate.format('h:mm A').toString()
    }


    function onChange(date) {
        setDate(date);
        setDay(moment(date).format('dddd'));
    }


    function handleIntervalClick(interval) {
        if (selectedIntervals?.length === 0) {
            // If no intervals are selected, add the clicked interval to selectedIntervals
            setSelectedIntervals([interval]);
        } else if (selectedIntervals?.length === 1) {
            // If one interval is already selected, check if the clicked interval is the next 30-minute interval
            const selectedInterval = selectedIntervals[0];
            const nextInterval = moment(selectedInterval, 'h:mm A').add(30, 'minutes').format('h:mm A');
            const prevInterval = moment(selectedInterval, 'h:mm A').subtract(30, 'minutes').format('h:mm A');

            if (interval === nextInterval) {
                setSelectedIntervals([selectedInterval, interval]);
            } else if (interval === prevInterval) {
                setSelectedIntervals([interval, selectedInterval])
            } else {
                setSelectedIntervals([interval]);
            }
        } else {
            // If two intervals are already selected, reset selectedIntervals to contain only the clicked interval
            setSelectedIntervals([interval]);
        }
    }


    return <div>

        <span className="centerCalendar"><Calendar onChange={onChange} value={date} calendarType="US" /></span>

        <span className="centerCalendar">
            <select
                onChange={(e) => {
                    const therapistID = e.target.value;
                    setTherapist(therapistID);
                    const selectedTherapist = props.therapistData.find((t) => t.therapistID === therapistID);
                    setTherapistName(selectedTherapist.firstName + " " + selectedTherapist.lastName)
                    setA(JSON.parse(selectedTherapist.availability));
                }}
            >
                <option> -- Select a therapist -- </option>
                {props.therapistData.map((therapist) => (
                    <option value={therapist.therapistID}>
                        {therapist.firstName + ' ' + therapist.lastName}
                    </option>
                ))}
            </select>
        </span>

        {/* <p>Appointments Available on {moment(date).format('MMMM Do YYYY')}</p> */}
        <div className="centerTimeChoices">
        {a !== undefined &&
            a[day]?.map((c) => {
                const startTime = moment(c.start, 'h:mm A');
                const endTime = moment(c.end, 'h:mm A');
                const timeIntervals = [];
                let currentTime = startTime;
                const startDate = moment(date);
                let cnt = 0

                while (currentTime < endTime) {
                    const appointmentDate = (startDate
                        .hours(currentTime.hours())
                        .minutes(currentTime.minutes()));
                    const appointment = appointmentData.find(d => d.appointmentStartDate === appointmentDate._d.toISOString() && d.therapistID === therapist && d.isCanceled !== "true");
                    if (appointment && cnt === 0) {
                        currentTime.add(1, 'hours');
                        cnt++
                    }
                    else {
                        timeIntervals.push(currentTime.format('h:mm A'));
                        currentTime.add(30, 'minutes');
                    }
                }

                return (
                    <span>
                        {timeIntervals.map((time, key) => {
                            return (
                                <button
                                    className="buttonStyling"
                                    key={key}
                                    onClick={() => handleIntervalClick(time)}
                                    style={{ background: selectedIntervals.includes(time) ? 'teal' : 'white'}}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </span>
                );
            })}</div>



        {/* Change state Input to a dropdown of every state with search feature?? */}
        <span className="centerCalendar">
            {selectedIntervals?.length!==0 && therapistName && <ConfirmAppointmentModal />}
        </span>
    </div>
}

export default UserCalendar;