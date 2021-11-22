import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Upload

    type Movie {
        id: ID
        title: String
        year: Int
        rating: Int
        poster: Poster
    }

    type Poster {
        url: String
        public: String
    }

    input MovieInput {
        title: String
        year: Int
        rating: Int
    }

    type Query {
        hello: String
        getMovies: [Movie]
        getMovie(id: ID!): Movie
        searchMovieByTitle(title: String): [Movie]
    }

    type Mutation {
        createMovie(movie: MovieInput): Movie
        updateMovie(id: ID!, movie: MovieInput): Movie
        deleteMovie(id: ID!): String
        uploadFile(id:ID!, file: Upload!): Poster
        deleteFile(id: ID!): String
    }
`
export default typeDefs;
