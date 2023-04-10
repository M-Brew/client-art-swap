import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./footer.css";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer-container py-5">
      <Container>
        <Row>
          <Col xs={12} md={5}>
            <h5>About ArtSwap</h5>
            <div className="text mb-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              ullam numquam ipsam optio aliquam eos aut vitae praesentium!
              Error, reprehenderit.
            </div>
            <div>
              <FontAwesomeIcon icon={faInstagram} className="sm-icon" />
              <FontAwesomeIcon icon={faSnapchat} className="sm-icon" />
              <FontAwesomeIcon icon={faTwitter} className="sm-icon" />
              <FontAwesomeIcon icon={faFacebook} className="sm-icon" />
            </div>
          </Col>
          <Col xs={12} md={{ span: 3, offset: 1 }}>
            <h5>Contacts</h5>
            <div className="text mb-2">
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "1rem" }} />{" "}
              +233 50 426 1943
            </div>
            <div className="text mb-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ marginRight: "1rem" }}
              />{" "}
              artswap@gmail.com
            </div>
          </Col>
          <Col xs={12} md={3}>
            <h5>Quick Links</h5>
            <div
              className="text mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </div>
            <div
              className="text mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/about")}
            >
              About
            </div>
            <div
              className="text mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/shop")}
            >
              Shop
            </div>
            <div
              className="text mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
