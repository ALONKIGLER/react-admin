import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  return window.localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/Signin" />
  );
}
