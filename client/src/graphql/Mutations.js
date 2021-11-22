import { gql } from '@apollo/client';

export const CREATE_MOVIE = gql`
  mutation createMovie($movie: MovieInput) {
    createMovie(movie: $movie) {
      id
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie($id: ID!, $movie: MovieInput) {
    updateMovie(id: $id, movie: $movie) {
      id
      title
      year
      rating
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) 
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($id: ID!, $file: Upload!) {
    uploadFile(id: $id, file: $file) {
      url
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id) 
  }
`;
