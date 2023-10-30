import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {Nav} from 'react-bootstrap'

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState({});
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState('loginAthlete');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    setAthlete(e.target.value)
    console.log(athlete)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${athlete}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(loginData),
        }
      );
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("loggedInUser", JSON.stringify(data.token));
        navigate(`/${athlete}`);
      }
      setLogin(data);
      console.log(data);
    } catch (error) {
      if (error) console.log(error);
    }

    handleClose()
  }; 
  return (
    <>
      <Nav.Link onClick={handleShow}>Log in</Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select onChange={handleSelect}>
              <option
                value="loginAthlete"
              >
                Atleta
              </option>
              <option value="loginTeam">
                Squadra
              </option>
            </Form.Select>

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
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Login
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

export default LoginForm;
