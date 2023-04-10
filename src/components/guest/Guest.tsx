import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { NavigationBar } from "components/sub-components/navigation-bar/NavigationBar";
import { Footer } from "components/sub-components/footer/Footer";
import { GuestLogin } from "./login/GuestLogin";
import { GuestSignUp } from "./login/GuestSignUp";
import { Cart } from "./shop/cart/Cart";
import { CheckoutSuccessful } from "./shop/cart/CheckoutSuccessful";
import { CheckoutUnsuccessful } from "./shop/cart/CheckoutUnsuccessful";
import { Home } from "./home/Home";
import { About } from "./about/About";
import { Shop } from "./shop/Shop";
import { Contact } from "./contact/Contact";

import { AuthContext } from "contexts/AuthContext";
import { CartContext } from "contexts/CartContext";

export const Guest = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("cartItems");

    if (data) {
      const items = JSON.parse(data) as ICartItem[];
      setCartItems(items);
    }
  }, []);

  async function checkAuth() {
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
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
    }
  }

  const AuthRoute = (props: { outlet: JSX.Element }) => {
    if (!loggedIn) {
      return props.outlet;
    } else {
      return <Navigate to={{ pathname: "/" }} />;
    }
  };

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="sign-in"
            element={<AuthRoute outlet={<GuestLogin />} />}
          />
          <Route
            path="sign-up"
            element={<AuthRoute outlet={<GuestSignUp />} />}
          />
          <Route path="cart" element={<Cart />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          <Route path="checkout-successful" element={<CheckoutSuccessful />} />
          <Route
            path="checkout-unsuccessful"
            element={<CheckoutUnsuccessful />}
          />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};
