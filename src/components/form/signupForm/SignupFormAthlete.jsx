import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavDropdown, Form } from "react-bootstrap";
import { nanoid } from "nanoid";
import { TailSpin } from "react-loader-spinner";
import LoginForm from "../loginForm/LoginForm";

const SignupForm = () => {
  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState([]);
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
        `${process.env.REACT_APP_BASE_URL}/athletes/cloudUpload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      setLoading(false);

      return await response.json();
    } catch (error) {
      console.log(error, "Errore in uploadFile");
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

    console.log(signupData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signupData.age = Number(signupData.age);

    try {
      setLoading(true);
      const uploadCover = await uploadFile(file);

      const finalBody = {
        ...signupData,
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
      const data = await response.json();
      setSignup(data);
      if (!data.errors) {
        setModalSuccess(true);
      }
      setLoading(false);
      return data;
    } catch (err) {
      if (err) setError(err);
      console.log(err);
    }
  };

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/teams`);
      const data = await response.json();
      setTeams(data.teams);
      setLoading(false);
    } catch (err) {
      if (err) setError(err);
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  required
                  onChange={handleInputChange}
                />
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Name"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Surname"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Age"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cover image (Not obligatory)</Form.Label>
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

              <Form.Group className="mb-3">
                <Form.Select name="role" onChange={handleInputChange}>
                  <option>---</option>
                  <option value="setter">Setter</option>
                  <option value="middle-blocker">Middle blocker</option>
                  <option value="outside-hitter">Outside hitter</option>
                  <option value="opposite-hitter">Opposite hitter</option>
                  <option value="libero">Libero</option>
                </Form.Select>
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Role"))
                      return <label style={{ color: "red" }}>{oneError}</label>;
                  })}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Request a team</Form.Label>
                <Form.Select
                  required
                  name="requestedTeam"
                  onChange={handleInputChange}
                >
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
                {!loading &&
                  signup &&
                  signup.errors?.map((oneError) => {
                    if (oneError.includes("Team"))
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
            <Button variant="success">
              <LoginForm />
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignupForm;
