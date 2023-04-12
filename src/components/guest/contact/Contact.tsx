import React, { useState } from "react";

import { Formik } from "formik";
// import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const image =
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80";

  const initialValues: IContactMessage = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (values: IContactMessage) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };

  return (
    <div>
      <div
        style={{
          height: "40vh",
          width: "100%",
          backgroundColor: "#f8f9fa",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage: `url(${image})`,
        }}
      />
      <div
        style={{
          padding: "3rem 0",
        }}
      >
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <div className="mb-4">
                <h4>Contact Us</h4>
              </div>
              <div>
                <div className="mb-2">Address: 123 Baker Street</div>
                <div className="mb-2">Email: art@artswapinc.com</div>
                <div className="mb-2">
                  Phone: +233 50 550 5050 / +233 20 220 2020
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mb-4">
                <h4>Send us a message</h4>
              </div>
              <Formik
                initialValues={initialValues}
                // validationSchema={signUpValidationSchema}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form onSubmit={props.handleSubmit}>
                    <Row>
                      <Col xs={6}>
                        <Form.Group className="mb-4">
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={props.values.firstName}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.firstName &&
                            props.errors.firstName && (
                              <small className="text-danger p-2">
                                {props.errors.firstName}
                              </small>
                            )}
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="mb-4">
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={props.values.lastName}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.lastName && props.errors.lastName && (
                            <small className="text-danger p-2">
                              {props.errors.lastName}
                            </small>
                          )}
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group className="mb-4">
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={props.values.email}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.email && props.errors.email && (
                            <small className="text-danger p-2">
                              {props.errors.email}
                            </small>
                          )}
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group className="mb-4">
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Message"
                            name="Message"
                            value={props.values.message}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                          />
                          {props.touched.message && props.errors.message && (
                            <small className="text-danger p-2">
                              {props.errors.message}
                            </small>
                          )}
                        </Form.Group>
                      </Col>
                      <div className="d-grid gap-2">
                        <Button
                          size="lg"
                          variant="secondary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Send"
                          )}
                        </Button>
                      </div>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
