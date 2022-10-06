import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import boltLogo from "../assets/boltLogo.png";
import "../styles/nav-bar.css";
import CartSidebar from "./CartSidebar";
import { useState } from "react";

const MyNavbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem("token");
  const tokenExist = () => {
    
    if (token === "") {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar>
        <Navbar.Brand to="/" as={Link}>
          {" "}
          <img
            style={{
              height: "50px",
              marginTop: "-10px",
              marginBottom: "-10px",
            }}
            src={boltLogo}
            alt="Logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/login" as={Link}>
            <i className="fa-solid fa-circle-user"></i>
          </Nav.Link>
          <Nav.Link onClick={tokenExist} to="/purchases" as={Link}>
            <i className="fa-solid fa-bag-shopping"></i>
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              if (token !== "") {
                handleShow();
                tokenExist();
              } else {
                handleClose();
                tokenExist();
              }
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Nav.Link>
          <Nav.Link onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </Nav.Link>
        </Nav>
      </Navbar>
      <CartSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default MyNavbar;
