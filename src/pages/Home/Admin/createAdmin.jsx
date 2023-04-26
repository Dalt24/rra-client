import { getApiBaseUrl } from "../../../functions/api/getApi"
import axios from "axios"
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './classes.css';

const Create = () => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [userType, setUserType] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var bcrypt = require('bcryptjs');

    const handleSubmit = (e) => {
        e.preventDefault();
        //   isTherapist: userType === "therapist" ? "true" : "false",
        //   isAdministrator: userType === "admin" ? "true" : "false",

        if (userType === "therapist") {
            const body = {
                firstName: firstName,
                lastName: lastName,
                availability: `{"Monday":[],"Tuesday":[],"Wednesday":[],"Thursday":[],"Friday":[]}`,
                emailAddress: emailAddress,
                therapistPassword: bcrypt.hashSync("TempPassword123", bcrypt.genSaltSync()),
                isTherapist: "true",
                isAdmin: "false",
            };

            axios.post(`${getApiBaseUrl()}/api/Therapist`, body).then((response) => {
                // handle success
                handleClose();
            }).catch((error) => {
                // handle error
            });
        } else if (userType === "admin") {
            const body = {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                phoneNumber: phoneNumber,
                userPassword: bcrypt.hashSync("TempPassword123", bcrypt.genSaltSync()),
                isAdmin: "true",
                isTherapist: "false",
            };

            axios.post(`${getApiBaseUrl()}/api/User`, body).then((response) => {
                // handle success
                handleClose();
            }).catch((error) => {
                // handle error
            });
        }

    };

    return (
        <>
            <Button className="btn-custom" onClick={handleShow}>
                Create Therapist/Admin
            </Button>

            <Modal show={show} onHide={handleClose} className="modalFont">
                <Modal.Header  className="modalHeader">
                    <Modal.Title><div>Create Therapist/Admin</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="formStyling">
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="emailAddress">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email address"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="userType">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => {
                                    setUserType(e.target.value);
                                }}
                            >
                                <option> -- Select a User Type -- </option>
                                <option value="therapist">Therapist</option>
                                <option value="admin">Administrator</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                placeholder="Enter Your Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Temp Password: "TempPassword123" </Form.Label>
                            <Form.Label>Inform the new user to change this on Login </Form.Label>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} className="button">
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit} className="button">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}
export default Create;