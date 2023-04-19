import { getApiBaseUrl } from "../../../functions/api/getApi"
import axios from "axios"
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
                therapistPassword: bcrypt.hashSync("TempPassword123!!", bcrypt.genSaltSync()),
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
                userPassword: bcrypt.hashSync("AdminPassword1!", bcrypt.genSaltSync()),
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
                <Modal.Header style={{ padding: 0 }}>
                    <Modal.Title>Create Therapist/Admin</Modal.Title>
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
                            <Form.Label>The Temporary Password is "TempPassword123" Inform the Therapist or Admin to Change this on Login</Form.Label>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Create;