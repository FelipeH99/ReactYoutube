import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <Navbar.Brand style={{ color: 'red' }}>Youtube</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
          </Nav>
        </Container>
      </nav>
      <Outlet />
    </>
  );
}
