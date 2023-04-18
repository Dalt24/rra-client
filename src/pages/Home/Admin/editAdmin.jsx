import { getApiBaseUrl } from "../../../functions/api/getApi"
import axios from "axios"
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";


const Edit = () => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                therapistPassword: "TempPassword123!!",
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
                availability: "[]",
                emailAddress: emailAddress,
                therapistPassword: "TempPassword123!!",
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
            <Button variant="primary" onClick={handleShow}>
                Edit User
            </Button>

            <Modal show={show} onHide={handleClose} className="modalFont">
                <Modal.Header style={{ padding: 0 }}>
                    <Modal.Title>Edit</Modal.Title>
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

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter temporary password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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

export default Edit;