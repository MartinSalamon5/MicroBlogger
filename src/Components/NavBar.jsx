import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import Button from "react-bootstrap/Button";

function NavBar() {
  const { isLoggedIn, signUserOut, setLoginError, setSignUpError } =
    useContext(AuthContext);
  const [topLinks, setTopLinks] = useState([]);

  useEffect(() => {
    if (isLoggedIn === true) {
      setTopLinks([
        {
          path: "/home",
          name: "Home",
        },
        {
          path: "/profile",
          name: "Profile",
        },
      ]);
    } else {
      setTopLinks([
        {
          path: "/login",
          name: "LogIn",
        },
        {
          path: "/signup",
          name: "SignUp",
        },
      ]);
    }
  }, [isLoggedIn]);

  const logOutUser = () => {
    console.log("logout");
    signUserOut();
  };

  const removeError = () => {
    setLoginError(null);
    setSignUpError(null);
  };

  if (isLoggedIn === null) {
    return null;
  } else {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        className="w-100 p-1 px-5 fs-5"
        style={{ borderRadius: "0 0 10px 10px" }}
        sticky="top"
      >
        <Nav className="me-auto">
          {topLinks.map((item) => (
            <NavLink
              onClick={removeError}
              style={({ isActive }) => ({
                color: "white",
                margin: "20px 30px 20px 30px",
                textDecoration: isActive ? "underline" : "none",
              })}
              to={item.path}
              key={item.name}
            >
              {item.name}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <Button
              onClick={logOutUser}
              variant="primary"
              style={{
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: "30px",
                top: "26px",
              }}
            >
              Logout
            </Button>
          ) : (
            <div>{null}</div>
          )}
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
