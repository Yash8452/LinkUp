import React from "react";
import { Navigate} from "react-router-dom";
import { getUser } from "../helper/authHelper";


const PrivateRoute = ({ children }) => {
  return getUser() ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;