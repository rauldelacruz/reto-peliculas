import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { CREATE_MOVIE, UPLOAD_FILE } from '../graphql/Mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from '../hooks/useNotification';
import { Error } from '../components/Error';

const currentYear = new Date().getFullYear();

const initMovie = {
  title: '',
  year: currentYear,
  rating: 0
};

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

export const AddMovieScreen = () => {
 
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [ titleValid, setTitleValid ] = useState(true);
  const [ yearValid, setYearValid ] = useState(true);
  const [formValues, setFormValues] = useState(initMovie);
  const [selectedFile, setSelectedFile] = useState();
  const [uploadFile, { error: errorFile }] = useMutation(UPLOAD_FILE);
  const [addMovie, { data: movieData, error: errorAdd }] = useMutation(CREATE_MOVIE, 
    { onCompleted: async (movieData) => {
        await uploadFile({
          variables: {id: movieData.createMovie.id, file: selectedFile}
        });
      }
    }
  );
  
  const { title, year, rating } = formValues;

  const handleCancel = () => {
    navigate(-1); 
  }

  const handleAdd = async () => {
    let movie = { title, year: parseInt(year), rating };
    if ( !title.trim() ) {
      addNotification('Titulo no valido', 'danger')
      return setTitleValid(false);
    }
    if ( year < 1900 || year > currentYear) {
      addNotification('Año no valido', 'danger')
      return setYearValid(false);
    }
    if (!selectedFile) {
      return addNotification('Imagen no seleccionada', 'danger')
    }
    await addMovie({
      variables: {
        movie: movie,
      },
    });
    setYearValid(true);
    setTitleValid(true);
    navigate('/');
    addNotification('Pelicula añadida');
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

  const handleFileChange = ({ target }) => {
    if (target.validity.valid) {
      setSelectedFile(target.files[0]);
    }
  }

  if (errorAdd || errorFile) {
    return <Error />;
  }

  return (
    <>
      <h2>Agregar una pelicula</h2>
      <hr />
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
            placeholder={ currentYear }
            onChange={ handleInputChange }
            className={ `${ !yearValid && 'is-invalid' } `}
            type="number"
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
        <Button 
          variant="success"
          className="ms-2 mb-3" 
          onClick={ handleAdd }
        >
          <FontAwesomeIcon icon={ faPlus } /> Agregar
        </Button>
        <Button
          variant="danger" 
          className="ms-2 mb-3" 
          onClick={ handleCancel }
        >
          <FontAwesomeIcon icon={ faTimes } /> Cancelar
        </Button>
      </Form>
    </>
  );
}
