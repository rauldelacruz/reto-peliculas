import Movie from "../models/Movie.js";
import { GraphQLUpload } from 'graphql-upload';
import cloudinary from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});

const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        hello: () => {
            return 'hello there';
        },
        getMovies: async () => {
            const movies = await Movie.find({});
            return movies;
        },
        getMovie:  async (parent, args, context, info) => {
            const { id } = args;
            const movie = await Movie.findById(id);
            return movie;
        },
        searchMovieByTitle: async (parent, args, context, info) => {
            const { title } = args;
            const titleRegex = new RegExp(title,'i');
            const movies = await Movie.find({ title: titleRegex });
            return movies;
        },
    },
    Mutation: {
        createMovie: async (parent, args, context, info) => {
            const { title, year, rating } = args.movie;
            const movie = new Movie({ title, year, rating });
            const result = await movie.save();
            return result;
        },
        updateMovie: async (parent, args, context, info) => {
            const { id } = args;
            const { title, year, rating } = args.movie;
            return await Movie.findByIdAndUpdate(
                id,
                { title, year, rating },
                { new: true },
            ); 
        },
        deleteMovie: async (parent, args, context, info) => {
            const { id } = args;
            let movie = await Movie.findById(id);
            cloudinary.v2.uploader.destroy(movie.poster.public);
            await movie.delete();
            return 'Movie deleted';
        },
        uploadFile: async(parent, args, context, info) => {
            const { id, file } = args
            const { createReadStream } = await file;
            const result = await new Promise((resolve, reject) => {
                createReadStream().pipe(
                    cloudinary.v2.uploader.upload_stream((error, result) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(result)
                    })
                )
            })
            const moviePoster = {
                url: result.secure_url,
                public: result.public_id
            };
            await Movie.findByIdAndUpdate(id, {poster: moviePoster}, { new: true });
            return moviePoster;
        },
        deleteFile: async(parent, args, context, info) => {
            const { id } = args;
            let movie = await Movie.findById(id);
            cloudinary.v2.uploader.destroy(movie.poster.public);
            movie.poster = undefined;
            movie = await movie.save();
            return 'Poster deleted';
        }
    }
};

export default resolvers;
