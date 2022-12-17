import Home from "./Views/Home";
import Profile from "./Views/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function PrivateRoutes() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === null) {
    return null;
  } else {
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    );
  }
}

export default PrivateRoutes;
