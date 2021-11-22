import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_MOVIE } from '../graphql/Queries';
import { DELETE_MOVIE, UPDATE_MOVIE, UPLOAD_FILE, DELETE_FILE } from '../graphql/Mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Loading } from '../components/Loading';
import { useNotification } from '../hooks/useNotification';
import { Error } from '../components/Error';

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
const currentYear = new Date().getFullYear();

export const MovieScreen = () => {

  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formValues, setFormValues] = useState({
    title: '',
    year: '',
    rating: 0
  });
  const [selectedFile, setSelectedFile] = useState();
  const [titleValid, setTitleValid] = useState(true);
  const [yearValid, setYearValid] = useState(true);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const { id } = useParams();
  const {loading: getLoading, data, error: getError} = useQuery(GET_MOVIE, {
    variables: {id: id}, onCompleted: (data) => {
      setFormValues(data.getMovie);
    }
  });
  const [uploadFile, { error: errorFile }] = useMutation(UPLOAD_FILE);
  const [deleteMovie, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_MOVIE);
    const [deleteFile, { error: deleteErrorF }] = useMutation(DELETE_FILE);
    const [updateMovie, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_MOVIE, { onCompleted: (updateData) => {
    if(isFileSelected) {
      deleteFile({variables:{id: id}});
      uploadFile({
        variables: {id: updateData.updateMovie.id, file: selectedFile}
      });
    }
  }});

  const { title, year, rating } = formValues;

  if (updateLoading || getLoading || deleteLoading) {
    return <Loading /> 
  }


  if( getError || deleteErrorF || errorFile || deleteError || updateError) {
    return <Error />;
  }

  const handleReturn = () => {
    navigate(-1);
  }

  const handleFileChange = ({ target }) => {
    if (target.validity.valid) {
      setSelectedFile(target.files[0]);
      setIsFileSelected(true);
    }
  }

  const handleSave = async () => {
    let movie = { title, year: parseInt(year), rating };
    if ( !title.trim() ) {
      addNotification('Titulo no valido', 'danger')
      return setTitleValid(false);
    }
    if ( year < 1900 || year > currentYear) {
      addNotification('Año no valido', 'danger')
      return setYearValid(false);
    }
    await updateMovie({
      variables: {
        id: id,
        movie: movie,
      },
    });
    setYearValid(true);
    setTitleValid(true);
    addNotification('Informacion guardada');
  }

  const handleDelete = async () => {
    await deleteMovie({
      variables: {
        id: id
      }
    });
    addNotification('Pelicula eliminada');
    navigate('/');
  }

  const handleInputChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    });
  }

  const handleSelectChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: parseFloat(target.value),
    });
  }

  return (
    <>
      <h2>Editar pelicula</h2>
      <Button onClick={ handleReturn } variant="link">
        <FontAwesomeIcon icon={ faArrowLeft } /> Regresar
      </Button>
      <hr />
      <Row>
        <Col>
          <img 
            src={ isFileSelected ? URL.createObjectURL(selectedFile) : data.getMovie.poster.url }
            alt=""
            className="img-thumbnail"
          />
        </Col>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                name="title" 
                autoComplete="off"
                value={ title } 
                type="text" 
                placeholder="Titulo"
                className={ `${ !titleValid && 'is-invalid' } `}
                onChange={ handleInputChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="year">
              <Form.Label>Año</Form.Label>
              <Form.Control
                name="year" 
                autoComplete="off"
                value={ year } 
                type="number" 
                placeholder={ currentYear }
                className={ `${ !yearValid && 'is-invalid' } `}
                onChange={ handleInputChange }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Calificación</Form.Label>
              <Form.Select 
                name="rating"
                value={ rating }
                onChange={ handleSelectChange }
              >
                {
                  range(0,5).map(i => (
                    <option key={ i } >{ i }</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Portada</Form.Label>
              <Form.Control 
                type="file"
                onChange={ handleFileChange }
                accept="image/*"
              />
            </Form.Group>     
            <Button variant="primary" className="ms-2 mb-3" onClick={ handleSave }>
              <FontAwesomeIcon icon={ faSave } /> Guardar
            </Button>
            <Button variant="danger" className="ms-2 mb-3" onClick={handleDelete} >
              <FontAwesomeIcon icon={ faTrash } /> Eliminar
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
