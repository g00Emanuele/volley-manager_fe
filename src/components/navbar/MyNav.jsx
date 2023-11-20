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
import useSession from "../../custom-hooks/session";

const MyNav = () => {
  const handleLogOut = () => {
    localStorage.clear();
  };

  const session = useSession();

  return (
    <Navbar expand="lg" className="stellar">
      <Container>
        <Navbar.Brand href="/">
          <FaVolleyball size={30} /> VolleyManager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!session && (
              <NavDropdown title="Subscribe" id="basic-nav-dropdown">
                <SignupFormAthlete />
                <SignupFormTeam />
              </NavDropdown>
            )}
            {session && session.team && (
              <Nav.Link href="/loginAthlete">My page</Nav.Link>
            )}
            {session && !session.team && (
              <Nav.Link href="/loginTeam">My page</Nav.Link>
            )}
            {!session && <LoginForm />}

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
