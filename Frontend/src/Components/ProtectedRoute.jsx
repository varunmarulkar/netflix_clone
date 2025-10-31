import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { user, fetchingUser } = useAuthStore();

  if (fetchingUser) {
    // data load ho raha hai
    return <div className="text-white">SignIn first</div>;
  }

  if (!user) {
    // user logged out hai → redirect to login
    return <Navigate to="/signin" replace />;
  }

  return children; // user logged in → page dikhaye
};

export default ProtectedRoute;
