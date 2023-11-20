import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState("loginAthlete");
  const [modalSuccess, setModalSuccess] = useState(false);

  const handleClose = () => {
    setShow(false);
    setLogin({});
    setModalSuccess(false);
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    setAthlete(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear("loggedInUser");

    try {
      setLoading(true);
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
        window.location.reload()
        setModalSuccess(true);
      }
      setLogin(data);

      setLoading(false);
    } catch (err) {
      if (err) {
        setError(err);
      }
    }
  };

  return (
    <>
      <Nav.Link onClick={handleShow}>Log in</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalSuccess && login && (
            <h1 style={{ color: "green" }}>Login succesfully executed!</h1>
          )}
          {!modalSuccess && !error && loading && (
            <TailSpin
              height="80"
              width="80"
              color="rgba(2, 83, 185, 1)"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
          {!modalSuccess && !loading && !error && (
            <Form>
              <Form.Select onChange={handleSelect}>
                <option value="loginAthlete">Athlete</option>
                <option value="loginTeam">Team</option>
              </Form.Select>
              {!loading && login && (
                <label style={{ color: "red" }}>{login.message}</label>
              )}
              <Form.Group className="my-3" controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
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
          )}
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
