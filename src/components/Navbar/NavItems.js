// auth imports
import { useThisAuthContext } from "authReactH/AuthContext";
import { Logout } from "authReactH/Logout";
// & react
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavItems = () => {
    const { logout } = Logout();
    const { user } = useThisAuthContext();
  return (
    <>
      {!user && (
        <>
          <Nav.Link as={Link} to="/signup">
            Signup
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        </>
      )}
      {user && (
        <>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/activities">
            Activities
            </Nav.Link>
          <Nav.Link as={Link} to="/mytodos">
            MyTODOs
          </Nav.Link>
          <Nav.Link as={Link} to="/charts">
          Charts
          </Nav.Link>
          <Nav.Link as={Link} to="/history">
            History
          </Nav.Link>

          <Nav.Link as={Link} to="/profile">
          UserInfo<span className="d-md-none">: {user.displayName}</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={logout}>
            Logout
          </Nav.Link>
        </>
      )}
    </>
  );
};

export default NavItems;