import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export const MovieCard = ({
  movie
}) => {

  return (
    <Card
      className="mb-2"
    >
      <Card.Img variant="top" src={ movie.poster.url } />
      <Card.Body>
        <Card.Title>{ movie.title }</Card.Title>
        <Card.Text>
          Año: { movie.year }
        </Card.Text>
        <Card.Text>
          Calificacion: { movie.rating }
        </Card.Text>
        <Button variant="primary" href={ `/movie/${ movie.id }` } >
          <FontAwesomeIcon icon={ faEdit } /> Editar
        </Button>
      </Card.Body>
    </Card>
  );
}
