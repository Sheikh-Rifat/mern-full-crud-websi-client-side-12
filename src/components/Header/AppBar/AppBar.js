import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import logo from "../../../images/e5f926c322d7fdf80eafe38a0d12000c.svg";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

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
            <Nav.Link as={HashLink} to="/home#home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/allProducts">
              Products
            </Nav.Link>

            <Nav.Link as={HashLink} to="/home#reviews">
              Reviews
            </Nav.Link>

            <Nav.Link as={HashLink} to="/home#contact">
              Contact
            </Nav.Link>

            {user?.email && (
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
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
          {user?.email && (
            <Navbar.Text>
              Signed in as: <a href="#login">{user.displayName}</a>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppBar;
