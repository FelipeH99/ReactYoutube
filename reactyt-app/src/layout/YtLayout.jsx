import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import YouTubeSearch from '../features/YoutubeSearch/YoutubeSearch';

import YouTubePlayer from "../features/YoutubePlayer/YoutubePlayer";
import "./Layout.css";

export default function Layout() {
  return (
    <>
        <nav class="navbar navbar-dark bg-dark">
          <Container>
            <Navbar.Brand>Youtube</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Home">
                Home
              </Nav.Link>
            </Nav>
          </Container>
        </nav>
        <YouTubeSearch />
      <YouTubePlayer  />
     
      <Outlet />
    </>
  );
}
