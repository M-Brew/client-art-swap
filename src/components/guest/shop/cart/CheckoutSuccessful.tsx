import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { CheckoutService } from "services/checkout.service";
import { CartContext } from "contexts/CartContext";
import { Loading } from "components/sub-components/loading/Loading";
import "./cart.css";

const checkoutService = new CheckoutService();

export const CheckoutSuccessful = () => {
  const { setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const verifyCheckout = async () => {
    try {
      setLoading(true);
      const ref = localStorage.getItem("reference");

      if (ref) {
        const response = await checkoutService.verify(ref);
        if (response?.status === 200) {
          localStorage.removeItem("reference");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyCheckout();
  }, []);

  const emptyCart = () => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartItems?.([]);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
