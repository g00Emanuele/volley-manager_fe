import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavDropdown, Form } from "react-bootstrap";
import { nanoid } from "nanoid";
import { TailSpin } from "react-loader-spinner";
import LoginForm from "../loginForm/LoginForm";


const SignupFormTeam = () => {
  const [show, setShow] = useState(false);
  const [signup, setSignup] = useState({});
  const [signupData, setSignupData] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0]); // il file si trova sempre a e.target.files[0]
  };

  const uploadFile = async (cover) => {
    const fileData = new FormData();
    fileData.append("cover", cover);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/teams/cloudUpload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      setLoading(false);
      return await response.json();
    } catch (error) {
      setError(error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSignup({});
    setModalSuccess(false);
  };
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const uploadCover = await uploadFile(file);

      const finalBody = {
        ...signupData,
        cover: uploadCover.cover,
      };
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
      const data = await response.json();
      setSignup(data);

      if (!data.errors) {
        setModalSuccess(true);
      }
      setLoading(false);
      return data;
    } catch (err) {
      if (err) setError(err);
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
          {modalSuccess && (
            <h1 style={{ color: "green" }}>
              Registration succesfully executed!
            </h1>
          )}
          {loading && (
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
          {!loading && !error && !modalSuccess && (
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Email"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Password"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Team"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Cover"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
              </Form.Group>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {modalSuccess && (
            <Button variant="success" onClick={handleClose}>
              <LoginForm />
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignupFormTeam;
