import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query {
    getMovies {
      id
      title
      rating
      year
      poster {
        url
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query getMovie($id: ID!) {
    getMovie(id: $id) {
      title
      rating
      year
      poster {
        url
      }
    }
  }
`;

export const SEARCH_MOVIE = gql`
  query searchMovieByTitle($title: String) {
    searchMovieByTitle(title: $title) {
      id
      title
      rating
      year
      poster {
        url
      }
    }
  }
`;
