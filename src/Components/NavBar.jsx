import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function NavBar() {
  const navBarData = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/profile",
      name: "Profile",
    },
  ];
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="w-75 p-1 px-5 fs-5"
      style={{ borderRadius: "0 0 10px 10px" }}
      sticky="top"
    >
      <Nav className="me-auto">
        {navBarData.map((item) => (
          <NavLink
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
      </Nav>
    </Navbar>
  );
}

export default NavBar;
