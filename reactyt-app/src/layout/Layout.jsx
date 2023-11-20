import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <Container className="contNav">
          <Navbar.Brand style={{ color: 'red' }}>ReactYoutube</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="https://wa.me/+59894314684">
              Contact
            </Nav.Link>

            <Nav.Link as={Link} to="https://github.com/FelipeH99/ReactYoutube">
              Github Repo
            </Nav.Link>
          </Nav>
        </Container>
      </nav>
      <Outlet />
    </>
  );
}
