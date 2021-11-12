import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../images/e5f926c322d7fdf80eafe38a0d12000c.svg";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const AppBar = () => {
  const { user, logOut } = useAuth();
  return (
    <Navbar sticky="top" bg="dark" variant="dark" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav className="justify-content-end mx-3">
            {user?.email ? (
              <Button
                onClick={logOut}
                variant="light"
                className="me-3 project-btn"
              >
                Logout
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login" className="custom-login">
                Login
              </Nav.Link>
            )}
          </Nav>
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppBar;
