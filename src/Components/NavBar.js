import "CSS/Nav.css";

import React, { Component, useState, useEffect } from "react";
import { Nav, NavDropdown, Navbar, Container, Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import api from "helpers/api";
import userActions from "store/actions/userActions";

export default function NavBar({}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleLogout() {
    console.log("api.logout() : ");
    const res = await api.logout();
    dispatch(userActions.logout());
    localStorage.removeItem("authToken");
    history.push("/");
  }

  const paths = [
    { name: "Home", path: "/" },
    { name: "Friges", path: "/friges" },
    { name: "Menus", path: "/menus" },
    { name: "Promotions", path: "/promotions" },
    { name: "Produits", path: "/produits" },
    { name: "Catégories", path: "/categories" },
  ];

  const pathFound = paths.find((el) => {
    // const isFound = el.path.match(`/\/${location.pathname}/`);
    const isFound = new RegExp(`/${location.pathname}`, "i").test(`${el.path}`);
    // const isFound = new RegExp(`/Categories`,"i").test(`/categories`);
    return isFound;
  });

  const [pathName, setPathName] = useState(pathFound ? pathFound.name : "");

  useEffect(() => {}, []);

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
                  <NavDropdown.Item key={path.name}>
                    <Nav.Link
                      as={Link}
                      to={`${path.path}`}
                      onClick={(event) => setPathName(path.name)}
                    >
                      {path.name}
                    </Nav.Link>
                  </NavDropdown.Item>
                ))}
                <Dropdown.Divider />
                <NavDropdown.Item>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link className="h1">
                  <p className="white">{pathName}</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
