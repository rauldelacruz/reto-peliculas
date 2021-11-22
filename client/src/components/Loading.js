import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loading = () => {
  return (
    <div className="justify-content-md-center" >
      <h4>Cargando</h4>
      <hr />
      <Spinner animation="grow" size="lg" />
      <Spinner animation="grow" size="lg" />
      <Spinner animation="grow" size="lg" />

    </div>
  );
}
