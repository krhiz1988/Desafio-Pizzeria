import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Context from "../Context";

export default function Navigation() {
  const { valorTotal } = useContext(Context);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#17a2b8" }}
      >
        <Container>
          <Navbar.Brand>
            <img
              style={{ width: "35px", height: "35px" }}
              src="/icon/pizza.png"
              alt="image"
            />{" "}
            <NavLink to="/">
              <label className="text-white" style={{ cursor: "pointer" }}>
                Pizzería Mamma Mia!
              </label>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavLink to="/carrito">
                <img
                  style={{ width: "28px", height: "28px" }}
                  src="/icon/carrito.png"
                  alt="image"
                />{" "}
                <label className="text-white"> $ {valorTotal}</label>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
