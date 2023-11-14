import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./myNavStyle.css";
import "../../colors/gradient.css";
import LoginForm from "../form/loginForm/LoginForm";
import SignupFormAthlete from "../form/signupForm/SignupFormAthlete";
import SignupFormTeam from "../form/signupForm/SignupFormTeam";
import { FaVolleyball } from "react-icons/fa6";

const MyNav = () => {
  const handleLogOut = () => {
    localStorage.clear();
  };

  return (
    <Navbar expand="lg" className="stellar">
      <Container>
        <Navbar.Brand href="/">
          <FaVolleyball size={30} /> VolleyManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LoginForm />
            <NavDropdown title="Subscribe" id="basic-nav-dropdown">
              <SignupFormAthlete />
              <SignupFormTeam />
            </NavDropdown>
            <Nav.Link href="/" onClick={handleLogOut}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
