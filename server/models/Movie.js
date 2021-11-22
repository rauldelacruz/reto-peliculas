import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    rating: Number,
    poster: {
        url: {
            type: String,
            default: 'https://res.cloudinary.com/dfig9cm1a/image/upload/v1637271375/placeholder_jgojyl.jpg'
        },
        public: String,
    }
});

const Movie = mongoose.model('movie', movieSchema);

export default Movie;
