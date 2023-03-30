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
                    <Col xs={12} md={6}>
                        <h5>About Ekow Brew</h5>
                        <div className="text mb-2">
                            I'm Ekow Brew, a self-taught visual artist who
                            specializes in the Digital Arts. My perception of
                            life is akin to a journey of constant exploration of
                            oneself, which involves a lot of rediscovering and I
                            like to express this view point through my art.
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="sm-icon"
                            />
                            <FontAwesomeIcon
                                icon={faSnapchat}
                                className="sm-icon"
                            />
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className="sm-icon"
                            />
                            <FontAwesomeIcon
                                icon={faFacebook}
                                className="sm-icon"
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={3}>
                        <h5>Contacts</h5>
                        <div className="text mb-2">
                            <FontAwesomeIcon
                                icon={faPhone}
                                style={{ marginRight: "1rem" }}
                            />{" "}
                            +233 50 426 1943
                        </div>
                        {/* <div className="text mb-2">
                            221 Baker Street
                            <br />
                            Santa Maria, Accra
                        </div> */}
                        <div className="text mb-2">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                style={{ marginRight: "1rem" }}
                            />{" "}
                            3kowbrew@gmail.com
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
                            onClick={() => navigate("/gallery")}
                        >
                            Gallery
                        </div>
                        <div
                            className="text mb-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/shop")}
                        >
                            Shop
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
