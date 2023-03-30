import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "contexts/AuthContext";
import jwtDecode from "jwt-decode";

const Main = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(https://images.unsplash.com/photo-1541512416146-3cf58d6b27cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80);
`;

const FormContainer = styled.div`
    width: 60vh;
    padding: 4rem 2rem;
    border-radius: 5px;
    background-color: whitesmoke;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const GuestSignUp = () => {
    const { setLoggedIn, setUser } = useContext(AuthContext);
    const initialValues: ISignUp = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
    };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const signUpValidationSchema = Yup.object({
        firstName: Yup.string().required("First Name Is Required"),
        lastName: Yup.string().required("Last Name Is Required"),
        userName: Yup.string().required("User Name Is Required"),
        email: Yup.string()
            .email("Email Must Be A Valid Email Address")
            .required("Email Is Required"),
        password: Yup.string().required("Password Is Required"),
    });

    const handleSubmit = async (values: ISignUp) => {
        setError(undefined);
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/sign-up", values, {
                headers: { "Content-Type": "application/json" },
            });
            if (response?.status === 201) {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                setLoggedIn?.(true);
                const payload = jwtDecode<IPayload>(response.data.accessToken);
                setUser?.({
                    userName: payload.userName,
                    role: payload.role
                });
                setLoading(false);
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred. Please try again later.");
                }
            }
            setLoading(false);
        }
    };

    return (
        <>
            <Main>
                <FormContainer>
                    <h3 className="text-center mb-5">Sign Up</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={signUpValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => (
                            <Form onSubmit={props.handleSubmit}>
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
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={props.values.lastName}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.touched.lastName &&
                                        props.errors.lastName && (
                                            <small className="text-danger p-2">
                                                {props.errors.lastName}
                                            </small>
                                        )}
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        name="userName"
                                        value={props.values.userName}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.touched.userName &&
                                        props.errors.userName && (
                                            <small className="text-danger p-2">
                                                {props.errors.userName}
                                            </small>
                                        )}
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        value={props.values.email}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.touched.email &&
                                        props.errors.email && (
                                            <small className="text-danger p-2">
                                                {props.errors.email}
                                            </small>
                                        )}
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={props.values.password}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    />
                                    {props.touched.password &&
                                        props.errors.password && (
                                            <small className="text-danger p-2">
                                                {props.errors.password}
                                            </small>
                                        )}
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                            />
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </Button>
                                </div>
                                <div
                                    className="d-flex align-items-center mt-2"
                                    style={{ fontSize: "0.8rem" }}
                                >
                                    Already have an account?{" "}
                                    <Button
                                        size="sm"
                                        variant="link"
                                        onClick={() => navigate("/sign-in")}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                                {error && (
                                    <Alert
                                        variant="danger"
                                        className="text-center mt-5 py-1"
                                        style={{ fontSize: "0.8rem" }}
                                    >
                                        {error}
                                    </Alert>
                                )}
                            </Form>
                        )}
                    </Formik>
                </FormContainer>
            </Main>

            <Outlet />
        </>
    );
};
