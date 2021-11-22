import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons'

export const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container >
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={ faFilm } /> Peliculas
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/add-movie">
            <FontAwesomeIcon icon={ faPlusSquare } /> Agregar
          </Nav.Link>
          <Nav.Link href="/search">
            <FontAwesomeIcon icon={ faSearch } /> Buscar
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
