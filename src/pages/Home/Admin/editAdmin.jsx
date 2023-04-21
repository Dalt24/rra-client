import React, { useState } from 'react';
import './classes.css';
import { Modal, Button, Form } from "react-bootstrap";
import axios from 'axios';
import { getApiBaseUrl } from '../../../functions/api/getApi';

const Edit = ({ therapistData, userData, currentUser }) => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedId(value);
    setSelectedType(name);
  };

  const handleDelete = () => {
    if (selectedType === "therapist") {
      axios
        .delete(`${getApiBaseUrl()}/api/Therapist/${selectedId}`)
        .then((response) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (selectedType === "admin") {
      axios
        .delete(`${getApiBaseUrl()}/api/User/${selectedId}`)
        .then((response) => {
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Button className='btn-custom' onClick={handleShow}>
        Delete Therapist/Admin
      </Button>

      <Modal show={show} onHide={handleClose} className="modalFont">
        <Modal.Header className="modalHeader">
          <Modal.Title><div>Delete Therapist/Admin</div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="formStyling">
            <Form.Group>
              <Form.Label>Therapists</Form.Label>
              <Form.Control
                as="select"
                name="therapist"
                value={selectedType === "therapist" ? selectedId : ""}
                onChange={handleDropdownChange}
              >
                <option value="">Select a therapist to delete</option>
                {therapistData
                  .map((therapist) => (
                    <option key={therapist.therapistID} value={therapist.therapistID}>
                      {therapist.firstName}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Admins</Form.Label>
              <Form.Control
                as="select"
                name="admin"
                value={selectedType === "admin" ? selectedId : ""}
                onChange={handleDropdownChange}
              >
                <option value="">Select an admin to delete</option>
              {console.log(currentUser)}
                {userData
                  .filter((d) => d.isAdmin === "true" && d.userID !== currentUser.userID)
                  .map((admin) => (
                    <option key={admin.userID} value={admin.userID}>
                      {admin.firstName}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
                    <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  className="button">
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}  className="button">
            Delete
          </Button>
        </Modal.Footer>
          </Form>
          
        </Modal.Body>

      </Modal>
    </>
  );
};
export default Edit;