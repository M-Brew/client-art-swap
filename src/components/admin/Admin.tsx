import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "./dashboard/Dashboard";
import { AdminLogin } from "./login/AdminLogin";
import { AuthContext } from "contexts/AuthContext";

export const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || !refreshToken) {
        setLoggedIn(false);
      } else {
        const payload = jwtDecode<IPayload>(accessToken);
        if (payload.exp < new Date().getTime() / 1000) {
          setLoggedIn(false);
          const response = await axios.post(
            "/api/auth/token",
            { token: refreshToken },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response?.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken);
            setLoggedIn(true);
            setUser?.({
              userName: payload.userName,
              role: payload.role,
            });
          }
        } else {
          setLoggedIn(true);
          setUser?.({
            userName: payload.userName,
            role: payload.role,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
      setLoading(false);
    }
  }

  const AuthRoute = (props: { outlet: JSX.Element }) => {
    if (!loggedIn || user?.role !== "admin") {
      return props.outlet;
    } else {
      return <Navigate to={{ pathname: "dashboard" }} />;
    }
  };

  const PrivateRoute = (props: { outlet: JSX.Element }) => {
    if (loggedIn) {
      return props.outlet;
    } else {
      return <Navigate to={{ pathname: "/admin" }} />;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <Routes>
        <Route path="/" element={<AuthRoute outlet={<AdminLogin />} />} />
        <Route
          path="dashboard/*"
          element={<PrivateRoute outlet={<Dashboard />} />}
        />
      </Routes>
    </AuthContext.Provider>
  );
};
