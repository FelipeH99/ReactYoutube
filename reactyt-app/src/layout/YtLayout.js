import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import "./Layout.css";

export default function Layout() {
  return (
    <div >
      <header className="header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Youtube</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Home">
                Home
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <Outlet />
    </div>
  );
}
