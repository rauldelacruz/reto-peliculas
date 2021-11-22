import React from 'react';
import { MovieList } from '../components/MovieList';
import { useQuery } from '@apollo/client';
import { GET_MOVIES } from '../graphql/Queries';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export const HomeScreen = () => {
  const { loading, data, error } = useQuery(GET_MOVIES);
  
  if (loading) return <Loading /> 
  if (error) return <Error />
  
  return (
    <>
      <h2>Lista de peliculas</h2>
      <hr />
      <MovieList movies={ data?.getMovies }/>
    </>
  );
}
