import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./cart.css";

export const CheckoutUnsuccessful = () => {
    const navigate = useNavigate();
    return (
        <div className="checkout-response-wrapper">
            <div>
                <h3 className="mb-5">
                    Checkout was unsuccessful. Please try again later.
                </h3>
                <div className="d-flex justify-content-center">
                    <Button
                        variant="outline-danger"
                        onClick={() => navigate("/cart")}
                    >
                        Back To Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};
