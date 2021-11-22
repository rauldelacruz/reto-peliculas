import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from './MovieCard';

export const MovieList = ({ movies }) => {

  return (
    <Row xs={2} md={3} lg={4} className="g-4">
    {
      movies.map(movie => (
        <Col key={ movie.id }>
            <MovieCard key={ movie.id } movie={movie} />
        </Col>
      ))
    }
    </Row>
  );
}
