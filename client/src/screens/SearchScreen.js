import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_MOVIE } from '../graphql/Queries';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Loading } from '../components/Loading';
import { useNotification } from '../hooks/useNotification';
import { MovieList } from '../components/MovieList';
import { Error } from '../components/Error';

export const SearchScreen = () => {

  const { addNotification } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const { q = '' } = queryString.parse( location.search );
  const [ formValues, setFormValues ] = useState({searchText: q});
  const { searchText } = formValues;

  const {loading, data, error} = useQuery(SEARCH_MOVIE, {
    variables: {title: q}
  });

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/?q=${ searchText }`);
  }

  if (loading) return <Loading />

  if (error) {
    addNotification(JSON.stringify(error, null, 2), 'danger');
    return <Error />;
  }

  
  return (
    <>
      <h2>Busqueda de peliculas</h2>
      <hr />
      <Form onSubmit={ handleSearch }>
        <Row>
          <Col xs="auto">
            <Form.Control  
              type="text"
              placeholder="Titulo"
              name="searchText"
              autoComplete="off"
              value={ searchText } 
              onChange={ handleInputChange }
              className="mb-3"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2" >
              <FontAwesomeIcon icon={ faSearch } /> Buscar
            </Button>
          </Col>
        </Row>
      </Form>
      <MovieList movies={ data?.searchMovieByTitle }/>

    </>
  );
}
