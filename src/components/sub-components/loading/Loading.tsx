import React from "react";
import Spinner from "react-bootstrap/Spinner";

import "./loading.css";

export const Loading = () => {
    return (
        <div className="spinner-container">
            <Spinner animation="border" variant="secondary" />
        </div>
    );
};
