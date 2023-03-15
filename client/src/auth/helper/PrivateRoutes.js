import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";

const PrivateRoute = ({ children }) => {
    const auth = isAutheticated();
    return auth ? children : <Navigate to="/signin" />
};

export default PrivateRoute;


