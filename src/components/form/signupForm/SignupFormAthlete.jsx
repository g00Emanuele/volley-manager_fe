import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavDropdown, Form } from "react-bootstrap";
import { nanoid } from "nanoid";

const SignupForm = () => {
  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState([]);
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
        `${process.env.REACT_APP_BASE_URL}/athletes/cloudUpload`,
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
    signup.age = Number(signup.age);

    try {
      const uploadCover = await uploadFile(file);

      const finalBody = {
        ...signup,
        cover: uploadCover.cover,
      };
      console.log(finalBody);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/athletes/create`,
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

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/teams`);
      const data = await response.json();
      setTeams(data.teams);
    } catch (error) {
      if (error) console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
    console.log(teams);
  }, []);
  return (
    <>
      <NavDropdown.Item onClick={handleShow}>As athlete</NavDropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New athlete</Modal.Title>
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
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter name"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                name="surname"
                type="text"
                placeholder="Enter surname"
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                name="age"
                type="number"
                placeholder="Enter age"
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

            <Form.Group className="mb-3">
              <Form.Select name="role" onChange={handleInputChange}>
                <option>---</option>
                <option value="setter">Setter</option>
                <option value="middle-blocker">Middle blocker</option>
                <option value="outside-hitter">Outside hitter</option>
                <option value="opposite-hitter">Opposite hitter</option>
                <option value="libero">Libero</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Request a team</Form.Label>
              <Form.Select name="requestedTeam" onChange={handleInputChange}>
                <option>---</option>
                {teams &&
                  teams.map((team) => {
                    return (
                      <option key={nanoid()} value={`${team._id}`}>
                        {team.name}
                      </option>
                    );
                  })}
              </Form.Select>
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

export default SignupForm;
