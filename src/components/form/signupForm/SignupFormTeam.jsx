import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavDropdown, Form } from "react-bootstrap";
import { nanoid } from "nanoid";

const SignupFormTeam = () => {
  const [show, setShow] = useState(false);
  const [signup, setSignup] = useState({});
  const [file, setFile] = useState(null);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]); // il file si trova sempre a e.target.files[0]
  };

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/teams/cloudUpload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error, "Errore in uploadFile");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignup({
      ...signup,
      [name]: value,
    });
    console.log(signup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadCover = await uploadFile(file);

      const finalBody = {
        ...signup,
        cover: uploadCover.cover,
      };
      console.log(finalBody);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/teams/create`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(finalBody),
        }
      );
      const data = response.json();
      return data;
    } catch (error) {
      if (error) console.log(error);
    }
  };
  return (
    <>
      <NavDropdown.Item variant="primary" onClick={handleShow}>
        As a team
      </NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Team name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter team name"
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover image</Form.Label>
              <Form.Control
                name="cover"
                type="file"
                placeholder="Enter your profile cover"
                required
                onChange={onChangeSetFile}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignupFormTeam;
