// set imports
// bootstrap
import Nav from "react-bootstrap/Nav";
import Navbarr from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
// react
import { Link } from "react-router-dom";
import { useState } from "react";
// from my files
import { MenuIcon } from "../../Icons/Icons";
import { useThisAuthContext } from "../../authReactH/AuthContext";
import NavItems from "./NavItems";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const { user } = useThisAuthContext();

  const Modal_stuff = (props) => {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="menu-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Time Management
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Nav>
            <NavItems />
          </Nav>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <header className="header">
      <Navbarr variant="dark" className="navbar shadow">
       {/* added menu icon before manu options*/}
      <MenuIcon></MenuIcon>
        <Container fluid>
          <Navbarr.Brand as={Link} to="/">
            {/* Time Management App  Hello, {user.displayName} */}
            {/* Time Management App  Hello, user */}
          </Navbarr.Brand>

          <Nav className="menu-nav ms-auto d-none d-md-flex">
            {/* added nav items */}
            <NavItems />
          </Nav>

          <Button
            variant="light"
            className="d-md-none menu"
            onClick={() => setModalShow(true)}
          >
          </Button>

          <Modal_stuff
            show={modalShow}
            onHide={() => setModalShow(false)}
            onClick={() => setModalShow(false)}
            className="d-md-none"
          />
          {/* added container */}
        </Container>
        
      </Navbarr>
    </header>
  );
};

export default Navbar;
