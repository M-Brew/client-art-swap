import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { CartContext } from "contexts/CartContext";
import "./cart.css";

export const CheckoutSuccessful = () => {
  const { setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const emptyCart = () => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartItems?.([]);
    }
  };

  return (
    <div className="checkout-response-wrapper">
      <div>
        <div className="d-flex justify-content-center">
          <h3>Thank you for your purchase</h3>
        </div>
        <div className="my-5">
          An email has been sent to your account. Please check for further
          details.
        </div>
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => {
              emptyCart();
              navigate("/shop");
            }}
          >
            Back To Shop
          </Button>
        </div>
      </div>
    </div>
  );
};
