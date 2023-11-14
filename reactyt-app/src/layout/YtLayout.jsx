import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import YouTubeSearch from '../features/YoutubeSearch/YoutubeSearch';

import "./Layout.css";

export default function Layout() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <Container>
          <Navbar.Brand style={{ color: 'red' }}>Youtube</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
        </Container>
      </nav>
      <YouTubeSearch />
      <Outlet />
    </>
  );
}
