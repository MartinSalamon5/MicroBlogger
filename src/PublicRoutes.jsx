import Login from "./Views/Login";
import Signup from "./Views/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function PublicRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    return null;
  } else {
    return (
      <Routes>
        <Route
          index
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/home" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }
}

export default PublicRoutes;
