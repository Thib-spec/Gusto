import 'CSS/Nav.css'

import React, { Component, useState } from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const paths = [
  { name: "Home", path: "/" },
  { name: "Réfrigérateurs", path: "/refrigerateurs" },
  { name: "Menus", path: "/menus" },
  { name: "Promotions", path: "/promotions" },
  { name: "Produits", path: "/produits" },
  { name: "Catégories", path: "/catégories" },
];

export default function NavBar({ children }) {

  const [pathName, setPathName] = useState("Home")

  return (
    <>
      <Navbar className="blue">
        <Container fluid>
          <Navbar.Brand> </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                className="e-caret-hide"
                title={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="white"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                }
                id="nav-dropdown"
              >
                {paths.map((path) => (
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to={`${path.path}`} onClick={(event) => setPathName(path.name)}>
                      {path.name}
                    </Nav.Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Item>
                <Nav.Link className="h1"><p className="white">{pathName}</p></Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
