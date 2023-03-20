import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, Outlet } from "react-router-dom";
import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "contexts/AuthContext";

const Main = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1531489956451-20957fab52f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80);
`;

const FormContainer = styled.div`
  width: 60vh;
  padding: 4rem;
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const AdminLogin = () => {
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const initialValues: ISignIn = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const signInValidationSchema = Yup.object({
    email: Yup.string()
      .email("Email Must Be A Valid Email Address")
      .required("Email Is Required"),
    password: Yup.string().required("Password Is Required"),
  });

  const handleSubmit = async (values: ISignIn) => {
    setError(undefined);
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/admin-sign-in", values, {
        headers: { "Content-Type": "application/json" },
      });
      if (response?.status === 200) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        setLoggedIn?.(true);
        const payload = jwtDecode<IPayload>(response.data.accessToken);
        setUser?.({
          userName: payload.userName,
          role: payload.role,
        });
        setLoading(false);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const signInError = error as AxiosError<IAuthError>;
        if (signInError && signInError.response) {
          setError(signInError.response.data.error);
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
          <h3 className="text-center mb-5">Admin Login</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
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
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={props.values.password}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  {props.touched.password && props.errors.password && (
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
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Sign In"
                    )}
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
