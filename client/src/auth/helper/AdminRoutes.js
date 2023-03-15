import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";

const AdminRoute = ({ children }) => {
    return (
        isAutheticated()&& isAutheticated().user.role === 1  ? children : <Navigate to="/" />
  );
};

export default AdminRoute;
