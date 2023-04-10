import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";

import "./navigationBar.css";
import { AuthContext } from "contexts/AuthContext";
import { CartContext } from "contexts/CartContext";

export const NavigationBar = () => {
  const { loggedIn, setLoggedIn, setUser } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setLoggingOut(true);
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios.post("/api/auth/sign-out", {
        token: refreshToken,
      });
      if (response?.status === 204) {
        localStorage.clear();
        setLoggedIn?.(false);
        setUser?.(undefined);
      }
      setLoggingOut(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      setLoggingOut(false);
    }
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="nav-custom"
        variant="light"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div className="nav-title">ArtSwap</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link eventKey={1} as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link eventKey={2} as={Link} to={"/about"}>
                About
              </Nav.Link>
              <Nav.Link eventKey={4} as={Link} to={"/shop"}>
                Shop
              </Nav.Link>
              <Nav.Link eventKey={3} as={Link} to={"/contact"}>
                Contact Us
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link eventKey={5} as={Link} to={"/cart"}>
                Cart{" "}
                {cartItems && cartItems.length > 0 && (
                  <Badge pill bg="dark">
                    {cartItems.length}
                  </Badge>
                )}
              </Nav.Link>
              {!loggedIn ? (
                <Nav.Link eventKey={6} as={Link} to={"/sign-in"}>
                  Sign In
                </Nav.Link>
              ) : (
                <Nav.Link
                  eventKey={2}
                  disabled={loggingOut}
                  onClick={handleLogOut}
                >
                  {loggingOut ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      variant="secondary"
                      className="mx-4"
                    />
                  ) : (
                    "Logout"
                  )}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
