import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust the path if needed

const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
